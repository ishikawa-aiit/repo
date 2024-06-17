<?php

declare(strict_types=1);

namespace App\Channels;

use App\Models\User;
use App\Notifications\User\Setting\Slack\SendableToSlackAPI;
use App\Services\Slack\APIService;
use Illuminate\Notifications\Notification;
use LogicException;

/**
 * Slack APIの通知チャンネル
 */
class SlackAPIChannel
{
    /**
     * Slack APIチャンネルのインスタンスを生成します
     *
     * @param APIService $service APIサービス
     */
    public function __construct(private readonly APIService $service)
    {
    }

    /**
     * メッセージを送信します
     *
     * @param User $notifiable   認証されたユーザー
     * @param Notification $notification 通知
     * @return void
     */
    public function send(User $notifiable, Notification $notification): void
    {
        if (is_null($notifiable->setting)) {
            throw new LogicException('settingがnullです。');
        }

        if (is_null($notifiable->setting->slack_access_token)) {
            throw new LogicException('slack_access_tokenがnullです。');
        }

        if (is_null($notifiable->setting->slack_user_id)) {
            throw new LogicException('slack_user_idがnullです。');
        }

        if (!$notification instanceof SendableToSlackAPI) {
            throw new LogicException('SendableToSlackAPIインターフェースではありません。');
        }

        $this->service->postMessage(
            $notifiable->setting->slack_access_token,
            $notifiable->setting->slack_user_id,
            $notification->toSlackAPI(),
        );
    }
}
