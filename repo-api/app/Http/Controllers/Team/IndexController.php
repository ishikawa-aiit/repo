<?php

declare(strict_types=1);

namespace App\Http\Controllers\Team;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamResource;
use App\Services\TeamService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * PTのリストを取得するコントローラ
 */
class IndexController extends Controller
{
    /**
     * PTのリストを取得する
     *
     * @param TeamService $service
     * @return AnonymousResourceCollection
     */
    public function __invoke(TeamService $service): AnonymousResourceCollection
    {
        return TeamResource::collection($service->index());
    }
}
