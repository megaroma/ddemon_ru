<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Validator;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class DDAuth extends Controller
{

	public function getTest(Request $request) {
		$email = $request->input('dd-auth-email','');



        $admin =  array(
            'name' => "Admin",
            'email' => "admin@admin.ru",
            'password' =>  \Hash::make("admin")

            );
       User::create($admin);

		return "boo".$email;
	}

    public function postLogin(Request $request) {
    	$email = $request->input('dd-auth-email','');
    	$password = $request->input('dd-auth-password','');
    	$remember = $request->has('dd-auth-remember');
        $data = array();
        if (\Auth::attempt(['email' => $email, 'password' => $password], $remember)) {
            $data['status'] = "ok";
        } else {
             sleep(2);
            $data['status'] = 'error';
        }
        return response()->json($data);
    }

    public function getLogout() {
        \Auth::logout();
        $data['status'] = "ok";
        return response()->json($data);
    }

}
