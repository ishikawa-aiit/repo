<?php

declare(strict_types=1);

namespace Tests\Unit\App\Services\Test;

use App\Models\Setting;
use App\Models\Template;
use App\Models\User;
use App\Models\WeeklyReport;
use App\Services\Test\LoginService;
use Closure;
use Illuminate\Database\Connection;
use Laravel\Sanctum\NewAccessToken;
use Mockery;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use PHPUnit\Framework\TestCase;

/**
 * ログインサービスのテスト
 */
class LoginServiceTest extends TestCase
{
    use MockeryPHPUnitIntegration;

    private LoginService $service;
    private Mockery\MockInterface&User $user;
    private Mockery\MockInterface&WeeklyReport $weeklyReport;
    private Mockery\MockInterface&Template $template;
    private Mockery\MockInterface&Setting $setting;

    /**
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        /** @var Mockery\MockInterface&Connection $db */
        $db = Mockery::mock(Connection::class);
        $db->shouldReceive('transaction')
            ->andReturnUsing(fn(Closure $callable) => $callable());

        /** @var Mockery\MockInterface&NewAccessToken $token */
        $token = Mockery::mock(NewAccessToken::class);
        $token->plainTextToken = 'token';

        /** @var Mockery\MockInterface&User $user */
        $user = Mockery::mock(User::class);
        $user->shouldReceive('firstOrCreate')->andReturnSelf();
        $user->shouldReceive('createToken')->andReturn($token);
        $this->user = $user;

        /** @var Mockery\MockInterface&WeeklyReport $weeklyReport */
        $weeklyReport = Mockery::mock(WeeklyReport::class);
        $this->weeklyReport = $weeklyReport;

        /** @var Mockery\MockInterface&Template $template */
        $template = Mockery::mock(Template::class);
        $this->template = $template;

        /** @var Mockery\MockInterface&Setting $setting */
        $setting = Mockery::mock(Setting::class);
        $this->setting = $setting;

        $this->service = new LoginService(
            $db,
            $this->user,
            $this->weeklyReport,
            $this->template,
            $this->setting,
        );
    }

    /**
     * リセットなしの場合はデータの削除が行われない
     *
     * @return void
     * @throws \Throwable トランザクション失敗時
     */
    public function testInvokeWithoutReset(): void
    {
        $this->expectNotToPerformAssertions();
        $this->service->__invoke('test@example.com', false, false);
    }

    /**
     * リセットありの場合はデータの削除が行われる
     *
     * @return void
     * @throws \Throwable トランザクション失敗時
     */
    public function testInvokeWithReset(): void
    {
        $this->weeklyReport->shouldReceive('query->delete')->once();
        $this->template->shouldReceive('query->delete')->once();
        $this->setting->shouldReceive('query->delete')->once();
        $this->user->shouldReceive('query->delete')->once();

        $this->service->__invoke('test@example.com', true, false);
    }

    /**
     * Slack 設定あり
     *
     * @param Setting|null $setting
     * @return void
     * @throws \Throwable トランザクション失敗時
     * @dataProvider dataProviderForInvokeWithSlack
     */
    public function testInvokeWithSlack(?Setting $setting): void
    {
        $this->user->shouldReceive('offsetExists')->andReturn(true);
        $this->user->shouldReceive('getAttribute')->with('setting')->andReturn($setting);
        $this->user->shouldReceive('setting->save')->once();

        $this->setting->shouldReceive('newInstance')->andReturnSelf();
        $this->setting->shouldReceive('setAttribute');

        $this->service->__invoke('test@example.com', false, true);
    }

    /**
     * ユーザの設定のプロバイダ
     *
     * @return array<string, array<string, Setting|null>>
     */
    public function dataProviderForInvokeWithSlack(): array
    {
        /** @var Mockery\MockInterface&Setting $setting */
        $setting = Mockery::mock(Setting::class);
        $setting->shouldReceive('setAttribute');

        return [
            'without setting' => ['setting' => null],
            'with setting' => ['setting' => $setting],
        ];
    }
}
