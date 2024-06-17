<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;

/**
 * 設定に関するサービス
 */
class SettingService
{
    /**
     * 設定を更新する
     *
     * @param User $user     登録済みユーザー情報
     * @param array<string, string> $contents 更新したい設定のコンテンツ
     * @return void
     */
    public function updateSetting(User $user, array $contents): void
    {
        $user->setting()->updateOrCreate(['user_id' => $user->id], $contents);
    }
}
