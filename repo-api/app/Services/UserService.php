<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;

/**
 * userに関するサービス
 */
class UserService
{
    /**
     * ユーザー情報を取得する
     *
     * ユーザーが存在しない場合はDBに新規登録して、そのレコードを返す
     *
     * @param string $name  ユーザー名
     * @param string $email Eメールアドレス
     * @return User
     */
    public function firstOrCreate(string $name, string $email): User
    {
        return User::firstOrCreate(
            ['email' => $email],
            ['name' => $name]
        );
    }

    /**
     * ユーザー名を更新する
     *
     * 引数の登録済みユーザー情報のユーザー名が、引数のユーザー名と一致していない場合、
     * DBの対象レコードを引数のユーザー名で更新し、返す
     *
     * 一致している場合はそのまま返す
     *
     * @param User $user 登録済みユーザー情報
     * @param string $name ユーザー名
     * @return User ユーザー情報
     */
    public function updateUserIfNotMatch(User $user, string $name): User
    {
        if ($user->name !== $name) {
            $user->update(['name' => $name]);
        }
        return $user;
    }
}
