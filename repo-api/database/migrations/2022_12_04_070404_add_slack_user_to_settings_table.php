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
        Schema::table('settings', function (Blueprint $table): void {
            $table->string('slack_access_token')->comment('Slack APIへのアクセストークン')->nullable()->after('team_id');
            $table->string('slack_user_id')->comment('Slack APIのユーザーID')->nullable()->after('slack_access_token');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table): void {
            $table->dropColumn('slack_access_token');
            $table->dropColumn('slack_user_id');
        });
    }
};
