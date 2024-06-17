<?php

declare(strict_types=1);

namespace App\Http\Controllers\User\Setting\Slack;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Setting\Slack\IntegrateRequest;
use App\Services\Slack\AuthService;
use Illuminate\Http\Response;

/**
 * Slack連携を行う
 */
class IntegrateController extends Controller
{
   /**
    * Slack連携を行う
    *
    * @param IntegrateRequest $request
    * @param AuthService $authService
    * @return Response
    */
    public function __invoke(IntegrateRequest $request, AuthService $authService): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        /** @var string $code */
        $code = $request->input('code');

        try {
            $slackUser = $authService->getSlackUser($code);
        } catch (\RuntimeException $e) {
            abort(400, $e->getMessage());
        }

        $authService->storeSlackUser($user, $slackUser);

        return response()->noContent();
    }
}
