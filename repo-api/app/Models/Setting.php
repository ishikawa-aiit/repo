<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 設定に関するモデル
 *
 * @property int $id
 * @property int $user_id ユーザーのID
 * @property int|null $team_id PTのID
 * @property string|null $slack_access_token Slack APIへのアクセストークン
 * @property string|null $slack_user_id Slack APIのユーザーID
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Team|null $team
 * @method static \Database\Factories\SettingFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting query()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereSlackAccessToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereSlackUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Setting extends Model
{
    use HasFactory;

    /**
     * 設定のコードからの代入可能カラム
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'team_id'
    ];

    /**
     * Userモデルへのリレーション定義
     *
     * @return BelongsTo<User, self>
     */
    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }

    /**
     * Teamモデルへのリレーション定義
     *
     * @return BelongsTo<Team, self>
     */
    public function team(): BelongsTo
    {
        return $this->BelongsTo(Team::class);
    }

    /**
     * Slack連携の有無
     *
     * @return boolean
     */
    public function hasSlackConnection(): bool
    {
        return !is_null($this->slack_access_token) && !is_null($this->slack_user_id);
    }
}
