<?php

declare(strict_types=1);

namespace Tests\Feature\WeeklyReport;

use App\Models\User;
use App\Models\WeeklyReport;
use App\Models\WeeklyReportRequirement;
use App\Models\WeeklyReportTargetDuration;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\Sanctum;
use Tests\Feature\AuthHeader;
use Tests\TestCase;

/**
 * 週報一覧APIのテスト
 */
class IndexTest extends TestCase
{
    use RefreshDatabase;
    use AuthHeader;

    /**
     *正しい内容と構造で一覧を取得でき、200を返す。
     *
     * @return void
     */
    public function testIndexWeeklyReport(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        /** @var \Illuminate\Database\Eloquent\Collection<int, WeeklyReport> $contents */
        $contents = WeeklyReport::factory()->for($user)->count(10)->create();

        $response = $this->getJson(route('weekly-reports.index'))
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'requirement',
                        'activityTime',
                        'doneActivity',
                        'todoActivity',
                        'solution',
                        'event',
                        'remark',
                        'createdAt',
                        'updatedAt',
                    ],
                ],
            ]);

        $contents->each(function (WeeklyReport $content) use ($response): void {
            $requirement = $content->weeklyReportRequirement;
            $info = [
                'id' => $content->id,
                'requirement' => [
                    'id' => $content->weekly_report_requirement_id,
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
                ],
                'activityTime' => $content->activity_time,
                'doneActivity' => $content->done_activity,
                'todoActivity' => $content->todo_activity,
                'solution' => $content->solution,
                'event' => $content->event,
                'remark' => $content->remark,
                'createdAt' => $content->created_at,
                'updatedAt' => $content->updated_at,
            ];
            $response->assertJsonFragment($info);
        });
    }

    /**
     * ログインしたユーザー毎に週報を取得できる。
     *
     * @return void
     */
    public function testGetOnlyOwnWeeklyReports(): void
    {
        // 週報を投稿している、ユーザーのファクトリー
        $userFactory = User::factory()
            ->has(WeeklyReport::factory()
                // responseでユーザーが一致しているかを確認するための仕掛け
                ->state(function (array $para, ?Model $user): array {
                    assert($user instanceof User);
                    return ['remark' => $user->name];
                }));

        // ユーザー2人分作成する
        /** @var array<int, User> $users */
        $users = [];
        $users[0] = $userFactory->createOne();
        $users[1] = $userFactory->createOne();

        foreach ($users as $user) {
            Sanctum::actingAs($user);

            /** @var array<string, string> $weeklyReport */
            $weeklyReport = $this->getJson(route('weekly-reports.index'))
                ->assertOk()
                ->assertJsonCount(1, 'data')
                ->json('data.0');

            // response内の各週報がユーザーに紐づいているかを確認
            $this->assertSame($user->name, $weeklyReport['remark']);
        }
    }

     /**
     * 週報を週報要件のstart_atの降順で取得できる。
     *
     * @return void
     */
    public function testSortByStartAt(): void
    {
        /** @var \Illuminate\Support\Collection<int, WeeklyReportTargetDuration> $durations */
        $durations = WeeklyReportTargetDuration::factory()
            ->count(2)
            ->state(new Sequence(
                ['start_at' => new Carbon('2022-12-13')],
                ['start_at' => new Carbon('2022-12-12')],
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

        /** @var \Illuminate\Support\Collection<int, WeeklyReport> $weeklyReports */
        $weeklyReports = $requirements->map(
            fn (WeeklyReportRequirement $requirement): WeeklyReport => WeeklyReport::factory()
            ->for($user)
            ->for($requirement)
            ->create()
        );

        Sanctum::actingAs($user);

        $response = $this->getJson(route('weekly-reports.index'))
            ->assertOk();

        /** @var WeeklyReport $latest */
        $latest = $weeklyReports[0];
        /** @var WeeklyReport $earlier */
        $earlier = $weeklyReports[1];

        // 週報が週報要件のstart_atの降順で返ってきているかを確認
        $this->assertSame($latest->id, $response->json('data.0.id'));
        $this->assertSame($earlier->id, $response->json('data.1.id'));
    }

    /**
     * 週報を週報のcreated_atの降順で取得できる。
     *
     * @return void
     */
    public function testSortByCreatedAt(): void
    {
        /** @var WeeklyReportRequirement $requirement */
        $requirement = WeeklyReportRequirement::factory()->create();

        /** @var User $user */
        $user = User::factory()->create();

        $weeklyReports = [
            WeeklyReport::factory()->for($user)->for($requirement)
                ->create(['created_at' => new Carbon('2022-01-01 00:00:01')]),
            WeeklyReport::factory()->for($user)->for($requirement)
                ->create(['created_at' => new Carbon('2022-01-01 00:00:02')]),
        ];

        Sanctum::actingAs($user);

        $response = $this->getJson(route('weekly-reports.index'))
            ->assertOk();

        // 週報が週報のcreated_atの降順で返ってきているかを確認
        $this->assertSame($weeklyReports[1]->id, $response->json('data.0.id'));
        $this->assertSame($weeklyReports[0]->id, $response->json('data.1.id'));
    }

    /**
     * 認証されていない場合は、HttpStatus=401が返る
     *
     * @return void
     */
    public function testIndexWithoutToken(): void
    {
        $this->getJson(route('weekly-reports.index'))
            ->assertUnauthorized();
    }
}
