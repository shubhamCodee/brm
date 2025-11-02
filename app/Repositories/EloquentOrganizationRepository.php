<?php

namespace App\Repositories;

use App\Interfaces\OrganizationRepositoryInterface;
use App\Models\Contact;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Collection;

class EloquentOrganizationRepository implements OrganizationRepositoryInterface
{
    public function getAll(): Collection
    {
        return Organization::latest()->get();
    }

    public function findById(int $id): ?Organization
    {
        return Organization::findOrFail($id);
    }

    public function create(array $data): Organization
    {
        return Organization::create($data);
    }

    public function update(Organization $organization, array $data): bool
    {
        return $organization->update($data);
    }

    public function delete(Organization $organization): bool
    {
        return $organization->delete();
    }

    public function massUpdate(array $ids, string $status): int
    {
        return Organization::whereIn("id", $ids)->update(["status" => $status]);
    }

    public function massDestroy(array $ids): int
    {
        Contact::whereIn("organization_id", $ids)->delete();
        return Organization::whereIn("id", $ids)->delete();
    }
}
