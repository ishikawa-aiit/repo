<?php

declare(strict_types=1);

namespace Tests\Functional\App\Http\Requests\WeeklyReport;

use App\Http\Requests\WeeklyReport\StoreRequest;
use App\Models\WeeklyReportRequirement;
use Tests\Functional\FormRequestAssertion;
use Tests\GenerateInputs;
use Tests\TestCase;

/**
 * StoreRequest の結合テスト
 */
class StoreRequestTest extends TestCase
{
    use FormRequestAssertion;
    use GenerateInputs;

    /**
     * デフォルト入力値を準備
     *
     * @return array<string, mixed>
     */
    protected function getDefaultInputs(): array
    {
        return [
            'activityTime' => 'test',
            'doneActivity' => 'test',
            'todoActivity' => 'test',
            'solution' => 'test',
            'event' => 'test',
            'remark' => 'test',
        ];
    }

    /**
     * 正常な入力の場合にバリデーションをパスするか
     *
     * @dataProvider validInputsProvider
     * @param array<string, mixed> $inputs
     * @return void
     */
    public function testValidateWithValidInputs(array $inputs): void
    {
        /** @var WeeklyReportRequirement $requirement */
        $requirement = WeeklyReportRequirement::factory()->create();

        $inputs['requirementId'] = $requirement->id;

        $this->assertPass(StoreRequest::class, $inputs);
    }

    /**
     * 正常な入力のデータプロバイダ
     *
     * @return array<string, array<string, mixed>>
     */
    public function validInputsProvider(): array
    {
        $maxText = str_repeat('a', 16000);

        return [
            'default' => ['inputs' => $this->generateInputs()],
            'max activity time' => ['inputs' => $this->generateInputs(['activityTime' => $maxText])],
            'max done activity' => ['inputs' => $this->generateInputs(['doneActivity' => $maxText])],
            'max todo activity' => ['inputs' => $this->generateInputs(['todoActivity' => $maxText])],
            'max solution' => ['inputs' => $this->generateInputs(['solution' => $maxText])],
            'max event' => ['inputs' => $this->generateInputs(['event' => $maxText])],
            'max remark' => ['inputs' => $this->generateInputs(['remark' => $maxText])],
        ];
    }

    /**
     * 異常な入力の場合にバリデーションをパスしないか
     *
     * @dataProvider invalidInputsProvider
     * @param array<string, mixed> $inputs
     * @return void
     */
    public function testValidateWithInvalidInputs(array $inputs): void
    {
        /** @var WeeklyReportRequirement $requirement */
        $requirement = WeeklyReportRequirement::factory()->create();

        $inputs['requirementId'] = $requirement->id;

        $this->assertFails(StoreRequest::class, $inputs);
    }

    /**
     * 異常な入力のデータプロバイダ
     *
     * @return array<string, array<string, mixed>>
     */
    public function invalidInputsProvider(): array
    {
        $maxText = str_repeat('a', 16001);

        return [
            'undefined activity time' => ['inputs' => $this->generateInputs(unsets: ['activityTime'])],
            'undefined done activity' => ['inputs' => $this->generateInputs(unsets: ['doneActivity'])],
            'undefined todo activity' => ['inputs' => $this->generateInputs(unsets: ['todoActivity'])],
            'undefined solution' => ['inputs' => $this->generateInputs(unsets: ['solution'])],
            'undefined event' => ['inputs' => $this->generateInputs(unsets: ['event'])],
            'undefined remark' => ['inputs' => $this->generateInputs(unsets: ['remark'])],
            'max activity time' => ['inputs' => $this->generateInputs(['activityTime' => $maxText])],
            'max done activity' => ['inputs' => $this->generateInputs(['doneActivity' => $maxText])],
            'max todo activity' => ['inputs' => $this->generateInputs(['todoActivity' => $maxText])],
            'max solution' => ['inputs' => $this->generateInputs(['solution' => $maxText])],
            'max event' => ['inputs' => $this->generateInputs(['event' => $maxText])],
            'max remark' => ['inputs' => $this->generateInputs(['remark' => $maxText])],
        ];
    }

    /**
     * RequirementIdがnullの場合、テストが失敗するかどうか
     *
     * @return void
     */
    public function testValidateWithEmptyRequirementId(): void
    {
        $this->assertFails(StoreRequest::class, $this->generateInputs());
    }

    /**
     * RequirementIdが存在しないの場合、テストが失敗するかどうか
     *
     * @return void
     */
    public function testValidateWithNonExistRequirementId(): void
    {
        $this->assertFails(StoreRequest::class, $this->generateInputs(['requirementId' => -1]));
    }
}
