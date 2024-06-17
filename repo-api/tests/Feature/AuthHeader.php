<?php

declare(strict_types=1);

namespace Tests\Feature;

/**
 * 認証用トレイト
 */
trait AuthHeader
{
    /**
     * APIトークンによる認証ヘッダを組み立てます。
     *
     * @param string $token
     * @return array<string, string>
     */
    protected function buildAPITokenAuthHeader(string $token): array
    {
        return ['Authorization' => "Bearer {$token}"];
    }
}
