<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::with('organization')->latest()->get();

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts,
        ]);
    }

    public function create()
    {
        $organizations = Organization::orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Admin/Contacts/Create', [
            'organizations' => $organizations,
        ]);
    }

    public function store(StoreContactRequest $request)
    {
        Contact::create($request->validated());

        return redirect()->route('admin.contacts.index')->with('success', 'Contact created successfully.');
    }

    public function show(Contact $contact)
    {
        $contact->load('organization');

        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $contact,
        ]);
    }

    public function edit(Contact $contact)
    {
        $organizations = Organization::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Admin/Contacts/Edit', [
            'contact' => $contact,
            'organizations' => $organizations,
        ]);
    }

    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $contact->update($request->validated());

        return redirect()->route('admin.contacts.index')->with('success', 'Contact updated successfully.');
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('admin.contacts.index')->with('success', 'Contact deleted successfully.');
    }
}
