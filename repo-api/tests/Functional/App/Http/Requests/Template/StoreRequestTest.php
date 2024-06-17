<?php

declare(strict_types=1);

namespace Tests\Functional\App\Http\Requests\Template;

use App\Http\Requests\Template\StoreRequest;
use App\Models\Setting;
use App\Models\Team;
use App\Models\Template;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;
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
            'id' => null,
            'name' => 'test',
            'activityTime' => 'test',
            'doneActivity' => 'test',
            'todoActivity' => 'test',
            'solution' => 'test',
            'event' => 'test',
            'remark' => 'test',
            'isShared' => true,
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
        $baseRequest = app(Request::class);

        /** @var User $user */
        $user = User::factory()->create();
        /** @var Team $team */
        $team = Team::factory()->create();

        Setting::factory()->for($user)->for($team)->create();

        $baseRequest->setUserResolver(fn (): User => $user);

        $this->assertPass(StoreRequest::class, $inputs, $baseRequest);
    }

    /**
     * 正常な入力のデータプロバイダ
     *
     * @return array<string, array<string, mixed>>
     */
    public function validInputsProvider(): array
    {
        $maxString = str_repeat('a', 250);
        $maxText = str_repeat('a', 16000);

        return [
            'default' => ['inputs' => $this->generateInputs()],
            'empty id' => ['inputs' => $this->generateInputs(['id' => null])],
            'max name' => ['inputs' => $this->generateInputs(['name' => $maxString])],
            'max activity time' => ['inputs' => $this->generateInputs(['activityTime' => $maxText])],
            'max done activity' => ['inputs' => $this->generateInputs(['doneActivity' => $maxText])],
            'max todo activity' => ['inputs' => $this->generateInputs(['todoActivity' => $maxText])],
            'max solution' => ['inputs' => $this->generateInputs(['solution' => $maxText])],
            'max event' => ['inputs' => $this->generateInputs(['event' => $maxText])],
            'max remark' => ['inputs' => $this->generateInputs(['remark' => $maxText])],
            'undefined id' => ['inputs' => $this->generateInputs(unsets: ['id'])],
            'undefined activity time' => ['inputs' => $this->generateInputs(unsets: ['activityTime'])],
            'undefined done activity' => ['inputs' => $this->generateInputs(unsets: ['doneActivity'])],
            'undefined todo activity' => ['inputs' => $this->generateInputs(unsets: ['todoActivity'])],
            'undefined solution' => ['inputs' => $this->generateInputs(unsets: ['solution'])],
            'undefined event' => ['inputs' => $this->generateInputs(unsets: ['event'])],
            'undefined remark' => ['inputs' => $this->generateInputs(unsets: ['remark'])],
            'undefined is shared' => ['inputs' => $this->generateInputs(unsets: ['isShared'])],
            'false is shared' => ['inputs' => $this->generateInputs(['isShared' => false])],
            'belongs to team and true is shared' => ['inputs' => $this->generateInputs(['isShared' => true])],
        ];
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
        $baseRequest = app(Request::class);

        /** @var User $user */
        $user = User::factory()->create();

        $baseRequest->setUserResolver(fn (): User => $user);

        $this->assertFails(StoreRequest::class, $inputs, $baseRequest);
    }

    /**
     * 異常な入力のデータプロバイダ
     *
     * @return array<string, array<string, mixed>>
     */
    public function invalidInputsProvider(): array
    {
        $maxString = str_repeat('a', 251);
        $maxText = str_repeat('a', 16001);

        return [
            'string id' => ['inputs' => $this->generateInputs(['id' => 'a'])],
            'float id' => ['inputs' => $this->generateInputs(['id' => 0.5])],
            'not exist id in db' => ['inputs' => $this->generateInputs(['id' => -1])],
            'max name' => ['inputs' => $this->generateInputs(['name' => $maxString])],
            'max activity time' => ['inputs' => $this->generateInputs(['activityTime' => $maxText])],
            'max done activity' => ['inputs' => $this->generateInputs(['doneActivity' => $maxText])],
            'max todo activity' => ['inputs' => $this->generateInputs(['todoActivity' => $maxText])],
            'max solution' => ['inputs' => $this->generateInputs(['solution' => $maxText])],
            'max event' => ['inputs' => $this->generateInputs(['event' => $maxText])],
            'max remark' => ['inputs' => $this->generateInputs(['remark' => $maxText])],
            'required name' => ['inputs' => $this->generateInputs(unsets: ['name'])],
            'invalid type is shared' => ['inputs' => $this->generateInputs(['isShared' => 'text'])],
            'integer is shared' => ['inputs' => $this->generateInputs(['isShared' => 0])],
            'not belongs to team but true is shared' => ['inputs' => $this->generateInputs(['isShared' => true])],
        ];
    }

    /**
     * 未ログインの場合に例外が投げられる
     *
     * @return void
     */
    public function testWithValidateWithNoLogin(): void
    {
        $baseRequest = app(Request::class);

        $this->expectException(UnauthorizedException::class);
        $this->validate(StoreRequest::class, [], $baseRequest);
    }

    /**
     * id が DB に存在する場合にバリデーションをパスするか
     *
     * @return void
     */
    public function testValidateWithExistTemplateId(): void
    {
        $baseRequest = app(Request::class);

        /** @var User $user */
        $user = User::factory()->create();
        /** @var Team $team */
        $team = Team::factory()->create();

        Setting::factory()->for($user)->for($team)->create();

        /** @var Template $template */
        $template = Template::factory()->for($user)->for($team)->create();

        $baseRequest->setUserResolver(fn (): User => $user);

        $this->assertPass(StoreRequest::class, $this->generateInputs(['id' => $template->id]), $baseRequest);
    }

    /**
     * 他のユーザーのテンプレートを編集する場合にバリデーションを失敗するか
     *
     * @return void
     */
    public function testValidateWithTemplateIdBelongsToOtherUser(): void
    {
        $baseRequest = app(Request::class);

        /** @var User $user */
        $user = User::factory()->create();
        /** @var User $otherUser */
        $otherUser = User::factory()->create();
        /** @var Template $template */
        $template = Template::factory()->for($otherUser)->create();

        $baseRequest->setUserResolver(fn (): User => $user);

        $this->assertFails(StoreRequest::class, $this->generateInputs(['id' => $template->id]), $baseRequest);
    }
}
