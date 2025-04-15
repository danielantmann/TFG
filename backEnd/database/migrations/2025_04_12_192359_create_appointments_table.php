<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->text('notes')->nullable();
            $table->decimal('final_price', 8, 2);
            $table->unsignedBigInteger('id_dog');
            $table->unsignedBigInteger('id_service');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('id_dog')->references('id')->on('dogs')->onDelete('cascade');
            $table->foreign('id_service')->references('id')->on('services')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
