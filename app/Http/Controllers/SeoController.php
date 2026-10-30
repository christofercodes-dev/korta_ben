<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Statamic\Facades\Entry;

class SeoController extends Controller
{
    public function robots(): Response
    {
        $lines = config('seo.indexable')
            ? ['User-agent: *', 'Allow: /', '', 'Sitemap: '.url('/sitemap.xml')]
            : ['User-agent: *', 'Disallow: /'];

        return response(implode("\n", $lines)."\n", 200, ['Content-Type' => 'text/plain']);
    }

    public function sitemap(): Response
    {
        $entries = Entry::query()
            ->whereIn('collection', ['pages', 'projects'])
            ->where('published', true)
            ->get()
            ->filter(fn ($entry) => $entry->url() && ! $entry->get('seo_noindex'))
            ->sortBy(fn ($entry) => $entry->url() === '/' ? '' : $entry->url());

        $xml = view('sitemap', ['entries' => $entries])->render();

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
