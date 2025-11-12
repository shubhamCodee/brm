<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrganizationRequest;
use App\Http\Requests\UpdateOrganizationRequest;
use App\Interfaces\OrganizationRepositoryInterface;
use App\Models\Organization;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    public function __construct(
        private OrganizationRepositoryInterface $organizationRepository
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $organizations = $this->organizationRepository->getAll(true, 10);
        return response()->json($organizations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrganizationRequest $request)
    {
        $validatedData = $request->validated();

        $validatedData['tenant_id'] = auth()->user()->tenant_id;

        $organization = $this->organizationRepository->create($validatedData);

        // $organization = $this->organizationRepository->create($request->validated());

        return response()->json($organization, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Organization $organization)
    {
        return response()->json($organization);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrganizationRequest $request, Organization $organization)
    {
        $this->organizationRepository->update($organization, $request->validated());

        // Return the freshly updated model
        return response()->json($organization->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organization $organization)
    {
        $this->organizationRepository->delete($organization);

        return response()->json(null, 204);
    }
}
