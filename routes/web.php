<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Guest/Home');
})->name('home');

// auth routes
Route::get("/register", function () {
    return Inertia::render("Auth/Register");
});

Route::post("/register", [AuthController::class, "register"])->name("register");

Route::get("/login", function () {
    return Inertia::render("Auth/Login");
});

Route::post("/login", [AuthController::class, "login"])->name("login");

Route::post("/logout", [AuthController::class, "logout"])->name("logout");

// user routes
Route::middleware(["auth"])->group(function () {
    Route::get("/dashboard", function () {
        return Inertia::render("User/Dashboard");
    })->name("dashboard");
});

// admin routes
Route::middleware(["auth", "admin"])->prefix("admin")->name("admin.")->group(function () {
    Route::get("/dashboard", function () {
        return Inertia::render("Admin/Dashboard");
    })->name("dashboard");

    Route::resource("users", UserController::class);
});
