<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dog extends Model
{
    protected $fillable = [
        'name',
        'birth_date',
        'notes',
        'id_user',
        'id_breed',
    ];
    public function breed()
    {
        return $this->belongsTo(Breed::class, 'id_breed');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'id_dog');
    }    
}
