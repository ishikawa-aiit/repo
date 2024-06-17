<?php

declare(strict_types=1);

namespace Tests\Functional;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\ParameterBag;

/**
 * フォームリクエストに関するアサーション
 */
trait FormRequestAssertion
{
    /**
     * @return void
     * @see \PHPUnit\Framework\TestCase::expectNotToPerformAssertions()
     */
    abstract public function expectNotToPerformAssertions(): void;

    /**
     * @param class-string $exception
     * @phpstan-param class-string<\Throwable> $exception
     * @return void
     * @see \PHPUnit\Framework\TestCase::expectException()
     *
     */
    abstract public function expectException(string $exception): void;

    /**
     * 入力がリクエストのバリデーションが通るかをテストする
     *
     * @param class-string $request
     * @param array<string, mixed> $inputs
     * @param Request|null $baseRequest
     * @return void
     */
    protected function assertPass(string $request, array $inputs, ?Request $baseRequest = null): void
    {
        $this->expectNotToPerformAssertions();
        $this->validate($request, $inputs, $baseRequest);
    }

    /**
     * 入力がリクエストのバリデーションが通らないかをテストする
     *
     * @param class-string $request
     * @param array<string, mixed> $inputs
     * @param Request|null $baseRequest
     * @return void
     */
    protected function assertFails(string $request, array $inputs, ?Request $baseRequest = null): void
    {
        $this->expectException(ValidationException::class);
        $this->validate($request, $inputs, $baseRequest);
    }

    /**
     * バリデーションを実施する
     *
     * @param class-string $request
     * @param array<string, mixed> $inputs
     * @param Request|null $baseRequest
     * @return void
     */
    private function validate(string $request, array $inputs, ?Request $baseRequest): void
    {
        if ($baseRequest === null) {
            $baseRequest = app(Request::class);
        }

        if (!$baseRequest->headers->has('Content-Type')) {
            $baseRequest->headers->add(['Content-Type' => 'application/json']);
        }

        $baseRequest->setJson(new ParameterBag($inputs));

        app($request, [$baseRequest]);
    }
}
