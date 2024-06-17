<?php

declare(strict_types=1);

namespace Tests\Unit\App\Channels;

use App\Channels\SlackAPIChannel;
use App\Models\Setting;
use App\Models\User;
use App\Notifications\User\Setting\Slack\SendableToSlackAPI;
use App\Services\Slack\APIService;
use Illuminate\Notifications\Notification;
use LogicException;
use Mockery;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use PHPUnit\Framework\TestCase;

/**
 * Slack APIチャンネルのテスト
 */
class SlackAPIChannelTest extends TestCase
{
    use MockeryPHPUnitIntegration;

    private SlackAPIChannel $channel;
    private Setting&Mockery\MockInterface $setting;
    private User&Mockery\MockInterface $user;
    private Notification&SendableToSlackAPI&Mockery\MockInterface $notification;

    /**
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        /** @var \App\Services\Slack\APIService&\Mockery\MockInterface $apiService */
        $apiService = Mockery::mock(APIService::class);
        $apiService->shouldReceive('postMessage');

        /** @var \App\Models\Setting&\Mockery\MockInterface $setting */
        $setting = Mockery::mock(Setting::class);
        $this->setting = $setting;

        /** @var \App\Models\User&\Mockery\MockInterface $user */
        $user = Mockery::mock(User::class);
        $this->user = $user;

        /** @var \Illuminate\Notifications\Notification&\App\Notifications\User\Setting\Slack\SendableToSlackAPI&\Mockery\MockInterface $notification */
        $notification = Mockery::mock(Notification::class . ', ' . SendableToSlackAPI::class);
        $notification->shouldReceive('toSlackAPI')->andReturn('test');
        $this->notification = $notification;

        $this->channel = new SlackAPIChannel($apiService);
    }

    /**
     * パラメータが全て有効な場合、メッセージを送信できる
     *
     * @return void
     */
    public function testChannelSuccessfully(): void
    {
        $this->setting->shouldReceive('getAttribute')->andReturn('test');
        $this->user->shouldReceive('getAttribute')->andReturn($this->setting);

        $this->expectNotToPerformAssertions();
        $this->channel->send($this->user, $this->notification);
    }

    /**
     * ユーザーのsettingプロパティがnullだった場合、例外が投げられる
     *
     * @return void
     */
    public function testChannelAnomalyWithoutSetting(): void
    {
        $this->user->shouldReceive('getAttribute')->with('setting')->andReturnNull();

        $this->expectException(LogicException::class);
        $this->expectExceptionMessage('settingがnullです。');
        $this->channel->send($this->user, $this->notification);
    }

    /**
     * 設定のslack_access_tokenプロパティがnullだった場合、例外が投げられる
     *
     * @return void
     */
    public function testChannelAnomalyWithoutAccessToken(): void
    {
        $this->setting->shouldReceive('getAttribute')->with('slack_access_token')->andReturnNull();
        $this->user->shouldReceive('getAttribute')->with('setting')->andReturn($this->setting);

        $this->expectException(LogicException::class);
        $this->expectExceptionMessage('slack_access_tokenがnullです。');
        $this->channel->send($this->user, $this->notification);
    }

    /**
     * 設定のslack_user_idプロパティがnullだった場合、例外が投げられる
     *
     * @return void
     */
    public function testChannelAnomalyWithoutUserId(): void
    {
        $this->setting->shouldReceive('getAttribute')
            ->andReturnValues([
                'slack_access_token' => 'test_token',
                'slack_user_id' => null
            ]);
        $this->user->shouldReceive('getAttribute')->with('setting')->andReturn($this->setting);

        $this->expectException(LogicException::class);
        $this->expectExceptionMessage('slack_user_idがnullです。');
        $this->channel->send($this->user, $this->notification);
    }

    /**
     * NotificationがSendableToSlackAPIインターフェースを実装していない場合、例外が投げられる
     *
     * @return void
     */
    public function testChannelAnomalyWithoutSendableToSlackAPI(): void
    {
        $this->setting->shouldReceive('getAttribute')->andReturn('test');
        $this->user->shouldReceive('getAttribute')->andReturn($this->setting);
        /** @var \Illuminate\Notifications\Notification&\Mockery\MockInterface $notification */
        $notification = Mockery::mock(Notification::class);

        $this->expectException(LogicException::class);
        $this->expectExceptionMessage('SendableToSlackAPIインターフェースではありません。');
        $this->channel->send($this->user, $notification);
    }
}
