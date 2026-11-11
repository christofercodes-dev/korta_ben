<?php

namespace App\Modifiers;

use Statamic\Modifiers\Modifier;

class VimeoEmbed extends Modifier
{
    protected static $handle = 'vimeo_embed';

    /**
     * Turns a Vimeo link (vimeo.com/123, vimeo.com/123/hash, player.vimeo.com/video/123)
     * into a privacy-friendly player URL. Returns null if it is not a Vimeo link.
     */
    public function index($value, $params, $context)
    {
        $value = trim((string) $value);

        if (! preg_match('~^(?:https?://)?(?:www\.|player\.)?vimeo\.com/(?:video/|channels/[^/]+/|groups/[^/]+/videos/|manage/videos/)?(\d+)(?:/([A-Za-z0-9]+))?~i', $value, $m)) {
            return null;
        }

        $query = ['dnt' => 1, 'title' => 0, 'byline' => 0, 'portrait' => 0];

        $hash = $m[2] ?? null;

        if (! $hash && preg_match('~[?&]h=([A-Za-z0-9]+)~', $value, $h)) {
            $hash = $h[1];
        }

        if ($hash) {
            $query['h'] = $hash;
        }

        return 'https://player.vimeo.com/video/'.$m[1].'?'.http_build_query($query);
    }
}
