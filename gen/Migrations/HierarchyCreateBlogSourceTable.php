<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Migrations;


use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
<<<<<<< HEAD
use Nuclear\Hierarchy\Contract\Migration\MigrationContract;
=======
use Reactor\Hierarchy\Contract\Migration\MigrationContract;
>>>>>>> e674ff3344db0b34caa2f77e15d33931c071ddcf

class HierarchyCreateBlogSourceTable extends Migration implements MigrationContract {

    /**
     * Run the migrations.
     */
    public function up()
    {
        \Schema::create('ns_blogs', function (Blueprint $table)
        {
            $table->integer('id')
                ->unsigned();
            $table->integer('node_id')
                ->unsigned()->nullable();

            $table->primary('id');
            $table->foreign('id')
                ->references('id')
                ->on('node_sources')
                ->onDelete('cascade');

            $table->foreign('node_id')
                ->references('id')
                ->on('nodes')
                ->onDelete('cascade')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        \Schema::drop('ns_blogs');
    }

}