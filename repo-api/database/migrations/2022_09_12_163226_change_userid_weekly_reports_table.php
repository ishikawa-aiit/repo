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
            $table->unsignedBigInteger('user_id')->nullable(false)->change();
            $table->dropColumn('reporter');
        });
    }

    /**
     * Reverse the migrations.
     *s
     * @return void
     */
    public function down(): void
    {
        Schema::table('weekly_reports', function (Blueprint $table): void {
            $table->string('reporter')->comment('報告者')->default('未記入')->after('user_id');
            $table->unsignedBigInteger('user_id')->nullable()->change();
        });
    }
};
