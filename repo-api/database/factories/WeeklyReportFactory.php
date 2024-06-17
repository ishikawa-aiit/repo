<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\User;
use App\Models\WeeklyReportRequirement;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * WeeklyReportモデル用のデータファクトリー
 *
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WeeklyReport>
 */
class WeeklyReportFactory extends Factory
{
    private const TEAM = '- チーム';
    private const PERSONAL = '- 個人';
    private const PROBLEM = '課題: ';
    private const SOLUTION = '解決策: ';

    /**
     * 週報データを生成する
     *
     * @todo バリデーション導入時の行数再検討（テストデータが最小/最大文字数に抵触する可能性がある場合のみ）
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'weekly_report_requirement_id' => WeeklyReportRequirement::factory(),
            'activity_time' => "協同時間: {$this->faker->time('H時間i分')}\n各自作業: {$this->faker->time('H時間i分')}",
            'done_activity' => $this->generateRandomContent(1, 3),
            'todo_activity' => $this->generateRandomContent(1, 3),
            'solution' => $this->generateRandomContentForSolution(1, 3),
            'event' => $this->generateRandomContent(1, 3),
            'remark' => $this->generateRandomContent(1, 3)
        ];
    }

    /**
     * チーム、個人についての記載が必要な項目の文字列を作成する
     *
     * @param integer $min 最小箇条書き数
     * @param integer $max 最大箇条書き数
     * @return string テストデータ用文字列
     */
    private function generateRandomContent(int $min, int $max): string
    {
        $texts[] = self::TEAM;
        for ($i = 0; $i < $this->faker->numberBetween($min, $max); $i++) {
            $texts[] = $this->generateRandomTextOneItem();
        }
        $texts[] = self::PERSONAL;
        for ($i = 0; $i < $this->faker->numberBetween($min, $max); $i++) {
            $texts[] = $this->generateRandomTextOneItem();
        }
        return implode(PHP_EOL, $texts);
    }

    /**
     * 「課題と解決策」の文字列を作成する
     *
     * @param integer $min 最小箇条書き数
     * @param integer $max 最大箇条書き数
     * @return string テストデータ用文字列
     */
    private function generateRandomContentForSolution(int $min, int $max): string
    {
        $texts[] = self::TEAM;
        for ($i = 0; $i < $this->faker->numberBetween($min, $max); $i++) {
            $texts[] = $this->generateRandomTextOneItem(self::PROBLEM);
            $texts[] = $this->generateRandomTextOneItem(self::SOLUTION);
        }
        $texts[] = self::PERSONAL;
        for ($i = 0; $i < $this->faker->numberBetween($min, $max); $i++) {
            $texts[] = $this->generateRandomTextOneItem(self::PROBLEM);
            $texts[] = $this->generateRandomTextOneItem(self::SOLUTION);
        }
        return implode(PHP_EOL, $texts);
    }

    /**
     * 箇条書き文字列を1つ作成する
     *
     * @todo バリデーション導入時の文字数再検討（テストデータが最小/最大文字数に抵触する可能性がある場合のみ）
     *
     * @param string $header
     * @return string 箇条書き文字列
     */
    private function generateRandomTextOneItem(string $header = ''): string
    {
        $indent = str_repeat(' ', 4);
        return "{$indent}- {$header}{$this->faker->realText($this->faker->numberBetween(15, 60))}";
    }
}
