<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\TemplateIndexingType;
use App\Models\Template;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

/**
 * カスタムテンプレートに関するサービス
 */
class TemplateService
{
    /**
     * TemplateServiceのコンストラクタ
     *
     * @param Template $template
     */
    public function __construct(private readonly Template $template)
    {
    }

    /**
     * カスタムテンプレートを新規作成します。
     *
     * @param array<string, mixed> $contents 作成したいカスタムテンプレートのコンテンツ
     * @param User $user     認証されたユーザー
     * @param boolean $isShared テンプレートをPTに共有するか
     * @return Template 作成したカスタムテンプレートデータ
     */
    public function save(array $contents, User $user, bool $isShared): Template
    {
        /** @var Template $template */
        $template = $this->template->newInstance();

        $contents['team_id'] = $isShared ? $user->setting?->team_id : null;

        if (isset($contents['id'])) {
            /** @var integer $id */
            $id = $contents['id'];
            $template = $this->template->findOrFail($id);
            unset($contents['id']);
        }

        $template->fill($contents);
        $user->templates()->save($template);

        return $template;
    }

    /**
     * カスタムテンプレートの一覧のデータを返します。
     *
     * @param User $user 認証されたユーザー
     * @param TemplateIndexingType $type 一覧のタイプ
     * @return Collection<int, Template> 作成したカスタムテンプレートデータ
     */
    public function index(User $user, TemplateIndexingType $type): Collection
    {
        $user->loadMissing('setting.team.templates');

        /** @var Collection<int, Template> $templates ユーザのテンプレート */
        $templates = $user->templates;

        if ($type === TemplateIndexingType::ALL) {
            /** @var Collection<int, Template> $ptTemplates */
            $ptTemplates = $user->setting?->team?->templates ?? new Collection();
            $templates = $templates->merge($ptTemplates);
        }

        return $templates->sortByDesc('updated_at');
    }
}
