<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Markly
    |--------------------------------------------------------------------------
    |
    | Feedback-verktyget som widgeten i layouten skickar till. API-nyckeln
    | läggs i .env (MARKLY_API_KEY) och ska aldrig committas.
    |
    */

    'url' => env('MARKLY_URL', 'https://markly.kortaben.work'),

    'project' => env('MARKLY_PROJECT', 'korta-ben'),

    'api_key' => env('MARKLY_API_KEY'),

];
