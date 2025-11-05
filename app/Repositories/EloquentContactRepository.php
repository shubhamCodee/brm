<?php

namespace App\Repositories;

use App\Interfaces\ContactRepositoryInterface;
use App\Models\Contact;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Collection;

class EloquentContactRepository implements ContactRepositoryInterface
{
    public function getAllWithOrganization(bool $paginated = false, int $perPage = 10)
    {
        $query = Contact::with("organization")->latest();

        if ($paginated) {
            return $query->paginate($perPage);
        }

        return $query->get();
    }

    public function findById(int $id): ?Contact
    {
        return Contact::find($id);
    }

    public function findWithOrganization(int $id): ?Contact
    {
        return Contact::with("organization")->find($id);
    }

    public function getOrganizationsForSelect(): Collection
    {
        return Organization::orderBy('name')->get(['id', 'name']);
    }

    public function create(array $data): Contact
    {
        return Contact::create($data);
    }

    public function update(Contact $contact, array $data): bool
    {
        return $contact->update($data);
    }

    public function delete(Contact $contact): bool
    {
        return $contact->delete();
    }

    public function massDestroy(array $ids): int
    {
        return Contact::whereIn('id', $ids)->delete();
    }
}
