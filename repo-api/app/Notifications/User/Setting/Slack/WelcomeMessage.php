<?php

declare(strict_types=1);

namespace App\Notifications\User\Setting\Slack;

use App\Channels\SlackAPIChannel;
use Illuminate\Notifications\Notification;

/**
 * ウェルカムメッセージ通知
 */
class WelcomeMessage extends Notification implements SendableToSlackAPI
{
    /**
     * 通知チャンネルを取得します
     *
     * @return array<int, class-string>
     */
    public function via(): array
    {
        return [SlackAPIChannel::class];
    }

    /**
     * Slack APIに通知するメッセージを取得します
     *
     * @return string 通知するメッセージ
     */
    public function toSlackAPI(): string
    {
        return "ようこそ。RepoのSlackアプリを登録していただき、ありがとうございます。\nRepoからのメッセージはこちらに表示します。";
    }
}
