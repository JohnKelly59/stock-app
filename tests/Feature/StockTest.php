<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class StockTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_users_can_visit_dashboard()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertOk();
    }

    public function test_authenticated_users_can_fetch_stock_data()
    {
        $user = User::factory()->create();

        Http::fake([
            'finnhub.io/*' => Http::response([
                'o' => 150.00,
                'c' => 155.00,
                'h' => 160.00,
                'l' => 145.00
            ], 200),
        ]);

        $response = $this->actingAs($user)->post('/stock/fetch', [
            'symbol' => 'AAPL',
        ]);

        $response->assertRedirectToRoute('dashboard');
        
        $response = $this->actingAs($user)->get('/dashboard');
        
        $response->assertInertia(fn ($page) => $page
            ->component('Dashboard')
            ->where('stock.symbol', 'AAPL')
            ->where('stock.open', 150) 
        );
    }

    public function test_guests_cannot_fetch_stock_data()
    {
        $response = $this->post('/stock/fetch', ['symbol' => 'AAPL']);
        $response->assertRedirect('/login');
    }
}