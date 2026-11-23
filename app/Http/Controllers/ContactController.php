<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Statamic\Facades\Form;

class ContactController extends Controller
{
    public function __invoke(Request $request): JsonResponse|RedirectResponse
    {
        // Honeypot: riktiga besökare ser aldrig fältet. Låtsas att det gick bra.
        if ($request->filled('website')) {
            return $this->done($request);
        }

        // Tidsspärr: en människa behöver några sekunder på sig. Botar skickar direkt,
        // eller utan giltig token. Låtsas även här att det gick bra.
        if (! $this->openedLongEnough($request)) {
            return $this->done($request);
        }

        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160'],
            'company' => ['nullable', 'string', 'max:160'],
            'message' => ['required', 'string', 'max:5000'],
        ], [
            'name.required' => 'Skriv ditt namn.',
            'email.required' => 'Skriv din e-postadress.',
            'email.email' => 'E-postadressen ser inte riktig ut.',
            'message.required' => 'Skriv ett meddelande.',
            'message.max' => 'Meddelandet är för långt.',
        ]);

        // Spara alltid i Forms (Control Panel) först, så inget går förlorat om webhooken strular.
        try {
            Form::find('kontakt')?->makeSubmission()->data($data)->save();
        } catch (\Throwable $e) {
            Log::error('Kontaktformulär: kunde inte spara i Forms. '.$e->getMessage());
        }

        $url = config('contact.webhook_url');

        if (! $url) {
            Log::error('Kontaktformulär: CONTACT_WEBHOOK_URL saknas.');

            return $this->failed($request);
        }

        $payload = [
            'source' => config('contact.source'),
            'name' => $data['name'],
            'email' => $data['email'],
            'company' => $data['company'] ?? null,
            'message' => $data['message'],
            'submitted_at' => now()->toIso8601String(),
            'page' => $request->headers->get('referer'),
            // Läses av t.ex. Slack, Teams och Discord-kompatibla webhooks.
            'text' => sprintf(
                "Nytt meddelande från %s\n*Namn:* %s\n*E-post:* %s\n*Företag:* %s\n\n%s",
                config('contact.source'),
                $data['name'],
                $data['email'],
                $data['company'] ?: '–',
                $data['message']
            ),
        ];

        try {
            $response = Http::timeout(10)
                ->acceptJson()
                ->when(
                    config('contact.webhook_secret'),
                    fn ($http, $secret) => $http->withHeaders(['X-Webhook-Secret' => $secret])
                )
                ->post($url, $payload);

            if ($response->failed()) {
                Log::error('Kontaktformulär: webhook svarade '.$response->status());

                return $this->failed($request);
            }
        } catch (\Throwable $e) {
            Log::error('Kontaktformulär: webhook kunde inte nås. '.$e->getMessage());

            return $this->failed($request);
        }

        return $this->done($request);
    }

    private function openedLongEnough(Request $request): bool
    {
        try {
            $shownAt = (int) Crypt::decryptString((string) $request->input('_ts'));
        } catch (\Throwable) {
            return false;
        }

        $age = time() - $shownAt;

        return $age >= (int) config('contact.min_seconds');
    }

    private function done(Request $request): JsonResponse|RedirectResponse
    {
        return $request->expectsJson()
            ? response()->json(['ok' => true])
            : redirect('/kontakt?skickat=1#formular');
    }

    private function failed(Request $request): JsonResponse|RedirectResponse
    {
        $message = 'Det gick inte att skicka just nu. Mejla mig gärna direkt i stället.';

        return $request->expectsJson()
            ? response()->json(['ok' => false, 'message' => $message], 502)
            : redirect('/kontakt?fel=1#formular');
    }
}
