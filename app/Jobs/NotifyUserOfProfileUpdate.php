<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class NotifyUserOfProfileUpdate implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */

    public User $user;
    public array $changes;

    public function __construct(User $user, array $changes)
    {
        $this->user = $user;
        $this->changes = $changes;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $changedFields = implode(", ", array_keys($this->changes));

        Log::info("User from update for {$this->user->name}. Fields changed: {$changedFields}");
    }
}
