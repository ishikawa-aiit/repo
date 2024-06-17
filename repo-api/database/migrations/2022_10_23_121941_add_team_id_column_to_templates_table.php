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
        Schema::table('templates', function (Blueprint $table): void {
            $table->unsignedBigInteger('team_id')->nullable()->after('user_id')->comment('プロジェクトチームテーブルのID');
            $table->foreign('team_id')->references('id')->on('teams')->cascadeOnUpdate()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('templates', function (Blueprint $table): void {
            $table->dropForeign(['team_id']);
            $table->dropColumn('team_id');
        });
    }
};
