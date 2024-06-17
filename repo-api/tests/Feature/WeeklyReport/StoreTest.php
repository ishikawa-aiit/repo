<?php

declare(strict_types=1);

namespace Tests\Feature\WeeklyReport;

use App\Models\User;
use App\Models\WeeklyReport;
use Laravel\Sanctum\Sanctum;
use Tests\DataFromFactoryConverter;
use Tests\Feature\AuthHeader;
use Tests\TestCase;

/**
 * 週報保存APIのテスト
 */
class StoreTest extends TestCase
{
    use AuthHeader;
    use DataFromFactoryConverter;

    /**
     * 正しい情報で登録できる。
     *
     * @return void
     */
    public function testWithStoreWeeklyReport(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $expected = WeeklyReport::factory()
            ->for($user)
            ->makeOne()
            ->attributesToArray();

        $postData = $this->convertArrKeysFromSnakeToCamel($expected);
        $postData['requirementId'] = $postData['weeklyReportRequirementId'];
        unset($postData['weeklyReportRequirementId']);

        $this->postJson(route('weekly-reports.store'), $postData)
            ->assertCreated()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'requirement',
                    'activityTime',
                    'doneActivity',
                    'todoActivity',
                    'solution',
                    'event',
                    'remark',
                    'createdAt',
                    'updatedAt'
                ],
            ]);
        $this->assertDatabaseHas('weekly_reports', $expected);
    }

    /**
     * 認証されていない場合は、HttpStatus=401が返る
     *
     * @return void
     */
    public function testStoreWithoutToken(): void
    {
        $input = WeeklyReport::factory()->makeOne()->attributesToArray();
        $postData = $this->convertArrKeysFromSnakeToCamel($input);

        $this->postJson(route('weekly-reports.store'), $postData)
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

        $this->postJson(route('weekly-reports.store'), [])
            ->assertUnprocessable();
    }
}
