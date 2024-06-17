<?php

declare(strict_types=1);

namespace App\Http\Controllers\WeeklyReport\Requirement;

use App\Http\Controllers\Controller;
use App\Http\Resources\WeeklyReportRequirementResource;
use App\Services\WeeklyReportRequirementService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * 週報要件を取得するコントローラ
 */
class IndexController extends Controller
{
    /**
     * 週報要件のリストを取得する
     *
     * @param WeeklyReportRequirementService $service
     * @return AnonymousResourceCollection
     */
    public function __invoke(WeeklyReportRequirementService $service): AnonymousResourceCollection
    {
        return WeeklyReportRequirementResource::collection($service->index());
    }
}
