<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\WeeklyReportRequirement;
use Illuminate\Database\Eloquent\Collection;

/**
 * 週報要件に関するサービス
 */
class WeeklyReportRequirementService
{
    /**
     * 週報要件のデータを返します。
     *
     * @return Collection<int, WeeklyReportRequirement> 週報要件データ
     */
    public function index(): Collection
    {
        return WeeklyReportRequirement::with('weeklyReportTargetDuration', 'weeklyReportSubmissionDuration')
            ->join(
                'weekly_report_target_durations',
                'weekly_report_requirements.weekly_report_target_duration_id',
                '=',
                'weekly_report_target_durations.id'
            )
            ->orderBy('weekly_report_target_durations.start_at')
            ->get();
    }
}
