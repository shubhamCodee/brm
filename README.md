# BRM - A Modern Multi-Tenant CRM

BRM is a powerful, modern Customer Relationship Management (CRM) application built on the Laravel framework. It serves as a practical demonstration of advanced, senior-level web development concepts, including a robust multi-tenant architecture, a secure API, and real-time frontend notifications.

## Key Architectural Pillars

This project was built with a focus on clean, scalable, and maintainable code, adhering to modern best practices.

-   **Multi-Tenancy:** The application is built on a single-database, multi-tenant architecture. All data is automatically and securely scoped to the authenticated user's tenant, making it suitable for a SaaS (Software as a Service) environment.
-   **Repository Pattern:** The data layer is fully decoupled from the controllers through the use of the Repository Pattern. This promotes a clean separation of concerns and makes the application easy to test and maintain.
-   **Service-Oriented:** Complex business logic, such as mass actions and tenant provisioning, is encapsulated in dedicated Service Classes, keeping controllers lightweight and focused on handling HTTP requests.
-   **API First:** The application includes a secure, stateless API built with Laravel Passport, enabling third-party integrations and headless operations.

## Core Features

-   **Full CRUD Functionality:** Complete Create, Read, Update, and Delete capabilities for key CRM resources: Users, Organizations, and Contacts.
-   **Real-Time Notifications:** A real-time notification system built with Pusher and Laravel Echo. Events are dispatched to a queue and broadcast to the frontend, providing instant user feedback.
-   **Mass Update & Mass Delete:** Efficiently perform bulk actions on multiple records at once through a clean, modal-driven UI.
-   **Secure API with Laravel Passport:** A comprehensive set of API endpoints for all resources, protected by OAuth2 authentication. The API supports pagination and follows RESTful conventions.
-   **Advanced Queue Management:** Utilizes Laravel's queue system for background jobs (like notifications) and includes robust handling for failed jobs.
-   **Automated Scheduled Tasks:** A tenant-aware command for generating daily reports is managed by Laravel's Scheduler and a server-side Cron job, demonstrating professional automation.
-   **Custom Artisan Commands:** Administrative tasks, such as creating new tenants, are handled through custom, reusable Artisan commands.

## Tech Stack

### Backend
-   **Framework:** Laravel 12.x
-   **API Authentication:** Laravel Passport (OAuth2)
-   **Database:** MariaDB
-   **Queues:** Database Driver (Configured for Redis)
-   **Real-Time Events:** Pusher

### Frontend
-   **Framework:** Inertia.js with React + TypeScript
-   **Styling:** Tailwind CSS
-   **Real-Time Listening:** Laravel Echo & Pusher-JS
-   **UI Notifications:** `react-hot-toast`

## Local Development Setup

### Prerequisites
-   PHP 8.2+
-   Node.js & NPM
-   Composer
-   MariaDB (or MySQL)
-   Redis Server

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/shubhamCodee/brm.git
    cd brm
    ```

2.  **Install dependencies:**
    ```bash
    composer install
    npm install
    ```

3.  **Setup environment file:**
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4.  **Configure `.env` file:**
    -   Set up your `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` credentials.
    -   Configure your `PUSHER_APP_ID`, `PUSHER_APP_KEY`, etc.
    -   Ensure `SESSION_DRIVER` is set to `redis`.

5.  **Create database and run migrations:**
    -   Create your database in MariaDB.
    -   Run the migrations and seed the database with the default tenant and sample data:
    ```bash
    php artisan migrate:fresh --seed
    ```

6.  **Set up Laravel Passport:**
    ```bash
    php artisan passport:install
    ```

7.  **Run the development servers:**
    -   In one terminal, start the PHP server:
    ```bash
    php artisan serve
    ```
    -   In another terminal, start the Vite server:
    ```bash
    npm run dev
    ```

8.  **Run the queue worker:**
    -   In a third terminal, start the queue worker to process jobs:
    ```bash
    php artisan queue:work
    ```

The application will be available at `http://127.0.0.1:8000`.
