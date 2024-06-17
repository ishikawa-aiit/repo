<?php

declare(strict_types=1);

namespace Tests\Unit\App\Models;

use App\Models\Setting;
use App\Models\User;
use PHPUnit\Framework\TestCase;

/**
 * User モデルのテスト
 */
class UserTest extends TestCase
{
    /**
     * belongsToPT のテスト
     *
     * @dataProvider dataProviderForBelongsToPT
     * @param Setting|null $setting
     * @param boolean $expected
     * @return void
     */
    public function testBelongsToPT(?Setting $setting, bool $expected): void
    {
        $user = new User();
        $user->setRelation('setting', $setting);
        $this->assertSame($expected, $user->belongsToPT());
    }

    /**
     * belongsToPT 用のデータプロバイダ
     *
     * @return array<string, array<string, mixed>>
     */
    public function dataProviderForBelongsToPT(): array
    {
        $setting = new Setting();
        $setting->setAttribute('team_id', 1);

        return [
            'no setting' => ['setting' => null, 'expected' => false],
            'setting' => ['setting' => $setting, 'expected' => true],
        ];
    }
}
