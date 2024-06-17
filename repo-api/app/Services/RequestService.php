<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use InvalidArgumentException;

/**
 * リクエストに関するサービス
 */
class RequestService
{
    /**
     * Request bodyのkeyをキャメルケースからスネークケースに変換します。valueは変換しません。
     *
     * @param Request $request リクエスト
     * @return array<string, mixed> スネークケースのkeyを持つ配列
     * @throws InvalidArgumentException keyがstring型以外の配列が引数として渡された場合
     */
    public function convertRequestBodyKeysFromCamelToSnake(Request $request): array
    {
        /** @var array<string, mixed> $requestBody */
        $requestBody = $request instanceof FormRequest ? $request->validated() : $request->all();
        $camelKeys = array_keys($requestBody);
        $values = array_values($requestBody);
        $snakeKeys = [];
        foreach ($camelKeys as $camelKey) {
            if (!is_string($camelKey)) {
                throw new InvalidArgumentException("keyは {$camelKey} string型にしてください。");
            }
            $snakeKeys[] = Str::snake($camelKey);
        }
        return array_combine($snakeKeys, $values);
    }
}
