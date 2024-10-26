# product-csv-import

A web application built with React frontend and Laravel backend that includes user authentication, product listing, and CSV import functionality.

## Project Structure

```
project/
├── frontend/     # React application
└── backend/      # Laravel API
```

## Prerequisites

- Node.js (v14 or higher)
- Docker Desktop
- WSL2 (for Windows users)
- Composer
- Git

## Frontend Setup (React)

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Backend Setup (Laravel)

### Using Laravel Sail (Recommended)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Composer dependencies:
```bash
composer install
```

3. Configure environment:
```bash
cp .env.example .env
```

4. Sail alias (Optional but recommended):
```bash
alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'
```

5. Start the Docker containers:
```bash
./vendor/bin/sail up
# Or if you've set up the alias:
sail up
```

6. Generate application key:
```bash
sail artisan key:generate
```

7. Run migrations:
```bash
sail artisan migrate
```

The API will be available at `http://localhost:80`

### Alternative Setup (Without Docker)

You can also run the Laravel project without Docker, although using Sail is recommended for consistency across development environments.

1. Install dependencies:
```bash
composer install
```

2. Configure environment:
```bash
cp .env.example .env
```

3. Generate application key:
```bash
php artisan key:generate
```

4. Run migrations:
```bash
php artisan migrate
```

5. Start the development server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

**Note**: While `php artisan serve` works for Laravel projects created with Sail, it's recommended to use Sail to ensure consistency with the Docker environment and avoid potential configuration mismatches. If you choose to use `php artisan serve`, you'll need to update the API base URL in your frontend configuration:

1. Update the API base URL in `/frontend/src/services/api.js`:
```javascript
// When using Sail (Docker)
const API_BASE_URL = 'http://localhost:80/api';

// When using php artisan serve
const API_BASE_URL = 'http://localhost:8000/api';