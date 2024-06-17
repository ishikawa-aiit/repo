<?php

declare(strict_types=1);

namespace Tests\Feature\Template;

use App\Models\Setting;
use App\Models\Team;
use App\Models\Template;
use App\Models\User;
use Illuminate\Support\Arr;
use Laravel\Sanctum\Sanctum;
use Tests\DataFromFactoryConverter;
use Tests\TestCase;

/**
 * カスタムテンプレート保存APIのテスト
 */
class StoreTest extends TestCase
{
    use DataFromFactoryConverter;

    /**
     * 正しい情報で登録できる。
     *
     * @return void
     */
    public function testStore(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        Setting::factory()->for($user)->create();

        $expected = Template::factory()
            ->for($user)
            ->makeOne(['team_id' => null])
            ->attributesToArray();

        $convertToCamel = $this->convertArrKeysFromSnakeToCamel($expected);

        $postData = Arr::only($convertToCamel, [
            'name',
            'activityTime',
            'doneActivity',
            'todoActivity',
            'solution',
            'event',
            'remark'
        ]);
        $postData['isShared'] = false;

        $response = $this->postJson(route('templates.store'), $postData)
            ->assertCreated()
            ->assertJsonStructure([
                'data' => [
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
                    'updatedAt'
                ],
            ]);

        $expectedResponse = $postData;
        unset($expectedResponse['isShared']);

        $response->assertJson(['data' => $expectedResponse]);

        $expected['team_id'] = null;
        $this->assertDatabaseHas('templates', $expected);
    }

    /**
     * PT共有設定でテンプレートを保存できる
     *
     * @return void
     */
    public function testStoreWithShare(): void
    {
        /** @var Team $team */
        $team = Team::factory()->create();
        /** @var User $user */
        $user = User::factory()->create();
        Setting::factory()->for($team)->for($user)->create();

        Sanctum::actingAs($user);

        $expected = Template::factory()
            ->for($user)
            ->makeOne(['team_id' => null])
            ->attributesToArray();

        $postData = Arr::only($this->convertArrKeysFromSnakeToCamel($expected), [
            'name',
            'activityTime',
            'doneActivity',
            'todoActivity',
            'solution',
            'event',
            'remark'
        ]);

        $postData['isShared'] = true;

        $this->postJson(route('templates.store'), $postData)
            ->assertCreated();

        $expected['team_id'] = $team->id;

        $this->assertDatabaseHas('templates', $expected);
    }

    /**
     * 自分で作成したテンプレートを編集できる
     *
     * @return void
     */
    public function testUpdateWithValidId(): void
    {
        /** @var User $user */
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $beforeUpdate = Template::factory()
            ->for($user)
            ->create([
                'team_id' => null,
                'name' => 'before update',
            ]);

        $attributesToArray = Arr::except($beforeUpdate->attributesToArray(), ['created_at', 'updated_at']);

        $this->assertDatabaseHas('templates', $attributesToArray);

        $afterUpdate = $beforeUpdate
            ->fill(['name' => 'after update'])
            ->attributesToArray();
        $afterUpdate = Arr::except($afterUpdate, ['created_at', 'updated_at']);

        $postData = Arr::only($this->convertArrKeysFromSnakeToCamel($afterUpdate), [
            'id',
            'name',
            'activityTime',
            'doneActivity',
            'todoActivity',
            'solution',
            'event',
            'remark'
        ]);
        $postData['isShared'] = false;

        $response = $this->postJson(route('templates.store'), $postData)
            ->assertOk();

        $expectedResponse = $postData;
        unset($expectedResponse['isShared']);

        $response->assertJson(['data' => $expectedResponse]);

        $this->assertDatabaseHas('templates', $afterUpdate);
    }

    /**
     * 自分で作成したテンプレートの共有設定を編集できる
     *
     * @return void
     */
    public function testUpdateWithShare(): void
    {
        /** @var Team $team */
        $team = Team::factory()->create();
        /** @var User $user */
        $user = User::factory()->create();
        Setting::factory()->for($team)->for($user)->create();

        Sanctum::actingAs($user);

        $beforeUpdate = Template::factory()
            ->for($user)
            ->for($team)
            ->create([
                'name' => 'before update',
            ]);

        $beforeItem = Arr::except($beforeUpdate->attributesToArray(), ['created_at', 'updated_at']);

        $this->assertDatabaseHas('templates', $beforeItem);

        $afterUpdate = $beforeUpdate
            ->fill([
                'name' => 'after update',
                'team_id' => null,
            ])
            ->attributesToArray();

        $postData = Arr::only($this->convertArrKeysFromSnakeToCamel($afterUpdate), [
            'id',
            'name',
            'activityTime',
            'doneActivity',
            'todoActivity',
            'solution',
            'event',
            'remark'
        ]);
        $postData['isShared'] = false;

        $response = $this->postJson(route('templates.store'), $postData)
            ->assertOk();

        $response->assertJson(['data' => [
            'id' => $beforeUpdate->id,
            'name' => 'after update',
            'team' => null,
        ]
        ]);

        $afterUpdate = Arr::except($afterUpdate, ['created_at', 'updated_at']);
        $this->assertDatabaseHas('templates', $afterUpdate);
    }

    /**
     * 認証されていない場合は、HttpStatus=401が返る
     *
     * @return void
     */
    public function testStoreWithoutToken(): void
    {
        $this->postJson(route('templates.store'))
            ->assertUnauthorized();
    }

    /**
     * バリデーションに失敗した場合は422が返る
     *
     * @return void
     */
    public function testStoreWithInvalidParams(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $this->postJson(route('templates.store'), [])
            ->assertUnprocessable();
    }
}
