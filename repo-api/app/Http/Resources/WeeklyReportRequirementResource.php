<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * 週報要件のリソース
 *
 * @mixin \App\Models\WeeklyReportRequirement
 */
class WeeklyReportRequirementResource extends JsonResource
{
    /**
     * リソースを配列に変換
     *
     * @param \Illuminate\Http\Request $request
     * @return array<string, mixed> レスポンスとして返す週報要件のコンテンツ
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'targetDuration' => new WeeklyReportTargetDurationResource($this->weeklyReportTargetDuration),
            'submissionDuration' => new WeeklyReportSubmissionDurationResource($this->weeklyReportSubmissionDuration),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
