<?php

use App\Http\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/products', function (Request $request): mixed {
    return ProductService::getProducts();
})->middleware('auth:sanctum');