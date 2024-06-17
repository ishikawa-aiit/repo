<?php

declare(strict_types=1);

namespace App\Enums;

/**
 * テンプレート一覧のタイプ
 */
enum TemplateIndexingType: string
{
    // 全件取得
    case ALL = 'all';
    // 自身の作成したテンプレートのみ取得
    case SELF_CREATED = 'self-created';
}
