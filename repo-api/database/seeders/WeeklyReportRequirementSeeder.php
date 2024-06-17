<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\WeeklyReportRequirement;
use App\Models\WeeklyReportSubmissionDuration;
use App\Models\WeeklyReportTargetDuration;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

/**
 * シーダー
 */
class WeeklyReportRequirementSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        $reportWeekRequirements = [
            [
                'targetStart' => '2022-04-04',
                'targetEnd' => '2022-04-09',
                'submissionStart' => '2022-04-10',
                'submissionEnd' => '2022-04-17'
            ],
            [
                'targetStart' => '2022-04-11',
                'targetEnd' => '2022-04-16',
                'submissionStart' => '2022-04-17',
                'submissionEnd' => '2022-04-24'
            ],
            [
                'targetStart' => '2022-04-18',
                'targetEnd' => '2022-04-23',
                'submissionStart' => '2022-04-24',
                'submissionEnd' => '2022-05-01'
            ],
            [
                'targetStart' => '2022-04-25',
                'targetEnd' => '2022-04-30',
                'submissionStart' => '2022-05-01',
                'submissionEnd' => '2022-05-08'
            ],
            [
                'targetStart' => '2022-05-02',
                'targetEnd' => '2022-05-07',
                'submissionStart' => '2022-05-08',
                'submissionEnd' => '2022-05-15'
            ],
            [
                'targetStart' => '2022-05-09',
                'targetEnd' => '2022-05-14',
                'submissionStart' => '2022-05-15',
                'submissionEnd' => '2022-05-22'
            ],
            [
                'targetStart' => '2022-05-16',
                'targetEnd' => '2022-05-21',
                'submissionStart' => '2022-05-22',
                'submissionEnd' => '2022-05-29'
            ],
            [
                'targetStart' => '2022-05-23',
                'targetEnd' => '2022-05-28',
                'submissionStart' => '2022-05-29',
                'submissionEnd' => '2022-06-05'
            ],
            [
                'targetStart' => '2022-05-30',
                'targetEnd' => '2022-06-04',
                'submissionStart' => '2022-06-05',
                'submissionEnd' => '2022-06-12'
            ],
            [
                'targetStart' => '2022-06-06',
                'targetEnd' => '2022-06-11',
                'submissionStart' => '2022-06-12',
                'submissionEnd' => '2022-06-19'
            ],
            [
                'targetStart' => '2022-06-13',
                'targetEnd' => '2022-06-18',
                'submissionStart' => '2022-06-19',
                'submissionEnd' => '2022-06-26'
            ],
            [
                'targetStart' => '2022-06-20',
                'targetEnd' => '2022-06-25',
                'submissionStart' => '2022-06-26',
                'submissionEnd' => '2022-07-03'
            ],
            [
                'targetStart' => '2022-06-27',
                'targetEnd' => '2022-07-02',
                'submissionStart' => '2022-07-03',
                'submissionEnd' => '2022-07-10'
            ],
            [
                'targetStart' => '2022-07-04',
                'targetEnd' => '2022-07-09',
                'submissionStart' => '2022-07-10',
                'submissionEnd' => '2022-07-17'
            ],
            [
                'targetStart' => '2022-07-11',
                'targetEnd' => '2022-07-16',
                'submissionStart' => '2022-07-17',
                'submissionEnd' => '2022-07-24'
            ],
            [
                'targetStart' => '2022-07-18',
                'targetEnd' => '2022-07-23',
                'submissionStart' => '2022-07-24',
                'submissionEnd' => '2022-07-31'
            ],
            [
                'targetStart' => '2022-07-25',
                'targetEnd' => '2022-07-30',
                'submissionStart' => '2022-07-31',
                'submissionEnd' => '2022-08-07'
            ],
            [
                'targetStart' => '2022-08-01',
                'targetEnd' => '2022-08-03',
                'submissionStart' => '2022-08-04',
                'submissionEnd' => '2022-08-14'
            ],
            [
                'targetStart' => '2022-10-03',
                'targetEnd' => '2022-10-08',
                'submissionStart' => '2022-10-09',
                'submissionEnd' => '2022-10-16'
            ],
            [
                'targetStart' => '2022-10-10',
                'targetEnd' => '2022-10-15',
                'submissionStart' => '2022-10-16',
                'submissionEnd' => '2022-10-23'
            ],
            [
                'targetStart' => '2022-10-17',
                'targetEnd' => '2022-10-22',
                'submissionStart' => '2022-10-23',
                'submissionEnd' => '2022-10-30'
            ],
            [
                'targetStart' => '2022-10-24',
                'targetEnd' => '2022-10-29',
                'submissionStart' => '2022-10-30',
                'submissionEnd' => '2022-11-06'
            ],
            [
                'targetStart' => '2022-10-31',
                'targetEnd' => '2022-11-05',
                'submissionStart' => '2022-11-06',
                'submissionEnd' => '2022-11-13'
            ],
            [
                'targetStart' => '2022-11-07',
                'targetEnd' => '2022-11-12',
                'submissionStart' => '2022-11-13',
                'submissionEnd' => '2022-11-20'
            ],
            [
                'targetStart' => '2022-11-14',
                'targetEnd' => '2022-11-19',
                'submissionStart' => '2022-11-20',
                'submissionEnd' => '2022-11-27'
            ],
            [
                'targetStart' => '2022-11-21',
                'targetEnd' => '2022-11-26',
                'submissionStart' => '2022-11-27',
                'submissionEnd' => '2022-12-04'
            ],
            [
                'targetStart' => '2022-12-01',
                'targetEnd' => '2022-12-03',
                'submissionStart' => '2022-12-04',
                'submissionEnd' => '2022-12-11'
            ],
            [
                'targetStart' => '2022-12-05',
                'targetEnd' => '2022-12-10',
                'submissionStart' => '2022-12-11',
                'submissionEnd' => '2022-12-18'
            ],
            [
                'targetStart' => '2022-12-12',
                'targetEnd' => '2022-12-17',
                'submissionStart' => '2022-12-18',
                'submissionEnd' => '2022-12-25'
            ],
            [
                'targetStart' => '2022-12-19',
                'targetEnd' => '2022-12-24',
                'submissionStart' => '2022-12-25',
                'submissionEnd' => '2023-01-04'
            ],
            [
                'targetStart' => '2022-12-26',
                'targetEnd' => '2022-12-28',
                'submissionStart' => '2022-12-29',
                'submissionEnd' => '2023-01-11'
            ],
            [
                'targetStart' => '2023-01-04',
                'targetEnd' => '2023-01-07',
                'submissionStart' => '2023-01-08',
                'submissionEnd' => '2023-01-15'
            ],
            [
                'targetStart' => '2023-01-09',
                'targetEnd' => '2023-01-14',
                'submissionStart' => '2023-01-15',
                'submissionEnd' => '2023-01-22'
            ],
            [
                'targetStart' => '2023-01-16',
                'targetEnd' => '2023-01-21',
                'submissionStart' => '2023-01-22',
                'submissionEnd' => '2023-01-29'
            ],
            [
                'targetStart' => '2023-01-23',
                'targetEnd' => '2023-01-28',
                'submissionStart' => '2023-01-29',
                'submissionEnd' => '2023-02-05'
            ],
            [
                'targetStart' => '2023-01-30',
                'targetEnd' => '2023-01-31',
                'submissionStart' => '2023-02-01',
                'submissionEnd' => '2023-02-08'
            ],
        ];

        \DB::transaction(function () use ($reportWeekRequirements): void {
            foreach ($reportWeekRequirements as $requirement) {
                $weeklyReportTarget = WeeklyReportTargetDuration::firstOrCreate([
                    'start_at' => new Carbon($requirement['targetStart']),
                    'end_at' => new Carbon($requirement['targetEnd']),
                ]);
                $weeklyReportSubmission = WeeklyReportSubmissionDuration::firstOrCreate([
                    'start_at' => new Carbon($requirement['submissionStart']),
                    'end_at' => new Carbon($requirement['submissionEnd']),
                ]);

                WeeklyReportRequirement::firstOrCreate([
                    'weekly_report_target_duration_id' => $weeklyReportTarget->id,
                    'weekly_report_submission_duration_id' => $weeklyReportSubmission->id,
                ]);
            }
        });
    }
}
