<?php
namespace App\DB;

use Illuminate\Database\Eloquent\Model;

class Role extends Model {

	protected $table = 'roles';
	protected $fillable = ['name'];

    public function users()
    {
        return $this->belongsToMany('App\User','users_roles');
    }

}