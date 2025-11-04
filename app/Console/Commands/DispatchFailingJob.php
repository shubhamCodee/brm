<?php

namespace App\Console\Commands;

use App\Jobs\DeliberatelyFailingJob;
use Illuminate\Console\Command;

class DispatchFailingJob extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:dispatch-failing-job';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        DeliberatelyFailingJob::dispatch();
        $this->info("the deliberately failing job has been dispatched to the queue");
    }
}
