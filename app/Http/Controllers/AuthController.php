<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(RegisterUserRequest $request)
    {
        $validatedData = $request->validated();

        if ($request->hasFile("profile_picture")) {
            $path = $request->file("profile_picture")->store("profile_pictures", "public");
            $validatedData["profile_picture"] = $path;
        }

        $validatedData["role"] = "user";

        $user = User::create($validatedData);

        Auth::login($user);

        return redirect("/dashboard");
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            "email" => "required|email",
            "password" => "required",
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            if (Auth::user()->role === "admin") {
                return redirect()->route("admin.dashboard");
            }

            return redirect("/dashboard");
        }

        return back()->withErrors([
            "email" => "invalid credentials",
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route("login");
    }
}
