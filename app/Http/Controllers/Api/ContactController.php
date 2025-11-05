<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Interfaces\ContactRepositoryInterface;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function __construct(
        private ContactRepositoryInterface $contactRepository
    ) {}

    public function index()
    {
        $contacts = $this->contactRepository->getAllWithOrganization(true, 10);

        return response()->json($contacts);
    }

    public function store(StoreContactRequest $request)
    {
        $contact = $this->contactRepository->create($request->validated());

        return response()->json($contact, 201);
    }

    public function show(int $id)
    {
        $contact = $this->contactRepository->findWithOrganization($id);

        return response()->json($contact);
    }

    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $this->contactRepository->update($contact, $request->validated());

        return response()->json($contact->fresh()->load('organization'));
    }

    public function destroy(Contact $contact)
    {
        $this->contactRepository->delete($contact);

        return response()->json(null, 204);
    }
}
