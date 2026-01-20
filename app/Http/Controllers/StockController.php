<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stock' => session('stock')
        ]);
    }

    public function fetch(Request $request)
    {
        $validated = $request->validate([
            'symbol' => ['required', 'string', 'max:5', 'alpha'],
        ]);

        $symbol = strtoupper($validated['symbol']);
        $apiKey = env('FINNHUB_API_KEY');

        $response = Http::get('https://finnhub.io/api/v1/quote', [
            'symbol' => $symbol,
            'token' => $apiKey,
        ]);

        if ($response->failed()) {
            return back()->withErrors(['symbol' => 'Unable to connect to stock service.']);
        }

        $data = $response->json();

        if (!isset($data['o']) || $data['o'] == 0) {
             return back()->withErrors(['symbol' => "Stock symbol '$symbol' not found."]);
        }

        return to_route('dashboard')->with('stock', [
            'symbol' => $symbol,
            'open' => $data['o'],
            'current' => $data['c'],
            'high' => $data['h'],
            'low' => $data['l'],
        ]);
    }
}