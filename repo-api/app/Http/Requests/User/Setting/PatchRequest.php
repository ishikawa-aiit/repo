<?php

declare(strict_types=1);

namespace App\Http\Requests\User\Setting;

use App\Models\Team;
use Illuminate\Foundation\Http\FormRequest;

/**
 * 設定更新のリクエスト
 */
class PatchRequest extends FormRequest
{
    /**
     * バリデーションルール
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'teamId' => ['present', 'nullable', 'integer', 'exists:' . Team::class . ',id'],
        ];
    }
}
