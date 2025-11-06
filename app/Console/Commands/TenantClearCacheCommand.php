<?php

namespace App\Console\Commands;

use App\Models\Tenant;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class TenantClearCacheCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cache:clear-for-tenant {tenant}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clears all cache entries for a specific tenant by their ID.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tenantId = $this->argument("tenant");

        $tenant = Tenant::find($tenantId);
        if (! $tenant) {
            $this->error("No tenant found with ID: {$tenantId}");
            return self::FAILURE;
        }

        $this->info("Clearing cache for tenant: {$tenant->name} (ID: {$tenantId})");

        Cache::tags("tenant:" . $tenantId)->flush();

        $this->info("Cache cleared successfully for tenant: {$tenant->name}.");
        return self::SUCCESS;
    }
}
