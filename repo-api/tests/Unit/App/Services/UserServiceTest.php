<?php

declare(strict_types=1);

namespace Tests\Unit\App\Services;

use App\Models\User;
use App\Services\UserService;
use Mockery;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use PHPUnit\Framework\TestCase;

/**
 * ユーザーサービスのテスト
 */
class UserServiceTest extends TestCase
{
    use MockeryPHPUnitIntegration;

    /**
     * 引数の$user->nameが、引数の$nameと合致していた場合、
     * saveメソッドが呼び出されず、引数のuserがそのまま返る
     *
     * @return void
     */
    public function testUpdateUserIfNotMatchCaseMatch(): void
    {
        $name = '山田花子';

        /** @var \App\Models\User&\Mockery\MockInterface */
        $userMock = Mockery::mock(User::class);

        $userMock->shouldReceive('getAttribute')->twice()->with('name')->andReturn($name);
        $userMock->shouldNotReceive('getAttribute');
        $userMock->shouldNotReceive('update');

        $userService = new UserService();
        $result = $userService->updateUserIfNotMatch($userMock, $name);

        $this->assertSame($name, $result->name);
    }

    /**
     * 引数の$user->nameが、引数の$nameと合致していない場合、
     * saveメソッドが呼び出される
     *
     * @return void
     */
    public function testUpdateUserIfNotMatchCaseNptMatch(): void
    {
        $nameDb = '山田花子';
        $nameArg  = '鈴木花子';

        /** @var \App\Models\User&\Mockery\MockInterface $userMock */
        $userMock = Mockery::mock(User::class);
        $userMock->exists = true;
        $userMock->shouldReceive('getAttribute')->once()->with('name')->andReturn($nameDb);
        $userMock->shouldReceive('update')->once();

        $userService = new UserService();
        $userService->updateUserIfNotMatch($userMock, $nameArg);
    }
}
