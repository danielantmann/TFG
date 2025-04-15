<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'name',
        'last_name',
        'email',
        'password',
        'role',
        'phone_number',
    ];
    public function dogs()
    {
        return $this->hasMany(Dog::class, 'id_user');
    }
    public function appointments()
    {
        return $this->hasManyThrough(Appointment::class, Dog::class, 'id_user', 'id_dog');
    }
}
