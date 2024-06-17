<?php

declare(strict_types=1);

namespace Tests\Feature\User\Setting;

use App\Models\Team;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Tests\DataFromFactoryConverter;
use Tests\TestCase;

/**
 * 設定更新APIのテスト
 */
class PatchTest extends TestCase
{
    use DataFromFactoryConverter;

    /**
     * 正しい情報で更新できる。
     *
     * @return void
     */
    public function testPatch(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        /** @var Team $team */
        $team = Team::factory()->create();

        $teamCamel = $this->convertArrKeysFromSnakeToCamel($team->attributesToArray());

        $this->patchJson(route('users.team.setting'), [
            'teamId' => $team->id,
        ])->assertOk()
            ->assertJson([
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                    ],
                    'team' => $teamCamel,
                ],
            ])
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'user',
                    'team',
                    'createdAt',
                    'updatedAt',
                ],
            ]);

        $this->assertDatabaseHas('settings', [
            'user_id' => $user->id,
            'team_id' => $team->id,
        ]);
    }

    /**
     * 所属PTを外す。
     *
     * @return void
     */
    public function testPatchWithEmptyTeamId(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $this->patchJson(route('users.team.setting'), [
            'teamId' => null,
        ])->assertOk()
            ->assertJson([
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                    ],
                    'team' => null,
                ],
            ])
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'user',
                    'team',
                    'createdAt',
                    'updatedAt'
                ],
            ]);

        $this->assertDatabaseHas('settings', [
            'user_id' => $user->id,
            'team_id' => null,
        ]);
    }

    /**
     * 認証されていない場合は、HttpStatus=401が返る
     *
     * @return void
     */
    public function testPatchWithoutToken(): void
    {
        $this->patchJson(route('users.team.setting'))
            ->assertUnauthorized();
    }
}
