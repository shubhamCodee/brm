<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\OrganizationController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware("auth:api")->group(function () {
    Route::apiResource("organizations", OrganizationController::class);
    Route::apiResource('contacts', ContactController::class);
    Route::apiResource("users", UserController::class);
});
