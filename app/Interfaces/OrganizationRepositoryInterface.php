<?php

namespace App\Interfaces;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Collection;

interface OrganizationRepositoryInterface
{
    public function getAll(bool $paginated = false, int $perPage = 10);

    public function findById(int $id): ?Organization;

    public function create(array $data): Organization;

    public function update(Organization $organization, array $data): bool;

    public function delete(Organization $organization): bool;

    public function massUpdate(array $ids, string $status): int;

    public function massDestroy(array $ids): int;
}
