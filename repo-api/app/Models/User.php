<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

// phpcs phpDoc 改行できないので、文字数制限を解除
// phpcs:disable Generic.Files.LineLength

/**
 * Userに関するモデル
 *
 * @property int $id
 * @property string $name ユーザー名
 * @property string $email ユーザーのemail
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Setting|null $setting
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Template[] $templates
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\WeeklyReport[] $weeklyReports
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Sanctum\PersonalAccessToken[] $tokens
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $templates_count
 * @property-read int|null $tokens_count
 * @property-read int|null $weekly_reports_count
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    // phpcs:enable
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    /** @var array<string> Userのコードからの代入可能カラム */
    protected $fillable = [
        'name',
        'email'
    ];

    /**
     * WeeklyReportモデルへのリレーション定義
     *
     * @return HasMany<WeeklyReport>
     */
    public function weeklyReports(): HasMany
    {
        return $this->hasMany(WeeklyReport::class);
    }

    /**
     * Templateモデルへのリレーション定義
     *
     * @return HasMany<Template>
     */
    public function templates(): HasMany
    {
        return $this->hasMany(Template::class);
    }

    /**
     * Settingモデルへのリレーション定義
     *
     * @return HasOne<Setting>
     */
    public function setting(): HasOne
    {
        return $this->hasOne(Setting::class);
    }

    /**
     * PTに所属しているか
     *
     * @return boolean
     */
    public function belongsToPT(): bool
    {
        return $this->setting?->team_id !== null;
    }
}
