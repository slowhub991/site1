<?php

declare(strict_types=1);

/*
 * Assistente AI della demo VMC-850 (https://targa10.it/demo/#chiedi).
 *
 * GET  -> {"attivo": true|false}       la pagina capisce se usare l'AI o il manuale tradotto
 * POST {"domanda": "...", "storia": [{"role": "user"|"assistant", "content": "..."}]}
 *      -> {"testo": "...", "troncata": bool}  oppure  {"errore": "codice"}
 *
 * La chiave API sta in config.php, scritto dal workflow di pubblicazione: non è nel repository
 * e non arriva mai al browser. Il manuale (manuale.txt) e le regole sono fissi qui sul server,
 * così l'endpoint risponde solo sulla VMC-850 e non può essere usato come chat generica.
 */

use Anthropic\Client;
use Anthropic\Core\Exceptions\APIConnectionException;
use Anthropic\Core\Exceptions\APIException;
use Anthropic\Core\Exceptions\APIStatusException;
use Anthropic\Core\Exceptions\AuthenticationException;
use Anthropic\Core\Exceptions\BadRequestException;
use Anthropic\Core\Exceptions\PermissionDeniedException;
use Anthropic\Core\Exceptions\RateLimitException;

const MODELLO = 'claude-opus-5-5';
const MAX_TOKENS = 2048;          // tetto di spesa per risposta: le risposte chieste sono di 110 parole
const MAX_DOMANDA = 400;          // caratteri, come il campo della pagina
const MAX_TURNI = 6;              // messaggi precedenti tenuti per le domande di seguito
const MAX_TESTO_TURNO = 1200;
const LIMITE_IP_ORA = 15;         // domande per indirizzo IP in un'ora
const LIMITE_GIORNO = 200;        // domande totali al giorno, contro gli abusi

const REGOLE = <<<'TXT'
Sei l'assistente del manuale digitale del centro di lavoro VMC-850 di Costruttore Esempio S.r.l. È un esempio dimostrativo di Targa10: costruttore, macchina e dati sono inventati.
Rispondi solo con le informazioni del MANUALE qui sotto. Regole:
1. Rispondi nella lingua in cui è scritta la domanda.
2. Al massimo 110 parole. Testo semplice, senza markdown e senza asterischi. Per i passaggi usa righe che iniziano con "• ".
3. Dopo ogni informazione presa dal manuale indica la sezione in questo formato esatto: [§ 9.2].
4. Se il manuale non contiene la risposta, dillo chiaramente e consiglia di contattare l'assistenza del costruttore [§ 1.1]. Non inventare valori, codici o procedure.
5. Per manutenzione, pulizia o sblocchi ricorda la messa in sicurezza [§ 9.2].
6. Non suggerire mai di escludere protezioni o interblocchi.
7. Rispondi solo su questa macchina e su questo manuale. Per qualsiasi altro argomento di' che puoi aiutare solo con il manuale della VMC-850.
TXT;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

