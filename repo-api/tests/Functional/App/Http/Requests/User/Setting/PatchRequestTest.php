<?php

declare(strict_types=1);

namespace Tests\Functional\App\Http\Requests\User\Setting;

use App\Http\Requests\User\Setting\PatchRequest;
use App\Models\Team;
use Tests\Functional\FormRequestAssertion;
use Tests\TestCase;

/**
 * PatchRequest の結合テスト
 */
class PatchRequestTest extends TestCase
{
    use FormRequestAssertion;

    /**
     * teamId が空の場合にバリデーションをパスするか
     *
     * @return void
     */
    public function testValidateWithEmptyTeamId(): void
    {
        $this->assertPass(PatchRequest::class, ['teamId' => null]);
    }

    /**
     * teamId が DB に存在する場合にバリデーションをパスするか
     *
     * @return void
     */
    public function testValidateWithExistTeamId(): void
    {
        /** @var Team $team */
        $team = Team::factory()->create();
        $this->assertPass(PatchRequest::class, ['teamId' => $team->id]);
    }

    /**
     * 異常な入力の場合にバリデーションをパスするか
     *
     * @dataProvider invalidInputsProvider
     * @param array<string, mixed> $inputs
     * @return void
     */
    public function testValidateWithInvalidInputs(array $inputs): void
    {
        $this->assertFails(PatchRequest::class, $inputs);
    }

    /**
     * 異常な入力のデータプロバイダ
     *
     * @return array<string, array<string, mixed>>
     */
    public function invalidInputsProvider(): array
    {
        return [
            'string teamId' => ['inputs' => ['teamId' => 'a']],
            'float teamId' => ['inputs' => ['teamId' => 0.5]],
            'not exist teamId' => ['inputs' => ['teamId' => -1]],
            'required teamId' => ['inputs' => []],
        ];
    }
}
