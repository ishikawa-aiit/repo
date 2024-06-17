<?php

declare(strict_types=1);

namespace App\Services\Test;

use App\Models\Setting;
use App\Models\Template;
use App\Models\User;
use App\Models\WeeklyReport;
use Illuminate\Database\Connection;

/**
 * テスト用のログイン処理
 */
class LoginService
{
    /**
     * コンストラクタ
     *
     * @param Connection $db
     * @param User $userRepository
     * @param WeeklyReport $weeklyReportRepository
     * @param Template $templateRepository
     * @param Setting $settingRepository
     */
    public function __construct(
        private readonly Connection $db,
        private readonly User $userRepository,
        private readonly WeeklyReport $weeklyReportRepository,
        private readonly Template $templateRepository,
        private readonly Setting $settingRepository,
    ) {
    }

    /**
     * テスト用のトークンを生成して返します。
     *
     * @param string $email
     * @param boolean $shouldResetDB
     * @param boolean $shouldSetSlack
     * @return string
     * @throws \Throwable トランザクション失敗時
     */
    public function __invoke(string $email, bool $shouldResetDB, bool $shouldSetSlack): string
    {
        /** @var string $token */
        $token = $this->db->transaction(function () use ($email, $shouldResetDB, $shouldSetSlack): string {
            if ($shouldResetDB) {
                $this->resetDB();
            }

            /** @var User $user */
            $user = $this->userRepository->firstOrCreate(['email' => $email], ['name' => 'テストユーザー']);

            if ($shouldSetSlack) {
                $this->setSlack($user);
            }

            return $user->createToken('')->plainTextToken;
        });

        return $token;
    }

    /**
     * DBの中身をリセットします。
     *
     * @return void
     * @throws \Throwable トランザクション失敗時
     */
    private function resetDB(): void
    {
        $this->db->transaction(function (): void {
            $this->settingRepository->query()->delete();
            $this->weeklyReportRepository->query()->delete();
            $this->templateRepository->query()->delete();
            $this->userRepository->query()->delete();
        });
    }

    /**
     * Slack 設定を行います。
     *
     * @param User $user
     * @return void
     */
    private function setSlack(User $user): void
    {
        $setting = $user->setting ?? $this->settingRepository->newInstance();

        $setting->slack_access_token = 'dummy';
        $setting->slack_user_id = 'dummy';

        $user->setting()->save($setting);
    }
}
