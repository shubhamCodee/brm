<?php

namespace App\Console\Commands;

use App\Mail\DailyReportMail;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendDailyReports extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-daily-reports {--tenant=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate and send a daily report for each tenant.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info("Starting to generate and send daily reports...");

        $tenantId = $this->option("tenant");

        if ($tenantId) {
            $tenants = Tenant::where('id', $tenantId)->get();

            if ($tenants->isEmpty()) {
                $this->error("No tenant found with ID: " . $tenantId);
                return self::FAILURE;
            }
        } else {
            $tenants = Tenant::all();
        }

        $tenants->each(function (Tenant $tenant) {
            $this->line("Processing report for tenant: {$tenant->name} (ID: {$tenant->id})");

            $adminUser = User::where("tenant_id", $tenant->id)->where("role", "admin")->first();

            if (! $adminUser) {
                $this->warn("-> No admin user found for tenant {$tenant->name}. Skipping.");
                return;
            }

            $newUsersCount = User::where("tenant_id", $tenant->id)->whereDate("created_at", today())->count();

            Mail::to($adminUser)->queue(new DailyReportMail($tenant, $newUsersCount));

            $this->info(" -> Report sent to {$adminUser->email}. Found {$newUsersCount} new users today.");
        });

        $this->info("Daily reports generated successfully");
        return self::SUCCESS;
    }
}
