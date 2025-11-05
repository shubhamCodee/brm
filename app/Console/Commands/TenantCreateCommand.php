<?php

namespace App\Console\Commands;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class TenantCreateCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tenant:create {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates a new tenant and their first admin user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument("name");
        $this->info("Creating tenant: {$name}");

        $tenant = Tenant::create(["name" => $name]);

        $password = Str::random(12);

        User::create([
            'name' => 'Admin User',
            'email' => 'admin@' . strtolower(str_replace(' ', '', $name)) . '.com',
            'password' => bcrypt($password),
            'role' => 'admin',
            'tenant_id' => $tenant->id,
        ]);

        $this->info('Tenant and admin user created successfully!');
        $this->warn("Tenant Name: {$tenant->name}");
        $this->warn("Admin Email: admin@" . strtolower(str_replace(' ', '', $name)) . ".com");
        $this->warn("Admin Password: {$password}");

        return self::SUCCESS;
    }
}
