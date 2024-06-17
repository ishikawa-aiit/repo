<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use App\Services\PersonalAccessTokenService;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * ユーザー認証を行うコントローラ
 */
class LoginController extends Controller
{
    /**
     * ユーザー認証を行う
     *
     * @param Request $request
     * @param AuthService $service
     * @param PersonalAccessTokenService $tokenService
     * @return Response
     */
    public function __invoke(
        Request $request,
        AuthService $service,
        PersonalAccessTokenService $tokenService
    ): Response {
        if ($request->user('sanctum')) {
            /** @var string $token */
            $token = $request->bearerToken();
            $tokenService->extendTokenExpiration($token);
            return response(['token' => $token]);
        }

        $request->validate([
            'code' => 'required',
        ]);

        try {
            $googleUser = $service->authUser();
        } catch (ClientException) {
            return response(null, Response::HTTP_BAD_REQUEST);
        }

        $token = $tokenService->login(
            $googleUser->name,
            $googleUser->email
        );
        return response(['token' => $token]);
    }
}
