<?php

namespace Database\Factories;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Organization>
 */
class OrganizationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->company(),
            'email' => fake()->unique()->companyEmail(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->streetAddress(),
            'city' => fake()->city(),
            'region' => fake()->state(),
            'country' => fake()->randomElement(['USA', 'Canada', 'UK', 'Australia']),
            'postal_code' => fake()->postcode(),
            'status' => fake()->randomElement(['lead', 'active', 'former']),
            'industry' => fake()->randomElements(['SaaS', 'E-commerce', 'Healthcare', 'FinTech', 'Education'], fake()->numberBetween(1, 3)),
            'notes' => fake()->optional()->paragraph(),
            "tenant_id" => Tenant::factory(),
        ];
    }
}
