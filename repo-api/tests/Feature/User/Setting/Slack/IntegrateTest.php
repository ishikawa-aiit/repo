<?php

declare(strict_types=1);

namespace Tests\Feature\User\Setting\Slack;

use App\Models\User;
use App\Notifications\User\Setting\Slack\WelcomeMessage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Notification;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

/**
 * Slack API連携のテスト
 *
 * @see \App\Http\Controllers\User\Setting\Slack\IntegrateController
 */
class IntegrateTest extends TestCase
{
    /**
     * ユーザー認証成功時、HTTPステータスコードが204で返ること
     *
     * @return void
     */
    public function testSetUpSlackWithValidCode(): void
    {
        Notification::fake();

        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Http::fake([
            'slack.com/api/*' => Http::response([
                'ok' => true,
                'access_token' => 'xoxb-17653672481-19874698323-pdFZKVeTuE8sk7oOcBrzbqgy',
                'authed_user' => [
                    'id' => 'U1234',
                ]
            ]),
        ]);

        $this->post(route('users.slack.integrate'), ['code' => 'test_code'])
            ->assertNoContent();

        $this->assertDatabaseHas('settings', [
            'user_id' => $user->id,
            'slack_access_token' => 'xoxb-17653672481-19874698323-pdFZKVeTuE8sk7oOcBrzbqgy',
            'slack_user_id' => 'U1234',
        ]);

        Notification::assertSentTo(
            [$user],
            WelcomeMessage::class
        );
    }

    /**
     * リクエストにコードが含まれないとき、HTTPステータスコードが422で返ること
     *
     * @return void
     */
    public function testSetUpSlackWithoutCode(): void
    {
        Notification::fake();

        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $this->postJson(route('users.slack.integrate'))
            ->assertUnprocessable();

        Notification::assertNotSentTo(
            [$user],
            WelcomeMessage::class
        );
    }

    /**
     * リクエストのコードが不正なとき、HTTPステータスコードが400で返ること
     *
     * @return void
     */
    public function testSetUpSlackWithInvalidCode(): void
    {
        Notification::fake();

        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Http::fake([
            'slack.com/api/*' => Http::response([
                'ok' => false,
            ]),
        ]);

        $this->post(route('users.slack.integrate'), ['code' => 'invalid_code'])
            ->assertStatus(400);

        Notification::assertNotSentTo(
            [$user],
            WelcomeMessage::class
        );
    }
}
