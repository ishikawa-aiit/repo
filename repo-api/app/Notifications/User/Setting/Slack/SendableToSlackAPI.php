<?php

declare(strict_types=1);

namespace App\Notifications\User\Setting\Slack;

/**
 * Slack APIのインターフェース
 */
interface SendableToSlackAPI
{
    /**
     * Slack APIに通知するメッセージを取得します
     *
     * @return string 通知するメッセージ
     */
    public function toSlackAPI(): string;
}
