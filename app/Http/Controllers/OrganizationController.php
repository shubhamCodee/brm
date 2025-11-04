<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDestroyOrganizationRequest;
use App\Http\Requests\BulkUpdateOrganizationRequest;
use App\Http\Requests\StoreOrganizationRequest;
use App\Http\Requests\UpdateOrganizationRequest;
use App\Interfaces\OrganizationRepositoryInterface;
use App\Models\Organization;
use App\Services\MassActionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function __construct(
        private OrganizationRepositoryInterface $organizationRepository,
        private MassActionService $massActionService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Organizations/Index', [
            'organizations' => $this->organizationRepository->getAll(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Organizations/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrganizationRequest $request)
    {
        $this->organizationRepository->create($request->validated());

        return redirect()->route('admin.organizations.index')->with('success', 'Organization created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Organization $organization)
    {
        return Inertia::render('Admin/Organizations/Show', [
            'organization' => $organization,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Organization $organization)
    {
        return Inertia::render('Admin/Organizations/Edit', [
            'organization' => $organization,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrganizationRequest $request, Organization $organization)
    {
        $this->organizationRepository->update($organization, $request->validated());

        return redirect()->route('admin.organizations.index')->with('success', 'Organization updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organization $organization)
    {
        $this->organizationRepository->delete($organization);

        return redirect()->route('admin.organizations.index')->with('success', 'Organization deleted successfully.');
    }

    public function massUpdate(BulkUpdateOrganizationRequest $request)
    {
        $this->massActionService->massUpdateOrganizationStatus($request->validated());

        return redirect()->route('admin.organizations.index')->with('success', 'Organization statuses updated successfully.');
    }

    public function massDestroy(BulkDestroyOrganizationRequest $request)
    {
        $this->massActionService->massDeleteOrganizations($request->validated());

        return redirect()->route('admin.organizations.index')->with('success', 'Organizations deleted successfully.');
    }
}
