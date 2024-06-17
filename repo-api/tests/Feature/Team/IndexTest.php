<?php

declare(strict_types=1);

namespace Tests\Feature\Team;

use App\Models\Team;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

/**
 * PT取得APIのテスト
 */
class IndexTest extends TestCase
{
    /**
     * 正しい内容と構造でリストを取得でき、200を返す。
     *
     * @return void
     */
    public function testIndexTeam(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        /** @var \Illuminate\Database\Eloquent\Collection<int, Team> $teams */
        $teams = Team::factory()->count(5)->create();

        $response = $this->getJson(route('teams.index'))
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'createdAt',
                        'updatedAt',
                    ],
                ],
            ]);

        $teams->each(function (Team $team) use ($response): void {
            $info = [
                'id' => $team->id,
                'name' => $team->name,
                'createdAt' => $team->created_at,
                'updatedAt' => $team->updated_at,
            ];
            $response->assertJsonFragment($info);
        });
    }

    /**
     * PTをidの降順で取得できる。
     *
     * @return void
     */
    public function testSort(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Team::factory()->count(5)->create();

        /** @var array<int, array<string, string>> $teams */
        $teams = $this->getJson(route('teams.index'))
            ->assertOk()
            ->json('data');

        $this->assertTrue(count($teams) > 0);

        // PTがidの昇順で返ってきているかを確認
        for ($i = (int)$teams[0]['id']; $i < count($teams); $i++) {
            $teamId = (int)$teams[$i]['id'];
            $this->assertTrue($teamId === $i);
        }
    }

    /**
     * 認証されていない場合は、HttpStatus=401が返る
     *
     * @return void
     */
    public function testIndexWithoutToken(): void
    {
        $this->getJson(route('teams.index'))
            ->assertUnauthorized();
    }
}
