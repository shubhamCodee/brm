<?php

namespace App\Services;

use App\Models\Contact;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class MassActionService
{
    public function massDeleteUsers(array $validatedData): void
    {
        User::whereIn("id", $validatedData["ids"])->delete();
    }

    public function massDeleteContacts(array $validatedData): void
    {
        Contact::whereIn('id', $validatedData['ids'])->delete();
    }

    public function massDeleteOrganizations(array $validatedData): void
    {
        DB::transaction(function () use ($validatedData) {
            Contact::whereIn('organization_id', $validatedData['ids'])->delete();
            Organization::whereIn('id', $validatedData['ids'])->delete();
        });
    }

    public function massUpdateUserRoles(array $validatedData): void
    {
        User::whereIn('id', $validatedData['ids'])->update([
            'role' => $validatedData['role']
        ]);
    }

    public function massUpdateOrganizationStatus(array $validatedData): void
    {
        Organization::whereIn('id', $validatedData['ids'])->update([
            'status' => $validatedData['status']
        ]);
    }
}
