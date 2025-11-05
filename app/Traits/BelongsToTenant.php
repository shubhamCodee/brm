<?php

namespace App\Traits;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

trait BelongsToTenant
{
    protected static function booted(): void
    {
        static::addGlobalScope("tenant", function (Builder $builder) {
            if (Auth::check()) {
                $builder->where("tenant_id", Auth::user()->tenant_id);
            }
        });

        static::creating(function (Model $model) {
            if ($model->tenant_id) {
                return;
            }

            if (Auth::check()) {
                $model->tenant_id = Auth::user()->tenant_id;
            }
        });
    }

    public function tenant()
    {
        $this->belongsTo(Tenant::class);
    }
}
