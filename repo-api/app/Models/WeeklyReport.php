<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 週報に関するモデル
 *
 * @property int $id
 * @property int $user_id ユーザーテーブルのID
 * @property int $weekly_report_requirement_id 週報要件のID
 * @property string $activity_time 活動時間
 * @property string $done_activity 今週の活動と成果の実績
 * @property string $todo_activity 来週の活動と成果の予定
 * @property string $solution 課題と解決策
 * @property string $event できごと・気づき
 * @property string $remark 特記事項
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\WeeklyReportRequirement $weeklyReportRequirement
 * @method static \Database\Factories\WeeklyReportFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport query()
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport whereActivityTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport whereDoneActivity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport whereEvent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport whereRemark($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport whereSolution($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport whereTodoActivity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReport whereWeeklyReportRequirementId($value)
 * @mixin \Eloquent
 */
class WeeklyReport extends Model
{
    use HasFactory;

    /**
     * 週報のコードからの代入可能カラム
     *
     * @var array<string>
     */
    protected $fillable = [
        'user_id',
        'weekly_report_requirement_id',
        'activity_time',
        'done_activity',
        'todo_activity',
        'solution',
        'event',
        'remark'
    ];

    /**
     * ユーザーモデルへのリレーション定義
     *
     * @return BelongsTo<User, self>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * 週報要件へのリレーション定義
     *
     * @return BelongsTo<WeeklyReportRequirement, self>
     */
    public function weeklyReportRequirement(): BelongsTo
    {
        return $this->belongsTo(WeeklyReportRequirement::class);
    }
}
