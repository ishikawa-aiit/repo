<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\WeeklyReportSubmissionDuration;
use App\Models\WeeklyReportTargetDuration;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * WeeklyReportRequirementモデル用のデータファクトリー
 *
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WeeklyReportRequirement>
 */
class WeeklyReportRequirementFactory extends Factory
{
    /**
     * 週報要件データを生成する
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'weekly_report_target_duration_id' => WeeklyReportTargetDuration::factory(),
            'weekly_report_submission_duration_id' => WeeklyReportSubmissionDuration::factory(),
        ];
    }
}
