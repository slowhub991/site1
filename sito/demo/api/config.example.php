<?php

// Modello di config.php. Il file vero lo scrive il workflow di pubblicazione dal secret
// ANTHROPIC_API_KEY di GitHub e non va mai messo nel repository.
// Se lo carichi a mano: copia questo file in config.php, metti la chiave e caricalo nella stessa cartella.

return [
    'anthropic_api_key' => 'sk-ant-...',
];
