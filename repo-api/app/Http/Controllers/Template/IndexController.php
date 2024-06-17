<?php

declare(strict_types=1);

namespace App\Http\Controllers\Template;

use App\Enums\TemplateIndexingType;
use App\Http\Controllers\Controller;
use App\Http\Resources\TemplateResource;
use App\Services\TemplateService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\Rules\Enum;

/**
 * カスタムテンプレートのリストを取得するコントローラ
 */
class IndexController extends Controller
{
    /**
     * ログイン中のユーザーに紐づくカスタムテンプレートを取得する
     *
     * @param Request $request
     * @param TemplateService $service
     * @return AnonymousResourceCollection
     */
    public function __invoke(Request $request, TemplateService $service): AnonymousResourceCollection
    {
        $request->validate(['type' => ['nullable', new Enum(TemplateIndexingType::class)]]);

        /** @var \App\Models\User $user */
        $user = $request->user();

        /** @var string $type */
        $type = $request->query('type') ?? TemplateIndexingType::ALL->value;

        return TemplateResource::collection($service->index($user, TemplateIndexingType::from($type)));
    }
}
