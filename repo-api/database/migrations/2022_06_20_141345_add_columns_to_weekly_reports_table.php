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
            $table->string('done_activity')->comment('今週の活動と成果の実績')->default('未記入')->after('activity_time');
            $table->string('todo_activity')->comment('来週の活動と成果の予定')->default('未記入')->after('done_activity');
            $table->string('solution')->comment('課題と解決策')->default('未記入')->after('todo_activity');
            $table->string('event')->comment('できごと・気づき')->default('未記入')->after('solution');
            $table->string('remark')->comment('特記事項')->default('未記入')->after('event');
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
            $table->dropColumn('remark');
            $table->dropColumn('event');
            $table->dropColumn('solution');
            $table->dropColumn('todo_activity');
            $table->dropColumn('done_activity');
        });
    }
};
