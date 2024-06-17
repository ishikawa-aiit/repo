<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Templateモデル用のデータファクトリー
 *
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Template>
 */
class TemplateFactory extends Factory
{
    /**
     * カスタムテンプレートデータを生成する
     *
     * @todo バリデーション導入時の文字数再検討（テストデータが最小/最大文字数に抵触する可能性がある場合のみ）
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'team_id' => Team::factory(),
            'name' => $this->faker->realText(15),
            'activity_time' => $this->faker->realText(15),
            'done_activity' => $this->faker->realText(15),
            'todo_activity' => $this->faker->realText(15),
            'solution' => $this->faker->realText(15),
            'event' => $this->faker->realText(15),
            'remark' => $this->faker->realText(15)
        ];
    }
}
