<?php

namespace App\Jobs;

use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use App\Jobs\Middleware\LogJobLifecycle;

class DeliberatelyFailingJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;

    public $backoff = 10;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    public function middleware(): array
    {
        return [new LogJobLifecycle];
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::info("the deliberatelyFailingJob has started...");

        throw new Exception("DeliberatelyFailingJob");
    }

    public function failed(): void
    {
        Log::error('no more tries');
    }
}
