<?php

declare(strict_types=1);

namespace App\Http\Controllers\WeeklyReport;

use App\Http\Controllers\Controller;
use App\Http\Requests\WeeklyReport\StoreRequest;
use App\Http\Resources\WeeklyReportResource;
use App\Services\RequestService;
use App\Services\WeeklyReportService;

/**
 * 週報の新規登録に関するコントローラ
 */
class StoreController extends Controller
{
    /**
     * ログイン中のユーザーに紐づいた週報の登録
     *
     * @param StoreRequest $request
     * @param WeeklyReportService $service
     * @param RequestService $requestService
     * @return WeeklyReportResource
     */
    public function __invoke(
        StoreRequest $request,
        WeeklyReportService $service,
        RequestService $requestService
    ): WeeklyReportResource {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $body = $requestService->convertRequestBodyKeysFromCamelToSnake($request);
        $body['weekly_report_requirement_id'] = $body['requirement_id'];
        unset($body['requirement_id']);

        return new WeeklyReportResource($service->create($body, $user));
    }
}
