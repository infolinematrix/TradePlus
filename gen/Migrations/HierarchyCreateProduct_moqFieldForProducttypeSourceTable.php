<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Migrations;


use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Reactor\Hierarchy\Contract\Migration\MigrationContract;

class HierarchyCreateProduct_moqFieldForProducttypeSourceTable extends Migration implements MigrationContract {

    /**
     * Run the migrations.
     */
    public function up()
    {
        \Schema::table('ns_producttypes', function (Blueprint $table)
        {
            $table->integer('product_moq')->nullable();

                    });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        \Schema::table('ns_producttypes', function (Blueprint $table)
        {
            $table->dropColumn('product_moq');
        });
    }

}