/** @param array<string, mixed> $dati */
function rispondi(int $codice, array $dati): never
{
    http_response_code($codice);
    echo json_encode($dati, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** Cartella per i contatori dei limiti: fuori dal sito se possibile, altrimenti dati/ protetta. */
function cartellaDati(): ?string
{
    foreach ([sys_get_temp_dir() . '/targa10-demo-ai', __DIR__ . '/dati'] as $dir) {
        if (!is_dir($dir)) {
            @mkdir($dir, 0700, true);
        }
        if (is_dir($dir) && is_writable($dir)) {
            if (str_starts_with($dir, __DIR__) && !is_file($dir . '/.htaccess')) {
                @file_put_contents($dir . '/.htaccess', "Require all denied\nDeny from all\n");
            }
            return $dir;
        }
    }
    return null;
}

/** Finestra mobile: true se c'è ancora posto e registra la richiesta. */
function dentroIlLimite(string $dir, string $nome, int $finestra, int $limite): bool
{
    $fp = @fopen($dir . '/' . $nome . '.json', 'c+');
    if (false === $fp) {
        return false;
    }
    flock($fp, LOCK_EX);
    $ora = time();
    $voci = json_decode((string) stream_get_contents($fp), true);
    $voci = array_values(array_filter(is_array($voci) ? $voci : [], fn ($t) => is_int($t) && $t > $ora - $finestra));
    $ok = count($voci) < $limite;
    if ($ok) {
        $voci[] = $ora;
    }
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, (string) json_encode($voci));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    return $ok;
}

/**
 * Conversazione valida per l'API: alterna utente/assistente, parte dall'utente
 * e finisce con l'assistente, così la nuova domanda chiude la sequenza.
 *
 * @return list<array{role: string, content: string}>
 */
function storiaPulita(mixed $storia): array
{
    $pulita = [];
    foreach (is_array($storia) ? array_slice($storia, -MAX_TURNI) : [] as $turno) {
        if (!is_array($turno)) {
            continue;
        }
        $ruolo = ($turno['role'] ?? '') === 'assistant' ? 'assistant' : 'user';
        $testo = mb_substr(trim((string) ($turno['content'] ?? '')), 0, MAX_TESTO_TURNO);
        if ('' === $testo) {
            continue;
        }
        $atteso = [] === $pulita ? 'user' : ('user' === end($pulita)['role'] ? 'assistant' : 'user');
        if ($ruolo === $atteso) {
            $pulita[] = ['role' => $ruolo, 'content' => $testo];
        }
    }
    if ([] !== $pulita && 'user' === end($pulita)['role']) {
        array_pop($pulita);
    }
    return $pulita;
}

$config = is_file(__DIR__ . '/config.php') ? require __DIR__ . '/config.php' : [];
$chiave = is_array($config) ? (string) ($config['anthropic_api_key'] ?? '') : '';
$attivo = '' !== $chiave && is_file(__DIR__ . '/vendor/autoload.php') && is_file(__DIR__ . '/manuale.txt');

$metodo = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ('GET' === $metodo) {
    rispondi(200, ['attivo' => $attivo]);
}
if ('POST' !== $metodo) {
    rispondi(405, ['errore' => 'metodo']);
}
if (!$attivo) {
    rispondi(503, ['errore' => 'non_configurato']);
}

// Solo dalla pagina demo dello stesso sito.
$origine = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
if ('' !== $origine && parse_url($origine, PHP_URL_HOST) !== parse_url('http://' . ($_SERVER['HTTP_HOST'] ?? ''), PHP_URL_HOST)) {
    rispondi(403, ['errore' => 'origine']);
}

$richiesta = json_decode((string) file_get_contents('php://input'), true);
$domanda = trim((string) (is_array($richiesta) ? ($richiesta['domanda'] ?? '') : ''));
if ('' === $domanda || mb_strlen($domanda) > MAX_DOMANDA) {
    rispondi(400, ['errore' => 'domanda']);
}

$dir = cartellaDati();
$ip = hash_hmac('sha256', (string) ($_SERVER['REMOTE_ADDR'] ?? ''), $chiave);
if (null === $dir
    || !dentroIlLimite($dir, 'giorno-' . gmdate('Ymd'), 86400, LIMITE_GIORNO)
    || !dentroIlLimite($dir, 'ip-' . substr($ip, 0, 32), 3600, LIMITE_IP_ORA)) {
    rispondi(429, ['errore' => 'limite']);
}
if (1 === random_int(1, 50)) {
    foreach (glob($dir . '/*.json') ?: [] as $vecchio) {
        if (filemtime($vecchio) < time() - 2 * 86400) {
            @unlink($vecchio);
        }
    }
}

require __DIR__ . '/vendor/autoload.php';
@set_time_limit(90);

$sistema = REGOLE . "\n\nMANUALE:\n" . file_get_contents(__DIR__ . '/manuale.txt');
$messaggi = [...storiaPulita($richiesta['storia'] ?? []), ['role' => 'user', 'content' => $domanda]];

try {
    $client = new Client(
        apiKey: $chiave,
        baseUrl: isset($config['base_url']) ? (string) $config['base_url'] : null,
        requestOptions: ['timeout' => 60.0, 'maxRetries' => 1],
    );
    $risposta = $client->beta->messages->create(
        maxTokens: MAX_TOKENS,
        messages: $messaggi,
        model: MODELLO,
        // regole e manuale sono identici a ogni domanda: in cache costano un decimo
        system: [['type' => 'text', 'text' => $sistema, 'cacheControl' => ['type' => 'ephemeral']]],
        outputConfig: ['effort' => 'low'],
        // se il modello declina per motivi di sicurezza, il server riprova sul modello di riserva
        fallbacks: 'default',
        betas: ['server-side-fallback-2026-07-01'],
    );
} catch (RateLimitException) {
    rispondi(503, ['errore' => 'occupato']);
} catch (AuthenticationException | PermissionDeniedException) {
    error_log('targa10 demo: chiave API non valida o senza permessi');
    rispondi(503, ['errore' => 'non_configurato']);
} catch (BadRequestException $e) {
    error_log('targa10 demo: richiesta rifiutata dall\'API: ' . $e->getMessage());
    rispondi(502, ['errore' => 'richiesta']);
} catch (APIStatusException | APIConnectionException $e) {
    rispondi(503, ['errore' => 'rete']);
} catch (APIException $e) {
    error_log('targa10 demo: ' . $e->getMessage());
    rispondi(503, ['errore' => 'rete']);
}

if ('refusal' === $risposta->stopReason) {
    rispondi(200, ['errore' => 'rifiuto']);
}

$testo = '';
foreach ($risposta->content as $blocco) {
    if ('text' === $blocco->type) {
        $testo .= $blocco->text;
    }
}
$testo = trim($testo);
if ('' === $testo) {
    rispondi(200, ['errore' => 'vuota']);
}

rispondi(200, ['testo' => $testo, 'troncata' => 'max_tokens' === $risposta->stopReason]);
