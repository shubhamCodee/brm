<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
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

        User::create($validatedData);

        return redirect()->route("admin.users.index");
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $validatedData = $request->validated();

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

        $user->update($validatedData);

        return redirect()->route("admin.users.index")->with('success', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect('/admin/users')->with('success', 'User deleted successfully');
    }
}
