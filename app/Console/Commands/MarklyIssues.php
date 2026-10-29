<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class MarklyIssues extends Command
{
    protected $signature = 'markly:issues
        {--status= : new, in_progress eller resolved}
        {--since= : Bara ärenden från och med datum, t.ex. 2026-10-01}
        {--limit=100 : Antal ärenden (högst 500)}
        {--json : Skriv ut rå JSON i stället för en tabell}';

    protected $description = 'Hämtar feedback-ärenden för projektet från Markly';

    public function handle(): int
    {
        $key = config('markly.api_key');

        if (! $key) {
            $this->error('MARKLY_API_KEY saknas i .env.');

            return self::FAILURE;
        }

        $url = sprintf(
            '%s/api/public/v1/projects/%s/issues',
            rtrim(config('markly.url'), '/'),
            config('markly.project')
        );

        $response = Http::withToken($key)
            ->acceptJson()
            ->timeout(15)
            ->get($url, array_filter([
                'status' => $this->option('status'),
                'since' => $this->option('since'),
                'limit' => $this->option('limit'),
            ]));

        if ($response->failed()) {
            $this->error("Markly svarade {$response->status()}.");

            return self::FAILURE;
        }

        $data = $response->json();

        if ($this->option('json')) {
            $this->line(json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

            return self::SUCCESS;
        }

        $issues = $data['issues'] ?? $data['data'] ?? $data;

        if (! is_array($issues) || $issues === []) {
            $this->info('Inga ärenden.');

            return self::SUCCESS;
        }

        $this->table(
            ['Id', 'Status', 'Sida', 'Beskrivning'],
            collect($issues)->map(fn ($issue) => [
                $issue['id'] ?? '',
                $issue['status'] ?? '',
                $issue['url'] ?? $issue['page_url'] ?? '',
                str($issue['description'] ?? '')->limit(70),
            ])->all()
        );

        return self::SUCCESS;
    }
}
