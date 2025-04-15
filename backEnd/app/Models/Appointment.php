<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'start_date',
        'end_date',
        'notes',
        'final_price',
        'id_dog',
        'id_service',
    ];
    public function dog()
    {
        return $this->belongsTo(Dog::class, 'id_dog');
    }
    public function service()
    {
        return $this->belongsTo(Service::class, 'id_service');
    }
}
