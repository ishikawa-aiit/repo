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
            $table->unsignedBigInteger('weekly_report_requirement_id')
                ->comment('週報要件のID')
                ->nullable()
                ->after('user_id');
            $table->foreign('weekly_report_requirement_id')
                ->references('id')
                ->on('weekly_report_requirements')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
            $table->string('report_week')->nullable()->change();
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
            $table->dropConstrainedForeignId('weekly_report_requirement_id');
            $table->string('report_week')->nullable(false)->change();
        });
    }
};
