<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * PTのリソース
 *
 * @mixin \App\Models\Team
 */
class TeamResource extends JsonResource
{
    /**
     * リソースを配列に変換
     *
     * @param \Illuminate\Http\Request $request
     * @return array<string, mixed> レスポンスとして返すPTのコンテンツ
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
