<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;


use App\Http\Requests;
use App\Http\Controllers\Controller;

class Index extends \DD\Crud\CrudController  // Controller
{
    /**
     * Display a listing of the resource.
     *
     * 
        @return Response
     */

    public $format = array();
    public $filters = array();

    public function __construct()   {

    $this->format['App_User'] = array(
                'id' => array(
                    'title' => 'ID',
                    'value' => '{id}'
                ),  
              'name' => array(
                    'title' => 'Name',
                    'value' => '{name}'
                )                
                );

        $this->filters['App_User'] = array(
        'name' => array(
            'title' => 'Name',
            'selectors' => '=,!=,like,not_like,start_like,end_like',
            'type' => 'text'

            )
        );

    }

    public function anyIndex(Request $request)
    {
        /*
        echo \URL::full();
        echo "<br>";
        $pag = new Paginator( array(10,10,20,10,30,10) ,60, 6, 1);
        $pag->fragment("kaka");
        echo $pag->render();

        echo "<br>";

        echo "Page".$pag->currentPage()." of ".$pag->lastPage().", items ".
          $pag->firstItem()." to ". $pag->lastItem(). " of ".$pag->total();

        exit;
        */

        $data = array(
            'crud_title' => 'Users',
            'crud_model' => 'App_User',
            'crud_sort' => '',
            'crud_order' => '',
            'crud_page' => '1',
    
                'crud_auto_filter' => true,
                'crud_filter_button' => true,
                'crud_show_filters' => true,

            'filters' => $this->filters['App_User']
            );

        if($res = $this->initCrud($request)) return $res;


        $data2['content'] = view('Crud::view',$data);

        $data2['title'] = "DDemon: Home";
        return view('index',$data2);
        //
    }

    public  function getTest(Request $request)
    {
   
        return $this->boo();

        echo "<br>Boo<br>";
        $test = \app\DB\Role::class;
        echo $test;
        exit;
        $user = \Auth::user();
        foreach ($user->roles as $role) {
            echo $role->name." <br>";
        }
        if($user->hasRole('User')) {
            echo "hasRole";
        }
        exit;
        $data['title'] = "DDemon: Test";
        return view('index',$data);
    }

}
