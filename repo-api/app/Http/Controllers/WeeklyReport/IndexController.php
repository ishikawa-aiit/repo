<?php

declare(strict_types=1);

namespace App\Http\Controllers\WeeklyReport;

use App\Http\Controllers\Controller;
use App\Http\Resources\WeeklyReportResource;
use App\Services\WeeklyReportService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * 週報の一覧を取得するコントローラ
 */
class IndexController extends Controller
{
    /**
     * ログイン中のユーザーに紐づく週報一覧を取得する
     *
     * @param Request $request
     * @param WeeklyReportService $service
     *
     * @return AnonymousResourceCollection
     */
    public function __invoke(Request $request, WeeklyReportService $service): AnonymousResourceCollection
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        return WeeklyReportResource::collection($service->index($user));
    }
}
