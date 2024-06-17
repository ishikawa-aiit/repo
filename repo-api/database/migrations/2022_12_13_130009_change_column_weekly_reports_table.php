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
        Schema::table('weekly_reports', function (Blueprint $table): void {
            $table->dropForeign(['weekly_report_requirement_id']);
        });

        Schema::table('weekly_reports', function (Blueprint $table): void {
            $table->dropColumn('report_week');
            $table->unsignedBigInteger('weekly_report_requirement_id')->nullable(false)->change();
            $table->foreign('weekly_report_requirement_id')
                ->references('id')
                ->on('weekly_report_requirements')
                ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('weekly_reports', function (Blueprint $table): void {
            $table->string('report_week')->comment('報告週')->default('')->after('weekly_report_requirement_id');
            $table->unsignedBigInteger('weekly_report_requirement_id')->nullable()->change();
        });
    }
};
