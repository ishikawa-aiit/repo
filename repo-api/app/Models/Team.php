<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * PTに関するモデル
 *
 * @property int $id
 * @property string $name PT名
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Setting[] $settings
 * @property-read int|null $settings_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Template> $templates
 * @property-read int|null $templates_count
 * @method static \Database\Factories\TeamFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Team newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Team newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Team query()
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Team extends Model
{
    use HasFactory;

    /**
     * PTのコードからの代入可能カラム
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name'
    ];

    /**
     * Settingモデルへのリレーション定義
     *
     * @return HasMany<Setting>
     */
    public function settings(): HasMany
    {
        return $this->HasMany(Setting::class);
    }

    /**
     * テンプレートとのリレーション
     *
     * @return HasMany<Template>
     */
    public function templates(): HasMany
    {
        return $this->hasMany(Template::class);
    }
}
