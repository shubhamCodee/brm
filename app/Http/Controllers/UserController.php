<?php

namespace App\Http\Controllers;

use App\Events\UserProfileUpdated;
use App\Http\Requests\MassDestroyUserRequest;
use App\Http\Requests\MassUpdateUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Interfaces\UserRepositoryInterface;
use App\Jobs\NotifyUserOfProfileUpdate;
use App\Models\User;
use App\Services\MassActionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(
        private UserRepositoryInterface $userRepository,
        private MassActionService $massActionService
    ) {}

    public function index()
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => $this->userRepository->getAll(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(StoreUserRequest $request)
    {
        $validatedData = $request->validated();

        if ($request->hasFile("profile_picture")) {
            $path = $request->file("profile_picture")->store("profile_pictures", "public");
            $validatedData["profile_picture"] = $path;
        }

        $this->userRepository->create($validatedData);

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $validatedData = $request->safe()->except("profile_picture");

        if (empty($validatedData["password"])) {
            unset($validatedData["password"]);
        }

        if ($request->hasFile("profile_picture")) {
            if ($user->profile_picture) {
                Storage::disk("public")->delete($user->profile_picture);
            }

            $path = $request->file("profile_picture")->store("profile_pictures", "public");
            $validatedData["profile_picture"] = $path;
        }

        $user->fill($validatedData);
        $changes = $user->getDirty();

        $this->userRepository->update($user, $validatedData);

        if (!empty($changes)) {
            $changedFields = implode(", ", array_keys($changes));
            $message = "Your profile has been updated by an admin. Fields changed {$changedFields}";

            // event(new UserProfileUpdated($user, $message));
            UserProfileUpdated::dispatch($user, $message);
        }

        return redirect()->route("admin.users.index")->with('success', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        if ($user->profile_picture) {
            Storage::disk("public")->delete($user->profile_picture);
        }

        $this->userRepository->delete($user);

        return redirect('/admin/users')->with('success', 'User deleted successfully');
    }

    public function massUpdate(MassUpdateUserRequest $request)
    {
        $this->massActionService->massUpdateUserRoles($request->validated());

        return redirect()->route('admin.users.index')->with('success', 'User roles updated successfully.');
    }

    public function massDestroy(MassDestroyUserRequest $request)
    {
        $this->massActionService->massDeleteUsers($request->validated());

        return redirect()->route('admin.users.index')->with('success', 'Users deleted successfully.');
    }
}
