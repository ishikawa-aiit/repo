<?php

declare(strict_types=1);

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Services\Test\LoginService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * テスト用のログインコントローラ
 */
class LoginController extends Controller
{
    /**
     * テストで使用するための有効なトークンを返します。
     *
     * ローカル・テスト以外でアクセスすると 404 になります。
     *
     * @param Request $request
     * @return JsonResponse
     * @throws \Throwable トランザクション失敗時
     */
    public function __invoke(Request $request): JsonResponse
    {
        if (!in_array(config('app.env'), ['local', 'testing'], true)) {
            abort(Response::HTTP_NOT_FOUND);
        }

        $request->validate([
            'email' => 'required',
            'slack' => ['nullable', 'boolean'],
            'reset' => ['nullable', 'boolean'],
        ]);

        $service = app(LoginService::class);

        /** @var string $email */
        $email = $request->input('email');
        $shouldResetDB = $request->boolean('reset');
        $shouldSetSlack = $request->boolean('slack');

        return response()->json(['token' => $service($email, $shouldResetDB, $shouldSetSlack)]);
    }
}
