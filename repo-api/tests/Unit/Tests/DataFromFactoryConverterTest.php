<?php

declare(strict_types=1);

namespace Tests\Unit\Tests;

use InvalidArgumentException;
use PHPUnit\Framework\TestCase;
use Tests\DataFromFactoryConverter;

/**
 * ファクトリー生成データ変換クラスのテスト
 */
class DataFromFactoryConverterTest extends TestCase
{
    use DataFromFactoryConverter;

    /**
     * 正常系テスト
     *
     * 配列のキーがスネークケースからキャメルケースに変換される。
     *
     * @dataProvider dataProviderNormal
     * @param array<string, string>  $arg    dataProviderNormalで生成された引数の配列
     * @param array<string, string>  $expect dataProviderNormalで生成された期待値の配列
     * @return void
     */
    public function testConvertArrKeysFromSnakeToCamel(array $arg, array $expect): void
    {
        $result = $this->convertArrKeysFromSnakeToCamel($arg);
        $this->assertSame($expect, $result);
    }

    /**
     * データプロバイダとしてテストに与えるデータを返す(正常系テスト用）。
     *
     * @return array<string, array<string, array<string, string>>> テスト用データ
     */
    public function dataProviderNormal(): array
    {
        return [
            'keyがスネークケース、配列が複数行' => [
                'arg' => ['test_key1' => 'test_value', 'testk_ey2' => 'testv_alue'],
                'expect' => ['testKey1' => 'test_value', 'testkEy2' => 'testv_alue'],
            ],
            'keyが全て小文字' => [
                'arg' => ['testkey' => 'testvalue'],
                'expect' => ['testkey' => 'testvalue'],
            ],
            'keyがキャメルケース' => [
                'arg' => ['testKey' => 'test_value'],
                'expect' =>  ['testKey' => 'test_value'],
            ],
            'keyが1文字ごとにアンダースコアで連結' => [
                'arg' => ['t_e_s_t_k_e_y' => 't_e_s_t_v_a_l_u_e'],
                'expect' => ['tESTKEY' => 't_e_s_t_v_a_l_u_e'],
            ],
            'keyが日本語固有文字' => [
                'arg' => ['試験ようキー' => '試験ようバリュー'],
                'expect' => ['試験ようキー' => '試験ようバリュー'],
            ],
            'keyが空文字' => [
                'arg' => ['' => ''],
                'expect' => ['' => ''],
            ],
            'keyが空' => [
                'arg' => [],
                'expect' => [],
            ]
        ];
    }

    /**
     * 異常系テスト
     *
     * 配列のキーがキャメルケースからスネークケースに変換される。
     *
     * @dataProvider dataProviderAbnormal
     * @param array<int, string> $arg dataProviderAbnormalで生成された引数の配列
     * @return void
     */
    public function testConvertArrKeysFromCamelToSnakeAbnormal(array $arg,): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->convertArrKeysFromSnakeToCamel($arg);
    }

    /**
     * データプロバイダとしてテストに与えるデータを返す(異常系テスト用、引数のみ）。
     *
     * @return array<string, array<string, array<int, string>>> テスト用データ
     */
    public function dataProviderAbnormal(): array
    {
        return [
            'keyが数字' => [
                'arg' => [1 => '数字'],
            ],
        ];
    }
}
