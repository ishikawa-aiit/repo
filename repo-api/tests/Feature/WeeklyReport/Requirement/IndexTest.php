<?php

declare(strict_types=1);

namespace Tests\Feature\WeeklyReport\Requirement;

use App\Models\User;
use App\Models\WeeklyReportRequirement;
use App\Models\WeeklyReportTargetDuration;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\Sanctum;
use Tests\Feature\AuthHeader;
use Tests\TestCase;

/**
 * 週報要件APIのテスト
 */
class IndexTest extends TestCase
{
    use RefreshDatabase;
    use AuthHeader;

    /**
     *正しい構造で一覧を取得でき、200を返す。
     *
     * @return void
     */
    public function testIndexWeeklyReportRequirements(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        /** @var WeeklyReportRequirement $requirements */
        $requirements = WeeklyReportRequirement::factory()->count(10)->create();

        $response = $this->getJson(route('weekly-reports.requirements.index'))
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'targetDuration',
                        'submissionDuration',
                    ],
                ],
            ]);

        $requirements->each(function (WeeklyReportRequirement $requirement) use ($response): void {
            $info = [
                'id' => $requirement->id,
                'targetDuration' => [
                    'id' => $requirement->weeklyReportTargetDuration->id,
                    'startAt' => $requirement->weeklyReportTargetDuration->start_at->toRfc3339String(),
                    'endAt' => $requirement->weeklyReportTargetDuration->end_at->toRfc3339String(),
                    'createdAt' => $requirement->weeklyReportTargetDuration->created_at,
                    'updatedAt' => $requirement->weeklyReportTargetDuration->updated_at,
                ],
                'submissionDuration' => [
                    'id' => $requirement->weeklyReportSubmissionDuration->id,
                    'startAt' => $requirement->weeklyReportSubmissionDuration->start_at->toRfc3339String(),
                    'endAt' => $requirement->weeklyReportSubmissionDuration->end_at->toRfc3339String(),
                    'createdAt' => $requirement->weeklyReportSubmissionDuration->created_at,
                    'updatedAt' => $requirement->weeklyReportSubmissionDuration->updated_at,
                ],
                'createdAt' => $requirement->created_at,
                'updatedAt' => $requirement->updated_at,
            ];
            $response->assertJsonFragment($info);
        });
    }

    /**
     * 週報要件をstart_atの昇順で取得できる。
     *
     * @return void
     */
    public function testSort(): void
    {
        /** @var \Illuminate\Support\Collection<int, WeeklyReportTargetDuration> $durations */
        $durations = WeeklyReportTargetDuration::factory()
            ->count(3)
            ->state(new Sequence(
                ['start_at' => new Carbon('2022-12-13')],
                ['start_at' => new Carbon('2022-12-12')],
                ['start_at' => new Carbon('2022-12-11')],
            ))
            ->create();

        /** @var \Illuminate\Support\Collection<int, WeeklyReportRequirement> $requirements */
        $requirements = $durations->map(
            fn (WeeklyReportTargetDuration $duration): WeeklyReportRequirement => WeeklyReportRequirement::factory()
            ->for($duration)
            ->create()
        );

        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->getJson(route('weekly-reports.requirements.index'))
            ->assertOk();

        /**
         * @var WeeklyReportRequirement $showTop
         */
        $showTop = $requirements[2];
        /**
         * @var WeeklyReportRequirement $showMiddle
         */
        $showMiddle = $requirements[1];
        /**
         * @var WeeklyReportRequirement $showBottom
         */
        $showBottom = $requirements[0];

        // 週報要件が昇順で返ってきているかを確認
        $this->assertSame($showTop->id, $response->json('data.0.id'));
        $this->assertSame($showMiddle->id, $response->json('data.1.id'));
        $this->assertSame($showBottom->id, $response->json('data.2.id'));
    }

    /**
     * 認証されていない場合は、HttpStatus=401が返る
     *
     * @return void
     */
    public function testIndexWithoutToken(): void
    {
        $this->getJson(route('weekly-reports.requirements.index'))
            ->assertUnauthorized();
    }
}
