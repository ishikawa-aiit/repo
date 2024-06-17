<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Team;
use Illuminate\Database\Eloquent\Collection;

/**
 * PTに関するサービス
 */
class TeamService
{
    /**
     * PTの一覧のデータを返します。
     *
     * @return Collection<int, Team> PTデータ
     */
    public function index(): Collection
    {
        return Team::orderBy('id')->get();
    }
}
