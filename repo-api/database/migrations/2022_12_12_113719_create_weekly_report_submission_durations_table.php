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
        Schema::create('weekly_report_submission_durations', function (Blueprint $table): void {
            $table->id();
            $table->date('start_at')->comment('週報提出の開始日')->nullable(false);
            $table->date('end_at')->comment('週報提出の終了日')->nullable(false);
            $table->timestamps();

            $table->unique(['start_at', 'end_at'], 'unique_start_at_end_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('weekly_report_submission_durations');
    }
};
