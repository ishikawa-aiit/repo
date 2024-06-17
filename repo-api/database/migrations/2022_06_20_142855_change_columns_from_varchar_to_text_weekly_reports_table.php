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
            $table->text('done_activity')->default(null)->change();
            $table->text('todo_activity')->default(null)->change();
            $table->text('solution')->default(null)->change();
            $table->text('event')->default(null)->change();
            $table->text('remark')->default(null)->change();
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
            $table->string('done_activity')->default('未記入')->change();
            $table->string('todo_activity')->default('未記入')->change();
            $table->string('solution')->default('未記入')->change();
            $table->string('event')->default('未記入')->change();
            $table->string('remark')->default('未記入')->change();
        });
    }
};
