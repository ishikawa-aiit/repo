<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\User;
use Closure;
use Illuminate\Contracts\Translation\Translator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use LogicException;
use Mockery;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use Mockery\MockInterface;
use Symfony\Component\HttpFoundation\ParameterBag;

/**
 * フォームリクエストに関するヘルパー
 */
trait FormRequestHelper
{
    use MockeryPHPUnitIntegration;

    /**
     * @param boolean $condition
     * @param string $message
     * @return void
     * @see \PHPUnit\Framework\Assert::assertTrue()
     *
     */
    abstract public static function assertTrue(bool $condition, string $message = ''): void;

    /**
     * @param boolean $condition
     * @param string $message
     * @return void
     * @see \PHPUnit\Framework\Assert::assertFalse()
     *
     */
    abstract public static function assertFalse(bool $condition, string $message = ''): void;

    /**
     * 入力がリクエストのバリデーションが通るかをテストする
     *
     * @param FormRequest $request
     * @param array<string, mixed> $inputs
     * @return void
     */
    protected function assertPass(FormRequest $request, array $inputs): void
    {
        $this->assertTrue($this->validate($request, $inputs));
    }

    /**
     * 入力がリクエストのバリデーションが通らないかをテストする
     *
     * @param FormRequest $request
     * @param array<string, mixed> $inputs
     * @return void
     */
    protected function assertFails(FormRequest $request, array $inputs): void
    {
        $this->assertFalse($this->validate($request, $inputs));
    }

    /**
     * バリデーションを実施する
     *
     * @param FormRequest $request
     * @param array<string, mixed> $inputs
     * @return boolean
     */
    private function validate(FormRequest $request, array $inputs): bool
    {
        // rules メソッドがない場合はバリデーションなし
        if (!method_exists($request, 'rules')) {
            return true;
        }

        /** @var array<string, array<int, mixed>> $rules */
        $rules = $request->rules();

        /** @var Translator&\Mockery\MockInterface $translator */
        $translator = Mockery::mock(Translator::class);
        $translator->shouldReceive('get')->andReturn('dummy');

        $validator = new Validator($translator, $inputs, $rules);

        return $validator->passes();
    }

    // phpcs が交差型に対応していなさそうなので除外
    // phpcs:disable Squiz.Commenting.FunctionComment.MissingParamTag
    // phpcs:disable Squiz.Commenting.FunctionComment.ParamNameNoMatch
    // phpcs:disable Squiz.Commenting.FunctionComment.IncorrectTypeHint

    /**
     * withValidator メソッドにある after コールバックを呼び出す
     *
     * @param FormRequest $request
     * @param Validator&MockInterface $validator
     * @return void
     */
    public function callAfterCallback(FormRequest $request, Validator&MockInterface $validator): void
    {
        // phpcs:enable

        if (!method_exists($request, 'withValidator')) {
            throw new LogicException('Request should have withValidator method.');
        }

        $afterCallback = null;
        $validator->shouldReceive('after')->andReturnUsing(function (Closure $closure) use (&$afterCallback): void {
            $afterCallback = $closure;
        });

        $request->withValidator($validator);
        assert($afterCallback !== null);
        $afterCallback($validator);
    }

    /**
     * リクエストにデータを設定する
     *
     * @param FormRequest $request
     * @param array<string, mixed> $contents
     * @return void
     */
    public function setContents(FormRequest $request, array $contents): void
    {
        if (!$request->headers->has('Content-Type')) {
            $request->headers->add(['Content-Type' => 'application/json']);
        }

        $request->setJson(new ParameterBag($contents));
    }

    /**
     * リクエストにユーザを設定する
     *
     * @param FormRequest $request
     * @param User $user
     * @return void
     */
    public function setUser(FormRequest $request, User $user): void
    {
        $request->setUserResolver(fn(): User => $user);
    }
}
