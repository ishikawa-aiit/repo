<?php

declare(strict_types=1);

use App\Http\Controllers\Auth;
use App\Http\Controllers\Team;
use App\Http\Controllers\Template;
use App\Http\Controllers\Test;
use App\Http\Controllers\User;
use App\Http\Controllers\WeeklyReport;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('health', fn(): string => '');
Route::get('ping', fn(): JsonResponse => response()->json(['pong']));

Route::prefix('auth')->name('auth.')->group(function (): void {
    Route::post('redirect', Auth\GetAuthUrlController::class)->name('redirect');
    Route::post('login', Auth\LoginController::class)->name('login');
});

Route::middleware(['auth:sanctum'])->group(function (): void {
    Route::prefix('users')->name('users.')->group(function (): void {
        Route::get('me', User\ShowMeController::class)->name('me');
        Route::prefix('my-setting')->group(function (): void {
            Route::patch('/', User\Setting\PatchController::class)->name('team.setting');
            Route::post('slack', User\Setting\Slack\IntegrateController::class)->name('slack.integrate');
        });
    });
    Route::prefix('weekly-reports')->name('weekly-reports.')->group(function (): void {
        Route::get('/', WeeklyReport\IndexController::class)->name('index');
        Route::post('/', WeeklyReport\StoreController::class)->name('store');
        Route::get('requirements', WeeklyReport\Requirement\IndexController::class)->name('requirements.index');
    });
    Route::prefix('templates')->name('templates.')->group(function (): void {
        Route::get('/', Template\IndexController::class)->name('index');
        Route::post('/', Template\StoreController::class)->name('store');
    });
    Route::prefix('teams')->name('teams.')->group(function (): void {
        Route::get('/', Team\IndexController::class)->name('index');
    });
});

Route::post('auth/login/test', Test\LoginController::class)->name('auth.login.test');
