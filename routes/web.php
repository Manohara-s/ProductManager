<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

//Product Module
Route::middleware(['auth', 'verified'])->prefix('product/')->group(function () {
    Route::get('index', [ProductController::class, 'index'])->name('product.index');
    Route::post('store', [ProductController::class, 'store'])->name('product.store');
});

require __DIR__.'/settings.php';
