<?php

declare(strict_types=1);

namespace App\Services;

use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\AbstractProvider;
use Laravel\Socialite\Two\User;

/**
 * google認証に関するサービス
 */
class AuthService
{
    private readonly AbstractProvider $driver;

    /**
     * ドライバの作成
     */
    public function __construct()
    {
        /** @var  \Laravel\Socialite\Two\AbstractProvider $driver */
        $driver = Socialite::driver('google');
        $this->driver = $driver;
    }

    /**
     * リダイレクトURLを生成します。
     *
     * @param boolean $isLoggedIn ログイン状態か否か
     * @return string 生成したリダイレクトURL
     */
    public function generateRedirectUrl(bool $isLoggedIn): string
    {
        if ($isLoggedIn) {
            return config('app.front_url') . '/weekly-reports/create';
        }

        return $this->driver->stateless()->redirect()->getTargetUrl();
    }

    /**
     * ユーザー認証を行います
     *
     * @return User
     */
    public function authUser(): User
    {
        /** @var \Laravel\Socialite\Two\User $user */
        $user = $this->driver->stateless()->user();
        return $user;
    }
}
