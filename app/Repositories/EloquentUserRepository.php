<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;

class EloquentUserRepository implements UserRepositoryInterface
{
    public function getAll(): Collection
    {
        return User::latest()->get();
    }

    public function findById(int $id): ?User
    {
        return User::find($id);
    }

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function update(User $user, array $data): bool
    {
        return $user->update($data);
    }

    public function delete(User $user): bool
    {
        return $user->delete();
    }

    public function massUpdate(array $ids, array $data): int
    {
        return User::whereIn('id', $ids)->update($data);
    }

    public function massDestroy(array $ids): int
    {
        $usersToDelete = User::whereIn('id', $ids)->get();

        foreach ($usersToDelete as $user) {
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }
        }

        return User::whereIn('id', $ids)->delete();
    }
}
