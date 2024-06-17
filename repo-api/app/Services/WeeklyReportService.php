<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use App\Models\WeeklyReport;
use Illuminate\Database\Eloquent\Collection;

/**
 * 週報に関するサービス
 */
class WeeklyReportService
{
    /**
     * 週報を新規作成します。
     *
     * @param array<string, mixed> $contents 作成したい週報のコンテンツ
     * @param User $user     認証されたユーザー
     *
     * @return WeeklyReport 作成した週報データ
     */
    public function create(array $contents, User $user): WeeklyReport
    {
        return $user->weeklyReports()->create($contents);
    }

    /**
     * 週報の一覧のデータを返します。
     *
     * @param User $user 認証されたユーザー
     *
     * @return Collection<int, WeeklyReport> 作成した週報データ
     */
    public function index(User $user): Collection
    {
        return $user->weeklyReports->loadMissing('weeklyReportRequirement.weeklyReportTargetDuration')->sortBy([
            function (WeeklyReport $firstReport, WeeklyReport $secondReport): int {
                $firstDate = $firstReport->weeklyReportRequirement->weeklyReportTargetDuration->start_at;
                $secondDate = $secondReport->weeklyReportRequirement->weeklyReportTargetDuration->start_at;

                if ($firstDate->gt($secondDate)) {
                    return -1;
                }
                return $firstDate->eq($secondDate) ? 0 : 1;
            },
            ['created_at', 'desc'],
        ]);
    }
}
