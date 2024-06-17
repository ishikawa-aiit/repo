<?php

declare(strict_types=1);

namespace App\Http\Requests\WeeklyReport;

use App\Models\WeeklyReportRequirement;
use Illuminate\Foundation\Http\FormRequest;

/**
 * 週報保存のリクエスト
 */
class StoreRequest extends FormRequest
{
    /**
     * バリデーションルール
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $textMax = 16000;

        return [
            'requirementId' => [
                'required',
                'exists:' . WeeklyReportRequirement::class . ',id'
            ],
            'activityTime' => ['required', "max:{$textMax}"],
            'doneActivity' => ['required', "max:{$textMax}"],
            'todoActivity' => ['required', "max:{$textMax}"],
            'solution' => ['required', "max:{$textMax}"],
            'event' => ['required', "max:{$textMax}"],
            'remark' => ['required', "max:{$textMax}"],
        ];
    }
}
