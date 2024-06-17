<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * WeeklyReportSubmissionDurationモデル用のデータファクトリー
 *
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WeeklyReportSubmissionDuration>
 */
class WeeklyReportSubmissionDurationFactory extends Factory
{
    /**
     * 週報提出期間のデータを生成する
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
