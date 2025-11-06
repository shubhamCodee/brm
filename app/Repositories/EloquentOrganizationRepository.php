<?php

namespace App\Repositories;

use App\Interfaces\OrganizationRepositoryInterface;
use App\Models\Contact;
use App\Models\Organization;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class EloquentOrganizationRepository implements OrganizationRepositoryInterface
{
    public function getAll(bool $paginated = false, int $perPage = 10)
    {
        $tenantId = Auth::user()->tenant_id;
        $tags = ['organizations', 'tenant:' . $tenantId];
        $key = 'organizations.tenant.' . $tenantId;

        return Cache::tags($tags)->remember($key, now()->addMinutes(60), function () use ($paginated, $perPage, $tenantId) {
            Log::info("=== DATABASE HIT: Fetching organizations for Tenant ID: {$tenantId} ===");

            $query = Organization::latest();

            if ($paginated) {
                return $query->paginate($perPage);
            }

            return $query->get();
        });
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
