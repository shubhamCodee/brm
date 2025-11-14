<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if ($redirect = redirectToDashboard()) return $redirect;
    return Inertia::render('Guest/Home');
})->name('home');

// auth routes
Route::get("/register", function () {
    if ($redirect = redirectToDashboard()) return $redirect;
    return Inertia::render("Auth/Register");
});

Route::post("/register", [AuthController::class, "register"])->name("register");

Route::get("/login", function () {
    if ($redirect = redirectToDashboard()) return $redirect;
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

    Route::get("/dashboard", [AdminDashboardController::class, "index"])->name("dashboard");

    Route::patch("users/mass-update", [UserController::class, "massUpdate"])->name("users.mass-update");
    Route::delete("users/mass-destroy", [UserController::class, "massDestroy"])->name("users.mass-destroy");
    Route::resource("users", UserController::class);

    Route::patch("organizations/mass-update", [OrganizationController::class, "massUpdate"])->name("organizations.mass-update");
    Route::delete("organizations/mass-destroy", [OrganizationController::class, "massDestroy"])->name("organizations.mass-destroy");
    Route::resource("organizations", OrganizationController::class);

    Route::delete("contacts/mass-destroy", [ContactController::class, "massDestroy"])->name("contacts.mass-destroy");
    Route::resource("contacts", ContactController::class);
});
