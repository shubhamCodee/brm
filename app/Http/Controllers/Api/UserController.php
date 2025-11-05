<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function __construct(
        private UserRepositoryInterface $userRepository
    ) {}

    public function index()
    {
        $users = $this->userRepository->getAll(true, 10);

        return response()->json($users);
    }

    public function store(StoreUserRequest $request)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
            $validatedData['profile_picture'] = $path;
        }

        $user = $this->userRepository->create($validatedData);

        return response()->json($user, 201);
    }

    public function show(User $user)
    {
        return response()->json($user);
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

        $this->userRepository->update($user, $validatedData);

        return response()->json($user->fresh());
    }

    public function destroy(User $user)
    {
        if ($user->profile_picture) {
            Storage::disk("public")->delete($user->profile_picture);
        }

        $this->userRepository->delete($user);

        return response()->json(null, 204);
    }
}
