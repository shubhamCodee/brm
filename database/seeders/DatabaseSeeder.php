<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Tenant;
use App\Models\User;
use App\Models\Organization;
use App\Models\Contact;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $this->call(TenantSeeder::class);

        // $tenant = Tenant::where('name', 'Default Company')->first();

        // $adminUser = User::factory()->create([
        //     'name' => 'Admin User',
        //     'email' => 'admin@example.com',
        //     'role' => 'admin',
        //     'tenant_id' => $tenant->id,
        // ]);

        // User::factory(10)->create([
        //     'tenant_id' => $tenant->id,
        // ]);

        // $organizations = Organization::factory(20)->create([
        //     'tenant_id' => $tenant->id,
        // ]);

        // Contact::factory(50)
        //     ->recycle($organizations)
        //     ->create([
        //         'tenant_id' => $tenant->id,
        //     ]);
    }
}
