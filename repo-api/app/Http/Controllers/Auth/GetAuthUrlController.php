<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * google認証のリダイレクトURLを発行するコントローラ
 */
class GetAuthUrlController extends Controller
{
    /**
     * リダイレクトURLを取得する
     *
     * @param Request $request
     * @param AuthService $authService
     * @return JsonResponse
     */
    public function __invoke(
        Request $request,
        AuthService $authService,
    ): JsonResponse {
        $isLoggedIn = $request->user('sanctum') !== null;
        return response()->json(
            ['url' => $authService->generateRedirectUrl($isLoggedIn)]
        );
    }
}
