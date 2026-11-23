<?php

namespace App\Modifiers;

use Illuminate\Support\Facades\Crypt;
use Statamic\Modifiers\Modifier;

class FormToken extends Modifier
{
    protected static $handle = 'form_token';

    /**
     * Krypterad tidsstämpel för när formuläret visades. ContactController
     * avvisar inlägg som kommer för snabbt (botar) eller utan giltig token.
     */
    public function index($value, $params, $context)
    {
        return Crypt::encryptString((string) time());
    }
}
