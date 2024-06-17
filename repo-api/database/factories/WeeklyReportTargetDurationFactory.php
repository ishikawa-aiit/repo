<?php

declare(strict_types=1);

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * WeeklyReportTargetDurationモデル用のデータファクトリー
 *
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WeeklyReportTargetDuration>
 */
class WeeklyReportTargetDurationFactory extends Factory
{
    /**
     * 週報対象期間のデータを生成する
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'start_at' => new Carbon($this->faker->date()),
            'end_at' => new Carbon($this->faker->date()),
        ];
    }
}
