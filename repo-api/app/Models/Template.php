<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * カスタムテンプレートに関するモデル
 *
 * @property int $id
 * @property int $user_id ユーザーテーブルのID
 * @property int|null $team_id プロジェクトチームテーブルのID
 * @property string $name テンプレート名
 * @property string|null $activity_time 活動時間
 * @property string|null $done_activity 今週の活動と成果の実績
 * @property string|null $todo_activity 来週の活動と成果の予定
 * @property string|null $solution 課題と解決策
 * @property string|null $event できごと・気づき
 * @property string|null $remark 特記事項
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Team|null $team
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\TemplateFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Template newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Template newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Template query()
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereActivityTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereDoneActivity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereEvent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereRemark($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereSolution($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereTodoActivity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereUserId($value)
 * @mixin \Eloquent
 */
class Template extends Model
{
    use HasFactory;

    /**
     * カスタムテンプレートのコードからの代入可能カラム
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'team_id',
        'name',
        'activity_time',
        'done_activity',
        'todo_activity',
        'solution',
        'event',
        'remark',
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
     * プロジェクトチームへのリレーション定義
     *
     * @return BelongsTo<Team, self>
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
