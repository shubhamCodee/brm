<?php

namespace App\Console\Commands;

use App\Mail\SlowEmail;
use App\Mail\UrgentEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Console\Command;

class MailOptimizationCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mail:optimize';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'sending urgent and slow emails simultaneously...';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Dispatching Urgent #1 (before slow tasks)...');

        DB::table('sent_emails')->insert([
            'recipient' => 'urgent1@example.com',
            'type' => 'urgent',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Mail::to('urgent1@example.com')
            ->queue((new UrgentEmail())->onQueue('high'));


        $this->info('Dispatching 500 slow emails and injecting urgent tasks during execution...');

        for ($i = 1; $i <= 500; $i++) {

            DB::table('sent_emails')->insert([
                'recipient' => "slow{$i}@example.com",
                'type' => 'slow',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            Mail::to("slow{$i}@example.com")
                ->queue((new SlowEmail())->onQueue('low'));

            if ($i === 100) {
                DB::table('sent_emails')->insert([
                    'recipient' => 'urgent2@example.com',
                    'type' => 'urgent',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                Mail::to('urgent2@example.com')
                    ->queue((new UrgentEmail())->onQueue('high'));
            }

            if ($i === 250) {
                DB::table('sent_emails')->insert([
                    'recipient' => 'urgent3@example.com',
                    'type' => 'urgent',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                Mail::to('urgent3@example.com')
                    ->queue((new UrgentEmail())->onQueue('high'));
            }
        }


        DB::table('sent_emails')->insert([
            'recipient' => 'urgent4@example.com',
            'type' => 'urgent',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Mail::to('urgent4@example.com')
            ->queue((new UrgentEmail())->onQueue('high'));

        $this->info('All tasks queued successfully.');
        return self::SUCCESS;
    }
}
