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
            $table->unsignedBigInteger('user_id')->comment('ユーザーテーブルのID')->nullable()->after('id');

            $table->foreign('user_id')->references('id')->on('users')
                ->cascadeOnDelete()
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
            $table->dropConstrainedForeignId('user_id');
        });
    }
};
