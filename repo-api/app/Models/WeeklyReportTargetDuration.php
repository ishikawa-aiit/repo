<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * 週報の対象期間に関するモデル
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $start_at 報告週の開始日
 * @property \Illuminate\Support\Carbon $end_at 報告週の終了日
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\WeeklyReportRequirement $weeklyReportRequirement
 * @method static \Database\Factories\WeeklyReportTargetDurationFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportTargetDuration newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportTargetDuration newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportTargetDuration query()
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportTargetDuration whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportTargetDuration whereEndAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportTargetDuration whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportTargetDuration whereStartAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WeeklyReportTargetDuration whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class WeeklyReportTargetDuration extends Model
{
    use HasFactory;

    /**
     * 週報対象期間のコードからの代入可能カラム
     *
     * @var array<string>
     */
    protected $fillable = [
        'start_at',
        'end_at',
    ];

    /**
     * キャストする必要のある属性
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_at' => 'date',
        'end_at' => 'date'
    ];

    /**
     * 週報要件モデルへのリレーション定義
     *
     * @return HasOne<WeeklyReportRequirement>
     */
    public function weeklyReportRequirement(): HasOne
    {
        return $this->hasOne(WeeklyReportRequirement::class);
    }
}
