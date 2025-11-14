<?php

namespace App\Jobs\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class LogJobLifecycle
{
    /**
     * Process the queued job.
     *
     * @param  \Closure(object): void  $next
     */
    public function handle(object $job, Closure $next): void
    {
        Log::info("middleware started");

        $next($job);

        Log::info("middleware ended");
    }
}
