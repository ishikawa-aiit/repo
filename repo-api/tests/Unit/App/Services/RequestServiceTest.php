<?php

declare(strict_types=1);

namespace Tests\Unit\App\Services;

use App\Services\RequestService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Mockery;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use PHPUnit\Framework\TestCase;

/**
 * リクエストサービスのテスト
 */
class RequestServiceTest extends TestCase
{
    use MockeryPHPUnitIntegration;

    /**
     * 正常系テスト
     *
     * 引数のリクエストから、bodyが取り出され、そのキーがキャメルケースからスネークケースに変換される。
     *
     * @dataProvider dataProviderNormal
     * @param array<string, string> $body   dataProviderNormalで生成されたリクエストボディ
     * @param array<string, string> $expect dataProviderNormalで生成された期待値の配列
     * @return void
     */
    public function testConvertRequestBodyKeysFromCamelToSnakeNormal(array $body, array $expect): void
    {
        /** @var \Illuminate\Http\Request&\Mockery\MockInterface */
        $requestMock = Mockery::mock(Request::class);
        $requestMock->shouldReceive('all')->andReturn($body);

        $requestService = new RequestService();
        $result = $requestService->convertRequestBodyKeysFromCamelToSnake($requestMock);
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
            'keyがキャメルケース、配列が複数行' => [
                'arg' => ['testKey11' => 'testValue', 'testkEy12' => 'testvAlue'],
                'expect' => ['test_key11' => 'testValue', 'testk_ey12' => 'testvAlue'],
            ],
            'keyが全て小文字' => [
                'arg' => ['testkey' => 'testvalue'],
                'expect' => ['testkey' => 'testvalue'],
            ],
            'keyがスネークケース' => [
                'arg' => ['test_key' => 'test_value'],
                'expect' => ['test_key' => 'test_value'],
            ],
            'keyがすべて大文字' => [
                'arg' => ['TESTKEY' => 'TESTVALUE'],
                'expect' => ['t_e_s_t_k_e_y' => 'TESTVALUE'],
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
     * FormRequest の場合は validated の内容を変換すること
     *
     * @dataProvider dataProviderNormal
     * @param array<string, string> $body
     * @param array<string, string> $expected
     * @return void
     */
    public function testConvertWithFormRequest(array $body, array $expected): void
    {
        /** @var \Illuminate\Foundation\Http\FormRequest&\Mockery\MockInterface */
        $requestMock = Mockery::mock(FormRequest::class);
        $requestMock->shouldReceive('validated')->andReturn($body);

        $requestService = new RequestService();
        $this->assertSame($expected, $requestService->convertRequestBodyKeysFromCamelToSnake($requestMock));
    }

    /**
     * 異常系テスト
     *
     * 引数のリクエストから、bodyが取り出され、そのキーがキャメルケースからスネークケースに変換される。
     *
     * @dataProvider dataProviderAbnormal
     * @param array<int, string> $body dataProviderNormalで生成されたリクエストボディ
     * @return void
     */
    public function testConvertArrKeysFromCamelToSnakeAbnormal(array $body): void
    {
        /** @var \Illuminate\Http\Request&\Mockery\MockInterface */
        $requestMock = Mockery::mock(Request::class);
        $requestMock->shouldReceive('all')->andReturn($body);

        $requestService = new RequestService();
        $this->expectException(InvalidArgumentException::class);
        $requestService->convertRequestBodyKeysFromCamelToSnake($requestMock);
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
