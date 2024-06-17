<?php

declare(strict_types=1);

namespace App\Http\Requests\Template;

use App\Models\Template;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\Validation\Validator;

/**
 * テンプレート保存のリクエスト
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

        $user = $this->user();
        if (!$user instanceof User) {
            throw new UnauthorizedException();
        }

        return [
            'id' => [
                'nullable',
                'integer',
                'exists:' . Template::class . ",id,user_id,{$user->id}"
            ],
            'name' => ['required', 'max:250'],
            'activityTime' => ["max:{$textMax}"],
            'doneActivity' => ["max:{$textMax}"],
            'todoActivity' => ["max:{$textMax}"],
            'solution' => ["max:{$textMax}"],
            'event' => ["max:{$textMax}"],
            'remark' => ["max:{$textMax}"],
            'isShared' => ['boolean'],
        ];
    }

    /**
     * バリデータインスタンスの設定
     *
     * @param \Illuminate\Validation\Validator $validator
     * @return void
     */
    public function withValidator(Validator $validator): void
    {
        $user = $this->user();
        if (!$user instanceof User) {
            throw new UnauthorizedException();
        }

        $validator->after(function (Validator $validator) use ($user): void {
            if ($validator->errors()->has('isShared')) {
                return;
            }

            /** @var boolean|null $isShared */
            $isShared = $this->input('isShared');

            // isShared が送られない場合は何もしない
            if ($isShared === null) {
                return;
            }

            // isShared が boolean ではない場合はエラーにする
            if (!is_bool($isShared)) {
                $message = 'The :attribute field must be true or false.';
                $validator->errors()->add('isShared', $message);
                return;
            }

            // 共有テンプレートだが所属PTがない場合はエラーにする
            if ($isShared && !$user->belongsToPT()) {
                $message = 'The :attribute cannot be true when login user does not belong to a team.';
                $validator->errors()->add('isShared', $message);
            }
        });
    }
}
