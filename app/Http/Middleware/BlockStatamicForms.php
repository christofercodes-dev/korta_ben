<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Statamics inbyggda formulär-endpoint (POST /!/forms/{form}) används inte på
 * sajten. Kontaktformuläret går via /kontakt (ContactController). Spärren gör
 * att ingen, till exempel en bot, kan posta till gamla Statamic-formulär.
 */
class BlockStatamicForms
{
    public function handle(Request $request, Closure $next): Response
    {
        $prefix = trim((string) config('statamic.routes.action', '!'), '/');

        abort_if($request->is($prefix.'/forms', $prefix.'/forms/*'), 404);

        return $next($request);
    }
}
