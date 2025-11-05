<?php

namespace App\Interfaces;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Collection;

interface ContactRepositoryInterface
{
    public function getAllWithOrganization(bool $paginated = false, int $perPage = 10);

    public function findById(int $id): ?Contact;

    public function findWithOrganization(int $id): ?Contact;

    public function getOrganizationsForSelect(): Collection;

    public function create(array $data): Contact;

    public function update(Contact $contact, array $data): bool;

    public function delete(Contact $contact): bool;

    public function massDestroy(array $ids): int;
}
