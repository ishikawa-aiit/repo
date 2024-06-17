<?php

declare(strict_types=1);

namespace App\Notifications\User\Setting\Slack;

use App\Channels\SlackAPIChannel;
use Carbon\Carbon;
use Illuminate\Notifications\Notification;

/**
 * リマインド通知
 */
class RemindMessage extends Notification implements SendableToSlackAPI
{
    /**
     * コンストラクタ
     *
     * @param Carbon $startAt 報告週の初めの日にち
     * @param Carbon $endAt   報告週の終わりの日にち
     */
    public function __construct(private readonly Carbon $startAt, private readonly Carbon $endAt)
    {
    }

    /**
     * 通知チャンネルを取得します
     *
     * @return array<int, class-string>
     */
    public function via(): array
    {
        return [SlackAPIChannel::class];
    }

    /**
     * Slack APIに通知するメッセージを取得します
     *
     * @return string 通知するメッセージ
     */
    public function toSlackAPI(): string
    {
        $startAt = $this->startAt->format('m/d');
        $endAt = $this->endAt->format('m/d');

        return <<<MESSAGE
               {$startAt} ~ {$endAt} の活動報告が受付終了間近となりました。
               manabaへの提出は完了していますでしょうか。

               https://manaba.aiit.ac.jp/ct/course_66309
               MESSAGE;
    }
}
