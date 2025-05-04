<?php
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\UserController;
    use App\Http\Controllers\BreedController;
    use App\Http\Controllers\DogController;
    use App\Http\Controllers\ServiceController;
    use App\Http\Controllers\AppointmentController;
    
    
    Route::resource('user', UserController::class);
    Route::resource('breed', BreedController::class);
    Route::resource('dog', DogController::class);
    Route::resource('service', ServiceController::class);
    Route::resource('appointment', AppointmentController::class);
    Route::get('/user/{id}/appointments', [UserController::class, 'getAppointmentsByUser']);
    Route::post('/user/login', [UserController::class, 'login']);