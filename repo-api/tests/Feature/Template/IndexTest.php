<?php

declare(strict_types=1);

namespace Tests\Feature\Template;

use App\Enums\TemplateIndexingType;
use App\Models\Setting;
use App\Models\Team;
use App\Models\Template;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

/**
 * カスタムテンプレート取得APIのテスト
 */
class IndexTest extends TestCase
{
    /**
     * 正しい内容と構造でリストを取得でき、200を返す。
     *
     * @return void
     */
    public function testIndexTemplate(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        /** @var \Illuminate\Database\Eloquent\Collection<int, Template> $templates */
        $templates = Template::factory()->for($user)->count(3)->create(['team_id' => null]);

        $response = $this->getJson(route('templates.index'))
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'activityTime',
                        'doneActivity',
                        'todoActivity',
                        'solution',
                        'event',
                        'remark',
                        'team',
                        'createdAt',
                        'updatedAt',
                    ],
                ],
            ]);

        $templates->each(function (Template $template) use ($response): void {
            $info = [
                'id' => $template->id,
                'name' => $template->name,
                'activityTime' => $template->activity_time,
                'doneActivity' => $template->done_activity,
                'todoActivity' => $template->todo_activity,
                'solution' => $template->solution,
                'event' => $template->event,
                'remark' => $template->remark,
                'team' => null,
                'createdAt' => $template->created_at,
                'updatedAt' => $template->updated_at,
            ];
            $response->assertJsonFragment($info);
        });
    }

    /**
     * 共有テンプレートの場合はPT情報も返す。
     *
     * @return void
     */
    public function testIndexSharedTemplates(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        /** @var Team $team */
        $team = Team::factory()->create();

        Template::factory()->for($user)->for($team)->create();

        $this->getJson(route('templates.index'))
            ->assertOk()
            ->assertJsonFragment([
                'team' => [
                    'id' => $team->id,
                    'name' => $team->name,
                    'createdAt' => $team->created_at,
                    'updatedAt' => $team->updated_at,
                ],
            ]);
    }

    /**
     * ログインしたユーザー毎にカスタムテンプレートを取得できる。
     *
     * @return void
     */
    public function testGetOwnTemplates(): void
    {
        // テンプレートを作成している、ユーザーのファクトリー
        $userFactory = User::factory()
            ->has(Template::factory()
                // responseでユーザーが一致しているかを確認するための仕掛け
                ->state(function (array $para, ?Model $user): array {
                    assert($user instanceof User);
                    return ['remark' => $user->name];
                }));

        // ユーザー2人分作成する
        /** @var array<int, User> $users */
        $users = [];
        $users[0] = $userFactory->createOne();
        $users[1] = $userFactory->createOne();

        foreach ($users as $user) {
            Sanctum::actingAs($user);

            /** @var array<string, string> $template */
            $template = $this->getJson(route('templates.index'))
                ->assertOk()
                ->assertJsonCount(1, 'data')
                ->json('data.0');

            // response内の各テンプレートがユーザーに紐づいているかを確認
            $this->assertSame($user->name, $template['remark']);
        }
    }

    /**
     * クエリパラメータ type が正常な場合は 200 が返る
     *
     * @param array<string, string|null> $query
     * @return void
     * @dataProvider validQueriesProvider
     */
    public function testValidValidation(array $query): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $this->getJson(route('templates.index', $query))
            ->assertOk();
    }

    /**
     * 正常なクエリパラメータのプロバイダ
     *
     * @return array<string, array<string, array<string, string|null>>>
     */
    public function validQueriesProvider(): array
    {
        return [
            'all' => ['query' => ['type' => TemplateIndexingType::ALL->value]],
            'self created' => ['query' => ['type' => TemplateIndexingType::SELF_CREATED->value]],
            'null' => ['query' => ['type' => null]],
            'empty' => ['query' => []],
        ];
    }

    /**
     * クエリパラメータ type が self-created の場合は自身のテンプレートのみを取得できる。
     *
     * @return void
     */
    public function testGetOnlyOwnTemplates(): void
    {
        // ユーザテンプレートの作成
        /** @var Team $team */
        $team = Team::factory()->create();
        /** @var User $user */
        $user = User::factory()->create();
        Setting::factory()->for($user)->for($team)->create();
        /** @var Template $userTemplate */
        $userTemplate = Template::factory()->for($user)->create();

        // 共有テンプレートの作成
        /** @var Template $sharedTemplate */
        $sharedTemplate = Template::factory()->for($team)->create();

        Sanctum::actingAs($user);

        $this->getJson(route('templates.index', ['type' => TemplateIndexingType::SELF_CREATED]))
            ->assertOk()
            ->assertJsonFragment(['id' => $userTemplate->id])
            ->assertJsonMissing(['id' => $sharedTemplate->id]);
    }

    /**
     * クエリパラメータ type が不正な場合は 422 が返る
     *
     * @return void
     */
    public function testCannotGetWithInvalidQueryType(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $this->getJson(route('templates.index', ['type' => 'a']))
            ->assertUnprocessable();
    }

    /**
     * 共有されたテンプレートを取得できる。
     *
     * @return void
     */
    public function testGetTemplatesWithShared(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        /** @var Template $userTemplate */
        $userTemplate = Template::factory()->for($user)->create();
        /** @var Team $team */
        $team = Team::factory()->create();
        Setting::factory()->for($user)->for($team)->create();

        /** @var Template $sharedTemplate */
        $sharedTemplate = Template::factory()->for(User::factory())->for($team)->create();

        Sanctum::actingAs($user);

        $this->getJson(route('templates.index'))
            ->assertOk()
            ->assertJsonFragment(['id' => $userTemplate->id])
            ->assertJsonFragment(['id' => $sharedTemplate->id]);
    }

    /**
     * カスタムテンプレートを更新日の降順で取得できる。
     *
     * @return void
     */
    public function testSort(): void
    {
        // カスタムテンプレートを時間差で3つ投稿している、ユーザーのファクトリー
        /** @var User $user */
        $user = User::factory()
            ->has(Template::factory()
                ->count(3)
                ->state(new Sequence(
                    ['updated_at' => new Carbon('2022-01-01 00:00:01')],
                    ['updated_at' => new Carbon('2022-01-01 00:00:02')],
                    ['updated_at' => new Carbon('2022-01-01 00:00:03')],
                )))
            ->create();

        Sanctum::actingAs($user);

        /** @var array<int, array<string, string>> $templates */
        $templates = $this->getJson(route('templates.index'))
            ->assertOk()
            ->json('data');

        // 週報が降順で返ってきているかを確認
        $latest = new Carbon($templates[0]['updatedAt']);
        $middle = new Carbon($templates[1]['updatedAt']);
        $oldest = new Carbon($templates[2]['updatedAt']);
        $this->assertTrue($latest->gt($middle));
        $this->assertTrue($middle->gt($oldest));
    }

    /**
     * 認証されていない場合は、HttpStatus=401が返る
     *
     * @return void
     */
    public function testIndexWithoutToken(): void
    {
        $this->getJson(route('templates.index'))
            ->assertUnauthorized();
    }
}
