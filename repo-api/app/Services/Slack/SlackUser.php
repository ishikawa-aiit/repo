<?php

declare(strict_types=1);

namespace App\Services\Slack;

/**
 * Slack内のユーザー情報
 */
class SlackUser
{
    /**
     * Slack内のユーザーをインスタンス化します
     *
     * @param string $accessToken  アクセストークン
     * @param string $authedUserId ユーザーのID
     */
    public function __construct(public readonly string $accessToken, public readonly string $authedUserId)
    {
    }
}
