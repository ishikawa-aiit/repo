<?php

declare(strict_types=1);

namespace Tests;

/**
 * テスト内のデータの生成に関するtrait
 */
trait GenerateInputs
{
    /**
     * デフォルト入力値
     *
     * @return array<string, mixed>
     */
    abstract protected function getDefaultInputs(): array;

    /**
     * 入力値を生成します。
     *
     * @param array<string, mixed> $overrides デフォルトから上書きしたい内容
     * @param array<int, string> $unsets    デフォルトから削除したいキー
     * @return array<string, mixed>
     */
    protected function generateInputs(array $overrides = [], array $unsets = []): array
    {
        $result = array_merge($this->getDefaultInputs(), $overrides);

        foreach ($unsets as $unset) {
            unset($result[$unset]);
        }

        return $result;
    }
}
