<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * カスタムテンプレートのリソース
 *
 * @mixin \App\Models\Template
 */
class TemplateResource extends JsonResource
{
    /**
     * リソースを配列に変換
     *
     * @param \Illuminate\Http\Request $request
     * @return array<string, mixed> レスポンスとして返すカスタムテンプレートのコンテンツ
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'activityTime' => $this->activity_time,
            'doneActivity' => $this->done_activity,
            'todoActivity' => $this->todo_activity,
            'solution' => $this->solution,
            'event' => $this->event,
            'remark' => $this->remark,
            'team' => new TeamResource($this->team),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
