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
        Schema::create('templates', function (Blueprint $table): void {
            $table->id();
            $table->unsignedBigInteger('user_id')->comment('ユーザーテーブルのID');
            $table->string('name')->comment('テンプレート名');
            $table->text('activity_time')->nullable()->comment('活動時間');
            $table->text('done_activity')->nullable()->comment('今週の活動と成果の実績');
            $table->text('todo_activity')->nullable()->comment('来週の活動と成果の予定');
            $table->text('solution')->nullable()->comment('課題と解決策');
            $table->text('event')->nullable()->comment('できごと・気づき');
            $table->text('remark')->nullable()->comment('特記事項');

            $table->foreign('user_id')->references('id')->on('users')
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
        Schema::dropIfExists('templates');
    }
};
