<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('weekly_report_requirements', function (Blueprint $table): void {
            $table->id();
            $table->unsignedBigInteger('weekly_report_target_duration_id')
                ->comment('週報の対象の期間のID')
                ->unique('target_duration_id_unique');
            $table->unsignedBigInteger('weekly_report_submission_duration_id')
                ->comment('週報の提出の期間のID')
                ->unique('submission_duration_id');

            $table->foreign('weekly_report_target_duration_id', 'target_duration_id_foreign')
                ->references('id')
                ->on('weekly_report_target_durations')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreign('weekly_report_submission_duration_id', 'submission_duration_id_foreign')
                ->references('id')
                ->on('weekly_report_submission_durations')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('weekly_report_requirements');
    }
};
