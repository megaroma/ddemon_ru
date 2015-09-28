<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Dashboard extends Controller  {
    
    public function __construct()
    {
        //$this->middleware('guest', ['except' => 'getLogout']);
    }


   public function anyIndex(Request $request)
    {
    	$data['content'] = "boo";
    	return view("admin.index",$data);
    }

    public function anyTest()
    {
    
    	$data['content'] = "boo";
    	return view("test.home",$data);

    }
}