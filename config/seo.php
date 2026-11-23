<?php

return [

    /*
    | Får sökmotorerna indexera sajten? Sätt SEO_INDEXABLE=true i .env på
    | produktion. På stage och lokalt är det avstängt, så att testmiljön
    | aldrig hamnar i Google och konkurrerar med den riktiga sajten.
    */
    'indexable' => (bool) env('SEO_INDEXABLE', false),

    // Fathom Analytics (cookielös statistik). Laddas bara när sajten är indexerbar, alltså i produktion.
    'fathom_site_id' => env('FATHOM_SITE_ID', 'UXVEXJET'),

    'site_name' => 'Korta ben',

    'default_title' => 'Korta ben – Kreativ byrå för varumärken, film och kampanjer',

    'default_description' => 'Korta ben är en kreativ byrå som gillar bra idéer, enkelt språk och saker som känns på riktigt. Från idé och strategi till film, content och kampanjer.',

];
