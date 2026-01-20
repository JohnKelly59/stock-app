# Batcomputer Stock App

## Tech Stack

* **Backend:** Laravel 12 (PHP 8.2+)
* **Frontend:** React 18, Inertia.js
* **Styling:** Tailwind CSS, Material UI (MUI)
* **Database:** PostgreSQL
* **Authentication:** Laravel Breeze
* **Testing:** PHPUnit
* **External API:** Finnhub.io

---

## Prerequisites

* **PHP 8.2** or higher
* **Composer** (PHP Dependency Manager)
* **Node.js & npm** (JavaScript Runtime)
* **PostgreSQL** (Database Server)
* **Git**

---

## Installation Guide

### 1. Clone the Repository

### 2. Install Backend Dependencies
```bash
composer install
```

### 3. Install Frontend Dependencies
```bash
npm install
```

### 4. Configure Environment
Duplicate the example environment file and open it for configuration:

```bash
cp .env.example .env
```
Open `.env` in your text editor and update the following:

A. Database Connection: Set this to match your local PostgreSQL credentials.

```ini
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=stock_app
DB_USERNAME=your_postgres_user
DB_PASSWORD=your_postgres_password
```

B. Add your Finnhub API key.

```ini
FINNHUB_API_KEY=your_api_key_here
```

### 5. Generate Application Key
```bash
php artisan key:generate
```

### 6. Setup the Database
Ensure your PostgreSQL server is running and you have created an empty database named `stock_app`. Then run the migrations:

```bash
php artisan migrate
```

## Running the Application
You need two terminal windows open to run the application locally.

Terminal 1: Frontend (Vite) Compiles React assets and handles hot-reloading.

```bash
npm run dev
```

Terminal 2: Backend (Laravel) Starts the local development server.

```bash
php artisan serve
```

Access the App: Open your secure link: http://localhost:8000

## Running Tests
Note: If you are on Linux/WSL, ensure you have the php-sqlite3 driver installed.

Run the tests:

```bash
php artisan test
```
