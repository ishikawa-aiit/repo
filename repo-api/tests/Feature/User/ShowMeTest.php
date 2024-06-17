<?php

declare(strict_types=1);

namespace Tests\Feature\User;

use App\Models\Setting;
use App\Models\Team;
use App\Models\User;
use Carbon\Carbon;
use Laravel\Sanctum\Sanctum;
use Tests\DataFromFactoryConverter;
use Tests\Feature\AuthHeader;
use Tests\TestCase;

/**
 * ShowMeControllerのテスト
 */
class ShowMeTest extends TestCase
{
    use AuthHeader;
    use DataFromFactoryConverter;

    /**
     * APIトークンをヘッダーに入れてユーザー取得APIを実行すると、正しくユーザー情報を取得できる
     *
     * @return void
     */
    public function testShowMeWithValidHeader(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        // トークンの所持者ではない別ユーザーの情報が間違って連携されないかテストするために入れる
        User::factory()->create();

        $this->getJson(route('users.me'))
            ->assertOk()
            ->assertJson([
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'team' => null,
                    'hasSlackConnection' => false,
                ],
            ])
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'team',
                    'hasSlackConnection',
                    'createdAt',
                    'updatedAt'
                ],
            ]);
    }

    /**
     * 正しくユーザー情報と所属しているPTの情報を取得できる
     *
     * @return void
     */
    public function testShowMeWithTeam(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        /** @var Team $team */
        $team = Team::factory()->create();

        Setting::factory()
            ->for($user)
            ->for($team)
            ->create();

        $teamCamel = $this->convertArrKeysFromSnakeToCamel($team->attributesToArray());

        $this->getJson(route('users.me'))
            ->assertOk()
            ->assertJson([
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'team' => $teamCamel,
                    'hasSlackConnection' => false,
                ],
            ])
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'team',
                    'hasSlackConnection',
                    'createdAt',
                    'updatedAt'
                ],
            ]);
    }

    /**
     * Slack連携が行われると、連携フラグがtrueになる
     *
     * @return void
     */
    public function testShowMeWithSlackIntegration(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Setting::factory()
            ->for($user)
            ->create([
                'team_id' => null,
                'slack_access_token' => 'test_token',
                'slack_user_id' => 'test_user_id',
            ]);

        $this->getJson(route('users.me'))
            ->assertOk()
            ->assertJson([
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'team' => null,
                    'hasSlackConnection' => true,
                ],
            ])
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'team',
                    'hasSlackConnection',
                    'createdAt',
                    'updatedAt'
                ],
            ]);
    }

    /**
     * 期限切れAPIトークンをヘッダーに入れてユーザー取得APIを実行すると、HttpStatus=401が返る
     *
     * @return void
     */
    public function testShowMeWithExpiredToken(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $token = $user->createToken('')->plainTextToken;
        /** var int $expiration */
        $expiration = config('sanctum.expiration');
        Carbon::setTestNow(Carbon::now()->addMinutes(intval($expiration) + 1));

        $this->withHeaders($this->buildAPITokenAuthHeader($token))
            ->getJson(route('users.me'))
            ->assertUnauthorized();
    }

    /**
     * ヘッダーを入れずにユーザー取得APIを実行すると、HttpStatus=401が返る
     *
     * @return void
     */
    public function testShowMeWithoutToken(): void
    {
        $this->getJson(route('users.me'))
            ->assertUnauthorized();
    }

    /**
     * DBに存在しないAPIトークンでユーザー取得APIを実行すると、HttpStatus=401が返る
     *
     * @return void
     */
    public function testShowMeUnexistedApiToken(): void
    {
        $this->withHeaders($this->buildAPITokenAuthHeader('dummy'))
            ->getJson(route('users.me'))
            ->assertUnauthorized();
    }

    /**
     * 存在しないユーザーでユーザー取得APIを実行すると、HttpStatus=401が返る
     *
     * @return void
     */
    public function testShowMeUnexistedUser(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $token = $user->createToken('')->plainTextToken;

        User::destroy($user->id);

        $this->withHeaders($this->buildAPITokenAuthHeader($token))
            ->getJson(route('users.me'))
            ->assertUnauthorized();
    }
}
