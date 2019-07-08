<?php
// WARNING! THIS IS A GENERATED FILE, PLEASE DO NOT EDIT!

namespace gen\Migrations;


use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Reactor\Hierarchy\Contract\Migration\MigrationContract;

class HierarchyCreatePlan_priceFieldForPlanSourceTable extends Migration implements MigrationContract {

    /**
     * Run the migrations.
     */
    public function up()
    {
        \Schema::table('ns_plans', function (Blueprint $table)
        {
            $table->string('plan_price')->nullable();

                    });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        \Schema::table('ns_plans', function (Blueprint $table)
        {
            $table->dropColumn('plan_price');
        });
    }

}