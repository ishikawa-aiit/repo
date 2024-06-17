<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * 週報のリソース
 *
 * @mixin \App\Models\WeeklyReport
 */
class WeeklyReportResource extends JsonResource
{
    /**
     * リソースを配列に変換
     *
     * @param \Illuminate\Http\Request $request
     * @return array<string, mixed> レスポンスとして返す週報のコンテンツ
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'requirement' => new WeeklyReportRequirementResource($this->weeklyReportRequirement),
            'activityTime' => $this->activity_time,
            'doneActivity' => $this->done_activity,
            'todoActivity' => $this->todo_activity,
            'solution' => $this->solution,
            'event' => $this->event,
            'remark' => $this->remark,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
