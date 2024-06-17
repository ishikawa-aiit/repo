<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * 週報提出期間のリソース
 *
 * @mixin \App\Models\WeeklyReportSubmissionDuration
 */
class WeeklyReportSubmissionDurationResource extends JsonResource
{
    /**
     * リソースを配列に変換
     *
     * @param \Illuminate\Http\Request $request
     * @return array<string, mixed> レスポンスとして返す週報提出期間のコンテンツ
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'startAt' => $this->start_at->toRfc3339String(),
            'endAt' => $this->end_at->toRfc3339String(),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
