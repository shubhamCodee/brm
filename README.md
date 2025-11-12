# BRM - A Modern Multi-Tenant CRM

BRM is a powerful, modern Customer Relationship Management (CRM) application built on the Laravel framework. It serves as a practical demonstration of advanced, senior-level web development concepts, including a robust multi-tenant architecture, a secure API, and real-time frontend notifications.

## Key Architectural Pillars

This project was built with a focus on clean, scalable, and maintainable code, adhering to modern best practices.

-   **Multi-Tenancy:** The application is built on a single-database, multi-tenant architecture. All data is automatically and securely scoped to the authenticated user's tenant, making it suitable for a SaaS (Software as a Service) environment.
-   **Tenant-Scoped File Storage:** Enhances multi-tenancy by physically isolating tenant-specific file uploads into separate directories on the disk, ensuring strict data separation.
-   **Repository Pattern:** The data layer is fully decoupled from the controllers through the use of the Repository Pattern. This promotes a clean separation of concerns and makes the application easy to test and maintain.
-   **Service-Oriented:** Complex business logic, such as mass actions and tenant provisioning, is encapsulated in dedicated Service Classes, keeping controllers lightweight and focused on handling HTTP requests.
-   **API First:** The application includes a secure, stateless API built with Laravel Passport, enabling third-party integrations and headless operations.
-   **Package Development:** Demonstrates a professional package development workflow. Core, reusable logic (like the Mass Action Service) is extracted into its own version-controlled Composer package, promoting modularity and code reuse across multiple projects.

## Core Features

-   **Full CRUD Functionality:** Complete Create, Read, Update, and Delete capabilities for key CRM resources: Users, Organizations, and Contacts.
-   **Tenant-Scoped File Storage:** All user-uploaded files, such as profile pictures, are automatically stored in tenant-specific directories. The `User` model features a custom accessor to centralize URL generation logic, providing a full, correct URL and a default avatar image seamlessly to the frontend.
-   **Real-Time Notifications:** A real-time notification system built with Pusher and Laravel Echo. Events are dispatched to a queue and broadcast to the frontend, providing instant user feedback.
-   **Mass Update & Mass Delete:** Efficiently perform bulk actions on multiple records at once through a clean, modal-driven UI. The core logic is now provided by a reusable, external package.
-   **Secure API with Laravel Passport:** A comprehensive set of API endpoints for all resources, protected by OAuth2 authentication. The API supports pagination, follows RESTful conventions, and includes advanced, Redis-powered **rate limiting** with custom rules to protect against abuse on resource-intensive endpoints.
-   **Advanced Queue Management & Monitoring:** Utilizes Laravel's Redis-powered queue system for background jobs. Includes robust handling for failed jobs with **automatic retry and backoff strategies**, and features a **Laravel Horizon** dashboard for professional, real-time monitoring of queue throughput, job status, and failures.
-   **Automated Scheduled Tasks:** A tenant-aware command for generating daily reports is managed by Laravel's Scheduler and a server-side Cron job.
-   **Automated Email Reporting:** The scheduled task automatically generates and sends daily summary reports to each tenant's administrator using Laravel's Mailable and queue system.
-   **Performance Caching:** Implements a tenant-aware caching strategy using Redis and Cache Tags to dramatically improve performance by caching slow database queries. Includes a custom Artisan command for surgically clearing the cache for a specific tenant.
-   **Custom Artisan Commands:** Administrative tasks, such as creating new tenants and clearing tenant-specific cache, are handled through custom, reusable Artisan commands.
-   **Automated Testing:** A foundational testing suite is in place.
    -   **Backend:** Feature tests written with **Pest** verify critical business logic and database interactions in an isolated test database.
    -   **Frontend:** Unit tests written with **Vitest** and **React Testing Library** ensure the reliability and correctness of reusable UI components.


## Tech Stack

### Backend
-   **Framework:** Laravel 12.x
-   **API Authentication:** Laravel Passport (OAuth2)
-   **Database:** MariaDB
-   **Queues:** Redis
-   **Queue Monitoring:** Laravel Horizon
-   **Cache:** Redis
-   **Real-Time Events:** Pusher
-   **Testing:** Pest

### Frontend
-   **Framework:** Inertia.js with React + TypeScript
-   **Styling:** Tailwind CSS
-   **Real-Time Listening:** Laravel Echo & Pusher-JS
-   **UI Notifications:** `react-hot-toast`
-   **Testing:** Vitest & React Testing Library

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
    -   Set `APP_URL=http://127.0.0.1:8000`.
    -   Set up your `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` credentials.
    -   Configure your `PUSHER_APP_ID`, `PUSHER_APP_KEY`, etc.
    -   Ensure `SESSION_DRIVER` is set to `redis`.

5.  **Create database and run migrations:**
    -   Create your database in MariaDB.
    -   Run the migrations and seed the database with the default tenant and sample data:
    ```bash
    php artisan migrate:fresh --seed
    ```

6.  **Set up Laravel Passport & Storage Link:**
    ```bash
    php artisan passport:install
    php artisan storage:link
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

8.  **Run Horizon (Queue Worker):**
    -   In a third terminal, start the Horizon dashboard and queue workers:
    ```bash
    php artisan horizon
    ```
    -   The Horizon dashboard will be available at `http://127.0.0.1:8000/horizon`.

The application will be available at `http://127.0.0.1:8000`.