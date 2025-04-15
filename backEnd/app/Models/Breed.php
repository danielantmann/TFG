<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Breed extends Model
{
    protected $fillable = [
        'name',
        'size',
    ];
    public function dogs()
    {
        return $this->hasMany(Dog::class, 'id_breed');
    }
    
}
