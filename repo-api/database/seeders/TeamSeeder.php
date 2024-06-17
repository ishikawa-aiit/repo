<?php

declare(strict_types=1);

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;

/**
 * シーダー
 */
class TeamSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        $teams = [
            '飛田PT', '嶋津PT', '追川PT', '中鉢PT', '小山PT', '三好（き）PT', '奥原PT',
            '林PT', '伊藤PT', '越水PT', '内山PT', '村越PT', '前田PT', '三好（祐）PT',
            '吉田PT', '松尾PT', '板倉PT', '細田PT',
        ];

        $now = Carbon::now();

        $upsertInfo = [];
        foreach ($teams as $team) {
            $upsertInfo[] = [
                'name' => $team,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        \DB::transaction(function () use ($upsertInfo): void {
            \DB::table('teams')->upsert($upsertInfo, ['name'], ['created_at', 'updated_at']);
        });
    }
}
