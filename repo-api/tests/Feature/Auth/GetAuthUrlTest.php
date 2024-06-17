<?php

declare(strict_types=1);

namespace Tests\Feature\Auth;

use App\Models\User;
use Carbon\Carbon;
use Laravel\Sanctum\Sanctum;
use Tests\Feature\AuthHeader;
use Tests\TestCase;

/**
 * リダイレクトURL取得のテスト
 */
class GetAuthUrlTest extends TestCase
{
    use AuthHeader;

    /**
     * アクセストークンがない場合、google認証のURLがレスポンスされること
     *
     * @return void
     */
    public function testGetAuthUrlWithoutToken(): void
    {
        $this->post(route('auth.redirect'))
            ->assertOk()
            ->assertJsonStructure(['url'])
            ->assertSee('https:\/\/accounts.google.com');
    }

    /**
     * アクセストークンが無効な場合、google認証のURLがレスポンスされること
     *
     * @return void
     */
    public function testGetAuthUrlWithInvalidToken(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        $token = $user->createToken('')->plainTextToken;
        Carbon::setTestNow(Carbon::now()->addMinutes(intval(config('sanctum.expiration')) + 1));

        $this->withHeaders($this->buildAPITokenAuthHeader($token))
            ->post(route('auth.redirect'))
            ->assertOk()
            ->assertJsonStructure(['url'])
            ->assertSee('https:\/\/accounts.google.com');
    }

    /**
     * アクセストークンが有効な場合、週報作成ページのURLがレスポンスされること
     *
     * @return void
     */
    public function testGetAuthUrlWithToken(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $exceptUrl = config('app.front_url') . '/weekly-reports/create';
        $this->post(route('auth.redirect'))
            ->assertOk()
            ->assertJson(['url' => $exceptUrl]);
    }
}
