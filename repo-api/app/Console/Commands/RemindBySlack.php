<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Setting;
use App\Models\User;
use App\Models\WeeklyReportSubmissionDuration;
use App\Notifications\User\Setting\Slack\RemindMessage;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

/**
 * Slackに週報の期限を知らせる通知を行うコマンド
 */
class RemindBySlack extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'slack:remind';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Slackに週報の期限を知らせる通知を行う';

    /**
     * Execute the console command.
     *
     * @return integer
     */
    public function handle(): int
    {
        $tomorrow = Carbon::tomorrow();

        /** @var WeeklyReportSubmissionDuration|null $submissionDuration */
        $submissionDuration = WeeklyReportSubmissionDuration::whereDate('end_at', $tomorrow->format('Y-m-d'))->first();

        if ($submissionDuration === null) {
            return Command::SUCCESS;
        }

        $targetDuration = $submissionDuration->weeklyReportRequirement->weeklyReportTargetDuration;

        /** @var \Illuminate\Database\Eloquent\Collection<int, Setting> $settings */
        $settings = Setting::whereNotNull('slack_access_token')->whereNotNull('slack_user_id')->get();
        /** @var \Illuminate\Support\Collection<int, User> $users */
        $users = $settings->map(fn(Setting $setting): User => $setting->user);

        foreach ($users as $user) {
            $user->notify(new RemindMessage($targetDuration->start_at, $targetDuration->end_at));
        }

        return Command::SUCCESS;
    }
}
