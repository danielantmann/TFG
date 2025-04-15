<?php
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\UserController;
    use App\Http\Controllers\BreedController;
    use App\Http\Controllers\DogController;
    use App\Http\Controllers\ServiceController;
    use App\Http\Controllers\AppointmentController;
    
    
    Route::resource('users', UserController::class);
    Route::resource('breed', BreedController::class);
    Route::resource('dog', DogController::class);
    Route::resource('service', ServiceController::class);
    Route::resource('appointment', AppointmentController::class);
    Route::get('/users/{id}/appointments', [UserController::class, 'getAppointmentsByUser']);
    Route::post('/users/logout', [UserController::class, 'logout']);
    Route::post('/users/login', [UserController::class, 'login']);