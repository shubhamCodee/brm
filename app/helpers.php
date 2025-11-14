<?php

use Illuminate\Support\Facades\Auth;

function redirectToDashboard()
{
    if (! Auth::check()) {
        return null;
    }

    return Auth::user()->role === 'admin'
        ? redirect()->route('admin.dashboard')
        : redirect()->route('dashboard');
}
