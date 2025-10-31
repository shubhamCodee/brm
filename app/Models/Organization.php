<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Organization extends Model
{
    /** @use HasFactory<\Database\Factories\OrganizationFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'city',
        'region',
        'country',
        'postal_code',
        'status',
        'industry',
        'notes',
    ];

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    protected static function booted()
    {
        static::deleting(function (Organization $organization) {
            $organization->contacts()->delete();
        });
    }

    protected $casts = [
        "industry" => "array"
    ];
}
