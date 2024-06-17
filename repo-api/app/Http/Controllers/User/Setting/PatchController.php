<?php

declare(strict_types=1);

namespace App\Http\Controllers\User\Setting;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Setting\PatchRequest;
use App\Http\Resources\SettingResource;
use App\Services\RequestService;
use App\Services\SettingService;

/**
 * 設定の更新に関するコントローラ
 */
class PatchController extends Controller
{
    /**
     * 設定を更新
     *
     * @param PatchRequest $request
     * @param SettingService $service
     * @param RequestService $requestService
     * @return SettingResource
     */
    public function __invoke(
        PatchRequest $request,
        SettingService $service,
        RequestService $requestService
    ): SettingResource {
        /** @var \App\Models\User $user */
        $user = $request->user();
        /** @var array<string, string> $body */
        $body = $requestService->convertRequestBodyKeysFromCamelToSnake($request);

        $service->updateSetting($user, $body);

        return new SettingResource($user->setting);
    }
}
