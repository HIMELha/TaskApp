<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/verifyPersonalToken', [AuthController::class, 'verifyLogin']);

Route::get('/tasks/{name?}', [TaskController::class, 'tasks']);

Route::post('/store', [TaskController::class, 'store']);
Route::get('/edit/{id}', [TaskController::class, 'edit']);
Route::put('/update/{id}', [TaskController::class, 'update']);
Route::delete('/delete/{id}', [TaskController::class, 'delete']);

Route::post('/uploadImage', [ImageController::class, 'uploadImage']);

