<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\User;
use App\DB\Role;

class UserRoles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       $admin =  array(
            'name' => "megaspy",
            'email' => "darkromanovich@gmail.com",
            'password' =>  \Hash::make("sz840mega911R")
            );
       $user = User::create($admin);

       $admin_role = array(
            'name' => "admin"
        );
       $role = Role::create($admin_role);
       $user->roles()->attach($role->id);

       $role = Role::create(array('name' => 'user'));
       $user->roles()->attach($role->id);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
