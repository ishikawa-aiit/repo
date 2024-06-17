<?php

declare(strict_types=1);

namespace App\Services\Slack;

use App\Models\Setting;
use App\Models\User;
use App\Notifications\User\Setting\Slack\WelcomeMessage;
use DB;

/**
 * Slack API認証に関するサービス
 */
class AuthService
{
    /**
     * APIサービスを生成します
     *
     * @param APIService $apiService
     */
    public function __construct(private readonly APIService $apiService)
    {
    }

    /**
     * Slack APIのユーザー情報を取得します
     *
     * @param string $code 認証コード
     * @return SlackUser Slack内のユーザー情報
     */
    public function getSlackUser(string $code): SlackUser
    {
        return $this->apiService->getUser($code);
    }

    /**
     * Slack APIのユーザー情報を保存します
     *
     * @param User $user      認証されたユーザー
     * @param SlackUser $slackUser Slack内のユーザー情報
     * @return void
     */
    public function storeSlackUser(User $user, SlackUser $slackUser): void
    {
        $setting = $user->setting ?? new Setting();

        $setting->slack_access_token = $slackUser->accessToken;
        $setting->slack_user_id = $slackUser->authedUserId;

        DB::transaction(function () use ($user, $setting): void {
            $user->setting()->save($setting);
            $user->load('setting');

            $user->notify(new WelcomeMessage());
        });
    }
}
