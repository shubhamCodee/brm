<?php

namespace App\Interfaces;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface UserRepositoryInterface
{
    public function getAll(bool $paginated = false, int $perPage = 10);

    public function findById(int $id): ?User;

    public function create(array $data): User;

    public function update(User $user, array $data): bool;

    public function delete(User $user): bool;

    public function massUpdate(array $ids, array $data): int;

    public function massDestroy(array $ids): int;
}
