<?php

namespace App\Http\Controllers;

use App\Http\Requests\MassDestroyContactRequest;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Interfaces\ContactRepositoryInterface;
use App\Models\Contact;
use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Shubham\MassActionService\MassActionService;

class ContactController extends Controller
{
    public function __construct(
        private ContactRepositoryInterface $contactRepository,
        private MassActionService $massActionService
    ) {}

    public function index()
    {
        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $this->contactRepository->getAllWithOrganization(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Contacts/Create', [
            'organizations' => $this->contactRepository->getOrganizationsForSelect(),
        ]);
    }

    public function store(StoreContactRequest $request)
    {
        $this->contactRepository->create($request->validated());

        return redirect()->route('admin.contacts.index')->with('success', 'Contact created successfully.');
    }

    public function show(int $id)
    {
        $contact = $this->contactRepository->findWithOrganization($id);

        if (!$contact) {
            abort(404);
        }

        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $this->contactRepository->findWithOrganization($id),
        ]);
    }

    public function edit(Contact $contact)
    {
        return Inertia::render('Admin/Contacts/Edit', [
            'contact' => $contact,
            'organizations' => $this->contactRepository->getOrganizationsForSelect(),
        ]);
    }

    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $this->contactRepository->update($contact, $request->validated());

        return redirect()->route('admin.contacts.index')->with('success', 'Contact updated successfully.');
    }

    public function destroy(Contact $contact)
    {
        $this->contactRepository->delete($contact);

        return redirect()->route('admin.contacts.index')->with('success', 'Contact deleted successfully.');
    }

    public function massDestroy(MassDestroyContactRequest $request)
    {
        $this->massActionService->massDeleteContacts($request->validated());

        return redirect()->route('admin.contacts.index')->with('success', 'Contacts deleted successfully.');
    }
}
