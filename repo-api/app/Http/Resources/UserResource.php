<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ユーザーのリソース
 *
 * @mixin \App\Models\User
 */
class UserResource extends JsonResource
{
    /**
     * リソースを配列に変換
     *
     * @param \Illuminate\Http\Request $request
     * @return array<string, mixed> レスポンスとして返すユーザー情報
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'team' => $this->when(
                $this->relationLoaded('setting'),
                fn(): TeamResource => new TeamResource($this->setting?->team)
            ),
            'hasSlackConnection' => $this->when(
                $this->relationLoaded('setting'),
                function (): bool {
                    if (is_null($this->setting)) {
                        return false;
                    }

                    return $this->setting->hasSlackConnection();
                }
            ),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
