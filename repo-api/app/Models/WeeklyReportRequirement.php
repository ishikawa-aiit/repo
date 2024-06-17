<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

// phpcs phpDoc 改行できないので、文字数制限を解除
// phpcs:disable Generic.Files.LineLength

/**
 * 週報の要件に関するモデル
 *
 * @property int $id
 * @property int $weekly_report_target_duration_id 週報の対象の期間のID
 * @property int $weekly_report_submission_duration_id 週報の提出の期間のID
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\WeeklyReportSubmissionDuration $weeklyReportSubmissionDuration
 * @property-read \App\Models\WeeklyReportTargetDuration $weeklyReportTargetDuration
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\WeeklyReport[] $weeklyReports
 * @property-read int|null $weekly_reports_count
 * @method static \Database\Factories\WeeklyReportRequirementFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportRequirement newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportRequirement newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportRequirement query()
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportRequirement whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportRequirement whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportRequirement whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportRequirement whereWeeklyReportSubmissionDurationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportRequirement whereWeeklyReportTargetDurationId($value)
 * @mixin \Eloquent
 */
class WeeklyReportRequirement extends Model
{
    // phpcs:enable
    use HasFactory;

    /**
     * 週報要件のコードからの代入可能カラム
     *
     * @var array<string>
     */
    protected $fillable = [
        'weekly_report_target_duration_id',
        'weekly_report_submission_duration_id',
    ];

    /**
     * 週報モデルへのリレーション定義
     *
     * @return HasMany<WeeklyReport>
     */
    public function weeklyReports(): HasMany
    {
        return $this->hasMany(WeeklyReport::class);
    }

    /**
     * 週報対象期間モデルへのリレーション定義
     *
     * @return BelongsTo<WeeklyReportTargetDuration, self>
     */
    public function weeklyReportTargetDuration(): BelongsTo
    {
        return $this->belongsTo(WeeklyReportTargetDuration::class);
    }

    /**
     * 週報提出期間モデルへのリレーション定義
     *
     * @return BelongsTo<WeeklyReportSubmissionDuration, self>
     */
    public function weeklyReportSubmissionDuration(): BelongsTo
    {
        return $this->belongsTo(WeeklyReportSubmissionDuration::class);
    }
}
