<?php

declare(strict_types=1);

namespace Tests\Feature;

use Tests\TestCase;

/**
 * 接続確認用APIのテスト
 */
class PingTest extends TestCase
{
    /**
     * レスポンスにステータスコード：200かつpongが返ってくる
     *
     * @return void
     */
    public function testPingWithValidUser(): void
    {
        $this->get('/api/ping')
            ->assertStatus(200)
            ->assertJson(['pong']);
    }
}
