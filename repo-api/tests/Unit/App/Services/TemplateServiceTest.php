<?php

declare(strict_types=1);

namespace Tests\Unit\App\Services;

use App\Enums\TemplateIndexingType;
use App\Models\Setting;
use App\Models\Template;
use App\Models\User;
use App\Services\TemplateService;
use Illuminate\Database\Eloquent\Collection;
use Mockery;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use Mockery\MockInterface;
use PHPUnit\Framework\TestCase;

/**
 * TemplateService のテスト
 */
class TemplateServiceTest extends TestCase
{
    use MockeryPHPUnitIntegration;

    /**
     * save 時に isShared が true 場合は team_id を付与する
     *
     * @return void
     */
    public function testSaveWithShare(): void
    {
        /** @var Setting&MockInterface $setting */
        $setting = Mockery::mock(Setting::class);
        $setting->shouldReceive('getAttribute')->with('team_id')->once()->andReturn(1);
        /** @var User&MockInterface $user */
        $user = Mockery::mock(User::class);
        $user->shouldReceive('getAttribute')->with('setting')->once()->andReturn($setting);

        /** @var Template&MockInterface $returnTemplate */
        $returnTemplate = Mockery::mock(Template::class);
        $returnTemplate->shouldReceive('fill')->once()->with(['team_id' => 1])->andReturn($returnTemplate);

        /** @var Template&MockInterface $template */
        $template = Mockery::mock(Template::class);
        $template->shouldReceive('newInstance')->andReturn($returnTemplate);
        $template->shouldReceive('findOrFail')->with(1)->andReturn($returnTemplate);

        $user->shouldReceive('templates->save')->with($returnTemplate);

        $service = new TemplateService($template);
        $service->save(['id' => 1], $user, true);
    }

    /**
     * save 時に isShared が false の場合は team_id を付与しない
     *
     * @return void
     */
    public function testSaveWithoutShare(): void
    {
        /** @var User&MockInterface $user */
        $user = Mockery::mock(User::class);
        $user->shouldNotReceive('getAttribute')->with('setting');

        /** @var Template&MockInterface $returnTemplate */
        $returnTemplate = Mockery::mock(Template::class);
        $returnTemplate->shouldReceive('fill')->once()->with(['team_id' => null])->andReturn($returnTemplate);

        /** @var Template&MockInterface $template */
        $template = Mockery::mock(Template::class);
        $template->shouldReceive('newInstance')->andReturn($returnTemplate);

        $user->shouldReceive('templates->save')->with($returnTemplate);

        $service = new TemplateService($template);
        $service->save([], $user, false);
    }

    /**
     * save 時に contents の中の id 値が null ではない場合は、該当のテンプレートを更新する
     *
     * @return void
     */
    public function testSaveWithId(): void
    {
        /** @var User&MockInterface $user */
        $user = Mockery::mock(User::class);

        /** Template&MockInterface $returnTemplate */
        $returnTemplate = Mockery::mock(Template::class);
        $returnTemplate->shouldReceive('fill')->with(['team_id' => null])->once();

        /** @var Template&MockInterface $template */
        $template = Mockery::mock(Template::class);
        $template->shouldReceive('newInstance')->andReturn($returnTemplate);
        $template->shouldReceive('findOrFail')->once()->with(1)->andReturn($returnTemplate);

        $user->shouldReceive('templates->save')->with($returnTemplate);

        $service = new TemplateService($template);
        $service->save(['id' => 1], $user, false);
    }

    /**
     * index 時に type によって共有テンプレートがマージされる
     *
     * @param TemplateIndexingType $type
     * @param MockInterface $expected
     * @param MockInterface $userTemplates
     * @param MockInterface $mergedTemplates
     * @return void
     * @dataProvider indexProvider
     */
    public function testIndex(
        TemplateIndexingType $type,
        MockInterface $expected,
        MockInterface $userTemplates,
        MockInterface $mergedTemplates
    ): void {
        /** @var User&MockInterface $user */
        $user = Mockery::mock(User::class);
        $user->shouldReceive('loadMissing');

        // $user->templates が呼ばれたら $userTemplates を返す
        $user->shouldReceive('getAttribute')->with('templates')->andReturn($userTemplates);

        // $user->setting->team->templates が呼ばれたら $shareTemplates を返す
        // それぞれのモッククラスを作ると大変なので、 $shareTemplates にすべて持たせる
        /** @var Collection<int, Template>&MockInterface $shareTemplates */
        $shareTemplates = Mockery::mock(Collection::class);
        $shareTemplates->shouldReceive('getAttributes')->with('team')->andReturn($shareTemplates);
        $shareTemplates->shouldReceive('getAttributes')->with('templates')->andReturn($shareTemplates);
        $user->shouldReceive('offsetExists')->andReturn(true);
        $user->shouldReceive('getAttribute')->with('setting')->andReturn($shareTemplates);

        // マージ時には $mergedTemplates を返す
        $userTemplates->shouldReceive('merge')->andReturn($mergedTemplates);

        // ソートについてはテストの対象としない
        $userTemplates->shouldReceive('sortByDesc')->andReturn($userTemplates);
        $mergedTemplates->shouldReceive('sortByDesc')->andReturn($mergedTemplates);

        /** @var Template&MockInterface $template */
        $template = Mockery::mock(Template::class);

        $service = new TemplateService($template);
        $this->assertSame($expected, $service->index($user, $type));
    }

    /**
     * testIndex のデータプロバイダ
     *
     * @return array<string, array<string, mixed>>
     */
    public function indexProvider(): array
    {
        /** @var Collection<int, Template>&MockInterface $userTemplates */
        $userTemplates = Mockery::mock(Collection::class);
        /** @var Collection<int, Template>&MockInterface $mergedTemplates */
        $mergedTemplates = Mockery::mock(Collection::class);

        return [
            'all の場合は他者の共有テンプレートがマージされる' => [
                'type' => TemplateIndexingType::ALL,
                'expected' => $mergedTemplates,
                'userTemplates' => $userTemplates,
                'mergedTemplates' => $mergedTemplates,
            ],
            'self-created の場合は他者の共有テンプレートがマージされない' => [
                'type' => TemplateIndexingType::SELF_CREATED,
                'expected' => $userTemplates,
                'userTemplates' => $userTemplates,
                'mergedTemplates' => $mergedTemplates,
            ],
        ];
    }
}
