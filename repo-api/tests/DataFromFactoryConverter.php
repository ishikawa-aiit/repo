<?php

declare(strict_types=1);

namespace Tests;

use Illuminate\Support\Str;
use InvalidArgumentException;

/**
 * テスト内における、ファクトリーで生成したデータの変更に関するtrait
 */
trait DataFromFactoryConverter
{
    /**
     * 配列のkeyをスネークケースからキャメルケースに変換します。valueは変換しません。
     *
     * @param array<int|string, mixed> $arrKeySnake スネークケースのkeyを持つ配列
     * @return array<string, mixed>  キャメルケースのkeyを持つ配列
     */
    public function convertArrKeysFromSnakeToCamel(array $arrKeySnake): array
    {
        $snakeKeys = array_keys($arrKeySnake);
        $values = array_values($arrKeySnake);
        $camelKeys = [];
        foreach ($snakeKeys as $snakeKey) {
            if (!is_string($snakeKey)) {
                throw new InvalidArgumentException('keyは {$snakeKey} string型にしてください。');
            }
            $camelKeys[] = Str::camel($snakeKey);
        }
        return array_combine($camelKeys, $values);
    }
}
