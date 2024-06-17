<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\Template;
use App\Services\TemplateService;
use Illuminate\Foundation\Application;
use Illuminate\Support\ServiceProvider;

/**
 * アプリケーションサービスプロバイダ
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {
        $this->app->singleton(TemplateService::class, function (Application $app): TemplateService {
            /** @var Template $template */
            $template = $app->make(Template::class);
            return new TemplateService($template);
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void
    {
        //
    }
}
