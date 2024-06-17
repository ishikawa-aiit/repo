<?php

declare(strict_types=1);

namespace App\Http\Requests\User\Setting\Slack;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Slack連携のリクエスト
 */
class IntegrateRequest extends FormRequest
{
    /**
     * バリデーションルール
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'code' => [
                'required',
                'string',
            ],
        ];
    }
}
