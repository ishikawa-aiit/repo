<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Setting;
use App\Models\Team;
use App\Models\Template;
use App\Models\User;
use App\Models\WeeklyReport;
use Illuminate\Database\Seeder;

/**
 * シーダー
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        $this->call(TeamSeeder::class);
        $this->call(WeeklyReportRequirementSeeder::class);

        $email = config('database.seeder.email');
        if ($email === null || $email === '') {
            fputs(STDERR, ".envファイルに SEEDER_USER_EMAIL が指定されていません。\n");
            return;
        }

        User::factory()->has(WeeklyReport::factory()
            ->count(3))
            ->create([
                'email' => $email, // 週報を表示するため、自分のAIITアドレスに紐づける
            ])->each(function (User $user): void {
                Template::factory()->for($user)->count(3)->create();
                Setting::factory()->for($user)->for(Team::first())->create();
            });
    }
}
