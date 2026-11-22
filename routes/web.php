<?php

use Illuminate\Support\Facades\Route;

// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);

Route::get('robots.txt', [\App\Http\Controllers\SeoController::class, 'robots']);
Route::get('sitemap.xml', [\App\Http\Controllers\SeoController::class, 'sitemap']);

Route::post('kontakt', \App\Http\Controllers\ContactController::class)->middleware('throttle:5,10');
