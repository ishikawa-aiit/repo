<?php

declare(strict_types=1);

namespace App\Http\Controllers\Template;

use App\Http\Controllers\Controller;
use App\Http\Requests\Template\StoreRequest;
use App\Http\Resources\TemplateResource;
use App\Services\RequestService;
use App\Services\TemplateService;

/**
 * カスタムテンプレートの新規登録に関するコントローラ
 */
class StoreController extends Controller
{
    /**
     * ログイン中のユーザーに紐づいた* カスタムテンプレートの登録
     *
     * @param StoreRequest $request
     * @param TemplateService $service
     * @param RequestService $requestService
     * @return TemplateResource
     */
    public function __invoke(
        StoreRequest $request,
        TemplateService $service,
        RequestService $requestService
    ): TemplateResource {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $body = $requestService->convertRequestBodyKeysFromCamelToSnake($request);

        $isShared = false;
        if (isset($body['is_shared']) && $body['is_shared']) {
            $isShared = true;
            unset($body['is_shared']);
        }

        return new TemplateResource($service->save($body, $user, $isShared));
    }
}
