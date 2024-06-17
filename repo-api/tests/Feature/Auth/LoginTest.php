<?php

declare(strict_types=1);

namespace Tests\Feature\Auth;

use App\Models\User as UserModel;
use Carbon\Carbon;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\AbstractProvider;
use Laravel\Socialite\Two\User;
use Mockery;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use Mockery\MockInterface;
use Symfony\Component\HttpFoundation\Response;
use Tests\Feature\AuthHeader;
use Tests\TestCase;

/**
 * ログインのテスト
 */
class LoginTest extends TestCase
{
    use MockeryPHPUnitIntegration;
    use WithFaker;
    use AuthHeader;

    private UserModel $userModel;
    private string $token;
    private User&MockInterface $googleUser;
    private AbstractProvider&MockInterface $driver;

    /**
     * テストの初期処理を行う
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        /** @var userModel $userModel */
        $userModel = UserModel::factory()->create();
        $this->userModel = $userModel;
        $this->token = $userModel->createToken('')->plainTextToken;

        /** @var User&\Mockery\MockInterface $googleUser */
        $googleUser = Mockery::mock(User::class);
        $googleUser->email = $userModel->email;
        $googleUser->name = $userModel->name;
        $this->googleUser = $googleUser;

        /** @var AbstractProvider&\Mockery\MockInterface $driver */
        $driver = Mockery::mock(AbstractProvider::class);
        $this->driver = $driver;

        Socialite::shouldReceive('driver')->andReturn($driver);
    }

    /**
     * ユーザー認証成功時、HTTPステータスコードが200で返ること
     *
     * ユーザーが所持しているトークンが有効な場合は、そのトークンが返ってくること
     *
     * @return void
     */
    public function testLoginWithValidToken(): void
    {
        $this->driver->shouldReceive('stateless->user')->andReturn($this->googleUser);

        $this->withHeaders($this->buildAPITokenAuthHeader($this->token))
            ->postJson(route('auth.login'))
            ->assertOk()
            ->assertJson(['token' => $this->token])
            ->assertJsonStructure(['token']);

        $this->assertDatabaseCount('personal_access_tokens', 1);
    }

    /**
     * ユーザー認証成功時、HTTPステータスコードが200で返ること
     *
     * ユーザーが所持しているトークンが無効な場合は、トークンが新しく発行されて返ってくること
     *
     * @return void
     */
    public function testLoginWithInvalidToken(): void
    {
        /** @var int $expiration */
        $expiration = config('sanctum.expiration');
        Carbon::setTestNow(Carbon::now()->addMinutes($expiration + 1));

        $this->driver->shouldReceive('stateless->user')->andReturn($this->googleUser);

        $response = $this->withHeaders($this->buildAPITokenAuthHeader($this->token))
            ->postJson(route('auth.login'), ['code' => 'test1234'])
            ->assertOk()
            ->assertJsonMissing(['token' => $this->token])
            ->assertJsonStructure(['token']);

        /** @var string $responseToken */
        $responseToken = $response->json('token');
        /** @var PersonalAccessToken $personalAccessToken */
        $personalAccessToken = PersonalAccessToken::findToken($responseToken);
        $this->assertSame($personalAccessToken->tokenable_id, $this->userModel->id);
    }

    /**
     * ユーザー認証成功時、HTTPステータスコードが200で返ること
     *
     * ユーザーがトークンを所持していない場合は、トークンが新しく発行されて返ってくること
     *
     * @return void
     */
    public function testLoginWithoutToken(): void
    {
        $this->driver->shouldReceive('stateless->user')->andReturn($this->googleUser);

        $response = $this->postJson(route('auth.login'), ['code' => 'test1234'])
            ->assertOk()
            ->assertJsonStructure(['token']);

        /** @var string $responseToken */
        $responseToken = $response->json('token');
        /** @var PersonalAccessToken $personalAccessToken */
        $personalAccessToken = PersonalAccessToken::findToken($responseToken);
        $this->assertSame($personalAccessToken->tokenable_id, $this->userModel->id);
    }

    /**
     * リクエストにコードが含まれないとき、HTTPステータスコードが422で返ること
     *
     * @return void
     */
    public function testLoginWithoutCode(): void
    {
        $this->postJson(route('auth.login'))
            ->assertUnprocessable();
    }

    /**
     * リクエストのコードが不正なとき、HTTPステータスコードが400で返ること
     *
     * @return void
     */
    public function testLoginWithoutAuth(): void
    {
        /** @var ClientException&Mockery\MockInterface $clientException */
        $clientException = Mockery::mock(ClientException::class);

        $this->driver->shouldReceive('stateless->user')->andThrow($clientException);

        $this->postJson(route('auth.login'), ['code' => 'test1234'])
            ->assertStatus(Response::HTTP_BAD_REQUEST);
    }
}
