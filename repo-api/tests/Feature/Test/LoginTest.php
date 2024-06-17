<?php

declare(strict_types=1);

namespace Tests\Feature\Test;

use App\Models\Setting;
use App\Models\Template;
use App\Models\User;
use App\Models\WeeklyReport;
use Closure;
use Config;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\PersonalAccessToken;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\Test\LoginController のテスト
 */
class LoginTest extends TestCase
{
    use WithFaker;

    /**
     * Requestでemailが連携されていた場合、テスト用のトークンを取得できること
     *
     * @param string $env
     * @return void
     * @dataProvider dataProviderForGetToken
     */
    public function testCanGetToken(string $env): void
    {
        $this->changeEnvironment($env, function (): void {
            /** @var string $email */
            $email = $this->faker->email();
            $requestBody = ['email' => $email];

            /** @var string $token */
            $token = $this->postJson(route('auth.login.test'), $requestBody)
                ->assertOk()
                ->assertJsonStructure(['token'])
                ->json('token');

            $this->assertTrue(is_string($token));

            /** @var PersonalAccessToken $tokenModel */
            $tokenModel = PersonalAccessToken::findToken($token);
            $this->assertNotNull($tokenModel);

            $user = User::whereEmail($email)->firstOrFail();
            $this->assertNotNull(
                $user->tokens->first(fn (PersonalAccessToken $token): bool => $token->is($tokenModel))
            );
        });
    }

    /**
     * @return array<int, array<string, string>>
     */
    public function dataProviderForGetToken(): array
    {
        return [
            ['env' => 'local'],
            ['env' => 'testing'],
        ];
    }

    /**
     * Requestでemailが連携されていなかった場合、422(Unprocessable Entity)が返ること
     *
     * @param string $env
     * @return void
     * @dataProvider dataProviderWithoutEmail
     */
    public function testWithoutEmail(string $env): void
    {
        $this->changeEnvironment($env, function (): void {
            $this->postJson(route('auth.login.test'))
                ->assertUnprocessable();
        });
    }

    /**
     * @return array<int, array<string, string>>
     */
    public function dataProviderWithoutEmail(): array
    {
        return [
            ['env' => 'local'],
            ['env' => 'testing'],
        ];
    }

    /**
     * reset を渡すと DB をリセットできること
     * @return void
     */
    public function testCanResetDB(): void
    {
        WeeklyReport::factory()->create();
        User::factory()->create(['email' => 'before@example.com']);
        Template::factory()->create();
        Setting::factory()->create();

        $this->changeEnvironment('local', function (): void {
            $this->postJson(
                route('auth.login.test'),
                ['email' => 'after@example.com', 'reset' => true]
            )
                ->assertOk();
        });

        $this->assertDatabaseCount('weekly_reports', 0);
        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseCount('templates', 0);
        $this->assertDatabaseCount('settings', 0);

        $this->assertDatabaseHas('users', ['email' => 'after@example.com']);
        $this->assertDatabaseMissing('users', ['email' => 'before@example.com']);
    }

    /**
     * @return array<int, array<string, string>>
     */
    public function dataProviderForResetDB(): array
    {
        return [
            ['env' => 'local'],
            ['env' => 'testing'],
        ];
    }

    /**
     * slack を渡すとログインユーザに Slack の設定がされる
     *
     * @return void
     */
    public function testCanLoginWithSettingSlack(): void
    {
        $this->changeEnvironment('local', function (): void {
            $this->postJson(
                route('auth.login.test'),
                ['email' => 'test@example.com', 'slack' => true]
            )
                ->assertOk();
        });

        $user = User::whereEmail('test@example.com')->firstOrFail();

        $this->assertDatabaseHas('settings', [
            'user_id' => $user->id,
            'slack_access_token' => 'dummy',
            'slack_user_id' => 'dummy',
        ]);
    }

    /**
     * ローカル・テスト環境以外ではトークンを取得できないこと
     *
     * @return void
     */
    public function testCannotGetTokenInInvalidEnvironment(): void
    {
        $this->changeEnvironment('not testing', function (): void {
            $this->post(route('auth.login.test'))
                ->assertNotFound();
        });
    }

    /**
     * 一時的に環境を変更します。
     *
     * closure の処理が完了すると、環境を元に戻します。
     *
     * @param string $env
     * @param Closure $closure
     * @return void
     */
    private function changeEnvironment(string $env, Closure $closure): void
    {
        $backup = Config::get('app.env');
        Config::set('app.env', $env);

        $closure();

        Config::set('app.env', $backup);
    }
}
