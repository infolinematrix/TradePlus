<?php

use Illuminate\Database\Seeder;

class UsersProfileTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        //\DB::table('users_profile')->delete();

      /*  SINGLE DATA

      \DB::table('users_profile')->insert(array (
            0 =>
                array (
                   'user_id' => 1,
                    'phone' => '+91 983293116',
                    'gender' => 'Male',
                    'newsletter' => 1,
                    'address' => 'Hakim Para, Siliguri',
                    'pincode' => 734001,
                    'region' => 'West Bengal',
                    'city' => 'Siliguri'
                ),
        ));

      */
        /*Multiple Data*/

        $profiles = [

            [
                'user_id' => 1,
                'phone' => '+91 983293116',
                'gender' => 'Male',
                'newsletter' => 1,
                'address' => 'Hakim Para, Siliguri',
                'pincode' => 734001,
                'region' => 'West Bengal',
                'city' => 'Siliguri'
            ],
            [
                'user_id' => 158,
                'phone' => '+91 983293116',
                'gender' => 'Male',
                'newsletter' => 1,
                'address' => 'Hakim Para, Siliguri',
                'pincode' => 734001,
                'region' => 'West Bengal',
                'city' => 'Siliguri'
            ],
            [
                'user_id' => 160,
                'phone' => '+91 8617518041',
                'gender' => 'Male',
                'newsletter' => 1,
                'address' => 'Shibmandir, Siliguri',
                'pincode' => 734013,
                'region' => 'West Bengal',
                'city' => 'Siliguri'
            ]

        ];

        foreach ($profiles as $profile)
            DB::table('users_profile')->insert($profile);



    }
}
