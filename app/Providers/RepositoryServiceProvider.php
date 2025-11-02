<?php

namespace App\Providers;

use App\Interfaces\ContactRepositoryInterface;
use App\Interfaces\OrganizationRepositoryInterface;
use App\Interfaces\UserRepositoryInterface;
use App\Repositories\EloquentContactRepository;
use App\Repositories\EloquentOrganizationRepository;
use App\Repositories\EloquentUserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(OrganizationRepositoryInterface::class, EloquentOrganizationRepository::class);

        $this->app->bind(ContactRepositoryInterface::class,  EloquentContactRepository::class);

        $this->app->bind(
            UserRepositoryInterface::class,
            EloquentUserRepository::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
