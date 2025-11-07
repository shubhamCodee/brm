<?php

use App\Models\Tenant;
use App\Models\User;
use App\Services\MassActionService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('correctly mass soft-deletes users', function () {

    $tenant = Tenant::factory()->create();

    $usersToDelete = User::factory(3)->create([
        "tenant_id" => $tenant->id,
    ]);

    $userToKeep = User::factory()->create([
        "tenant_id" => $tenant->id,
    ]);

    $massActionService = app(MassActionService::class);

    $validatedData = [
        "ids" => $usersToDelete->pluck("id")->toArray(),
    ];

    $massActionService->massDeleteUsers($validatedData);

    foreach($usersToDelete as $user){
        $this->assertSoftDeleted("users", [
            "id" => $user->id,
        ]);
    }

    $this->assertDatabaseHas("users", [
        "id" => $userToKeep->id,
        "deleted_at" => null,
    ]);
    
});
