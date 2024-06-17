<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * 設定のリソース
 *
 * @mixin \App\Models\Setting
 */
class SettingResource extends JsonResource
{
    /**
     * リソースを配列に変換
     *
     * @param \Illuminate\Http\Request $request
     * @return array<string, mixed> レスポンスとして返す設定のコンテンツ
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->user),
            'team' => new TeamResource($this->team),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
