<?php

use App\Models\Tenant;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignIdFor(Tenant::class)->constrained()->cascadeOnDelete();
        });

        Schema::table("organizations", function (Blueprint $table) {
            $table->foreignIdFor(Tenant::class)->constrained()->cascadeOnDelete();
        });

        Schema::table('contacts', function (Blueprint $table) {
            $table->foreignIdFor(Tenant::class)->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeignIdFor(Tenant::class);
        });

        Schema::table('organizations', function (Blueprint $table) {
            $table->dropForeignIdFor(Tenant::class);
        });

        Schema::table('contacts', function (Blueprint $table) {
            $table->dropForeignIdFor(Tenant::class);
        });
    }
};
