<?php

declare(strict_types=1);

namespace Tests\Feature\Command;

use App\Models\Setting;
use App\Models\User;
use App\Models\WeeklyReportRequirement;
use App\Models\WeeklyReportSubmissionDuration;
use App\Notifications\User\Setting\Slack\RemindMessage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

/**
 * Slackに週報の期限を知らせる通知を行うコマンドのテスト
 */
class RemindBySlackTest extends TestCase
{
    /**
     * @inheritDoc
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        Notification::fake();
    }

    /**
     * @inheritDoc
     *
     * @return void
     */
    protected function tearDown(): void
    {
        $this->travelBack();
        parent::tearDown();
    }

    /**
     * コマンドを実行した際に正常終了する
     *
     * @return void
     */
    public function testReturnSuccess(): void
    {
        /** @var \Illuminate\Testing\PendingCommand $command */
        $command = $this->artisan('slack:remind');
        $command->assertExitCode(0);
    }

    /**
     * Slackの設定をしているユーザに通知が送信される
     *
     * @return void
     */
    public function testNotifyToUser(): void
    {
        $endAt = Carbon::parse('2022-01-02');

        $submission = WeeklyReportSubmissionDuration::factory()->create([
            'end_at' => $endAt,
        ]);
        WeeklyReportRequirement::factory()->for($submission)->create();

        $user = User::factory()->create();
        Setting::factory()->for($user)->state([
            'slack_access_token' => 'dummy',
            'slack_user_id' => 'dummy',
        ])->create();

        $this->travelTo($endAt->subDay());

        $this->artisan('slack:remind');

        Notification::assertSentTo(
            [$user],
            RemindMessage::class
        );
    }

    /**
     * 日付が〆切前日でなければ通知が送信されない
     *
     * @return void
     */
    public function testNotNotifyWhenTodayIsNotTargetDate(): void
    {
        $endAt = Carbon::parse('2022-01-03');

        $submission = WeeklyReportSubmissionDuration::factory()->create([
            'end_at' => $endAt,
        ]);
        WeeklyReportRequirement::factory()->for($submission)->create();

        Setting::factory()->state([
            'slack_access_token' => 'dummy',
            'slack_user_id' => 'dummy',
        ])->create();

        $this->travelTo($endAt->subDays(2));

        $this->artisan('slack:remind');

        Notification::assertNothingSent();
    }

    /**
     * Slackの設定をしていないユーザには通知が送信されない
     *
     * @return void
     */
    public function testNotNotifyToUserWhoDidNotSetSlack(): void
    {
        $endAt = Carbon::parse('2022-01-02');

        $submission = WeeklyReportSubmissionDuration::factory()->create([
            'end_at' => $endAt,
        ]);
        WeeklyReportRequirement::factory()->for($submission)->create();

        $user = User::factory()->create();
        Setting::factory()->for($user)->state([
            'slack_access_token' => null,
            'slack_user_id' => null,
        ])->create();

        $this->travelTo($endAt->subDay());

        $this->artisan('slack:remind');

        Notification::assertNotSentTo(
            [$user],
            RemindMessage::class
        );
    }
}
