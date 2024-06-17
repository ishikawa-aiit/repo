<?php

declare(strict_types=1);

namespace App\Services;

use Carbon\Carbon;
use Laravel\Sanctum\PersonalAccessToken;

/**
 * personalAccessTokenに関するサービス
 */
class PersonalAccessTokenService
{
    /**
     * コンストラクタ
     *
     * @param UserService $userService
     */
    public function __construct(private readonly UserService $userService)
    {
    }

    /**
     * ログインする
     *
     * 引数emailを保持するユーザーがない場合は作成する
     * DBに保存されているユーザー名と引数ユーザー名が異なる場合は、DBを引数ユーザー名に書き換える
     * 有効なトークンを返す
     *
     * @param string $name  ユーザー名
     * @param string $email ユーザーeメールアドレス
     * @return string 有効なトークン
     */
    public function login(string $name, string $email): string
    {
        /** @var string $token */
        $token = \DB::transaction(function () use ($name, $email): string {
            $user = $this->userService->firstOrCreate($name, $email);
            $user = $this->userService->updateUserIfNotMatch($user, $name);
            return $user->createToken('')->plainTextToken;
        });
        return $token;
    }

    /**
     * トークンの期限を伸ばす
     *
     * @param string $token
     * @return void
     */
    public function extendTokenExpiration(string $token): void
    {
        /** @var PersonalAccessToken $personalAccessToken */
        $personalAccessToken = PersonalAccessToken::findToken($token);
        /** @var int $expiration */
        $expiration = config('sanctum.expiration');
        $personalAccessToken->update(['expires_at' => Carbon::now()->addMinutes($expiration)]);
    }
}
