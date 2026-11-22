<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Kontaktformulär → webhook
    |--------------------------------------------------------------------------
    |
    | Formuläret på /kontakt skickas som JSON till den här adressen. Lämna
    | tomt i miljöer där inget ska skickas (formuläret visar då ett felmeddelande).
    | Valfri hemlighet skickas som headern X-Webhook-Secret.
    |
    */

    'webhook_url' => env('CONTACT_WEBHOOK_URL'),

    'webhook_secret' => env('CONTACT_WEBHOOK_SECRET'),

    'source' => env('CONTACT_SOURCE', 'kortaben.se'),

];
