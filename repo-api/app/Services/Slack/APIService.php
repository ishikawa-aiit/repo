<?php

declare(strict_types=1);

namespace App\Services\Slack;

use Illuminate\Support\Facades\Http;

/**
 * Slack APIへの接続に関するサービス
 */
class APIService
{
    private const SLACK_API_DOMAIN = 'https://slack.com/api/';

    /**
     * Slackのユーザー情報を取得します
     *
     * @param string $code 認証コード
     * @return SlackUser アクセストークン、ユーザーID
     * @throws \Exception レスポンスが不正だった場合
     */
    public function getUser(string $code): SlackUser
    {
        /** @var string $clientId */
        $clientId = config('services.slack.client_id');
        /** @var string $clientSecret */
        $clientSecret = config('services.slack.client_secret');

        $response = Http::asForm()
        ->withBasicAuth($clientId, $clientSecret)
        ->post(self::SLACK_API_DOMAIN . 'oauth.v2.access', [
            'code' => $code,
        ]);

        $ok = $response->json('ok');

        if (!is_bool($ok)) {
            throw new \Exception('Slackからのレスポンスが不正です。');
        }

        if (!$ok) {
            throw new \RuntimeException('認証コードが不正です。');
        }

        $accessToken = $response->json('access_token');
        $authedUserId = $response->json('authed_user.id');

        if (!is_string($accessToken)) {
            throw new \Exception('Slackからのレスポンスが不正です。');
        }

        if (!is_string($authedUserId)) {
            throw new \Exception('Slackからのレスポンスが不正です。');
        }

        return new SlackUser($accessToken, $authedUserId);
    }

    /**
     * Slackにメッセージを通知します
     *
     * アプリホームにメッセージを送る場合は、channelにユーザーのIDを指定する必要があります
     * @see https://api.slack.com/methods/chat.postMessage#app_home
     * @param string $token   アクセストークン
     * @param string $channel 通知チャンネル
     * @param string $text    メッセージ
     * @return void
     */
    public function postMessage(string $token, string $channel, string $text): void
    {
        Http::asForm()
        ->post(self::SLACK_API_DOMAIN . 'chat.postMessage', [
            'token' => $token,
            'channel' => $channel,
            'text' => $text,
        ]);
    }
}
