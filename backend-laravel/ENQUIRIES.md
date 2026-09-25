# Local enquiry backend

The contact form sends JSON to `POST /api/enquiries`. Laravel validates the fields
and stores them in MySQL's `vcts_website.enquiries` table. The existing manually
created table is supported, including its `created_at` column and absence of
`updated_at`. Each accepted enquiry queues two emails: a thank-you email to the
visitor and the submitted details to the configured enquiry recipient.

## Configure MySQL

Set these values in `backend-laravel/.env` (keep the password local):

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=vcts_website
DB_USERNAME=root
DB_PASSWORD="your-local-mysql-password"
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=database
```

The database must already exist. From `backend-laravel`, run:

```bash
php artisan config:clear
php artisan migrate --path=database/migrations/2026_09_16_000000_create_enquiries_table.php
php artisan migrate --path=database/migrations/0001_01_01_000002_create_jobs_table.php
php artisan serve --host=127.0.0.1 --port=8001 --tries=1
```

The migration creates `enquiries` on new installations and leaves an existing
table and its records intact. A rollback drops the table, so do not roll back
this migration against data you need to retain.

From `frontend-react`, run `npm run dev`. This single command starts the React
frontend, Laravel API on port 8001, and the enquiry email worker. Stop all three
with `Ctrl+C`. Vite proxies `/api` to Laravel on port 8001. Port 8000 is used by
another local project. For production hosting,
configure the web server to route `/api/*` to
Laravel's `public/index.php` on the same origin as the frontend; Vite's development
proxy is not part of the built frontend.

Submit the contact form, then check MySQL:

```sql
USE vcts_website;
SELECT * FROM enquiries ORDER BY id DESC;
```

## Email delivery

Configure Gmail SMTP in the ignored `.env` file:

```dotenv
MAIL_MAILER=smtp
MAIL_SCHEME=null
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=yogeswarreddy.meda@vconnectech.in
MAIL_PASSWORD="your-gmail-app-password"
MAIL_FROM_ADDRESS=yogeswarreddy.meda@vconnectech.in
MAIL_FROM_NAME="VConnecTech Systems"
MAIL_TIMEOUT=30
ENQUIRY_RECIPIENT=yogeswarreddy.meda@vconnectech.in
```

The combined `npm run dev` command starts this worker automatically. To run it
separately from `backend-laravel`, use:

```bash
php artisan queue:work --queue=enquiries --sleep=1 --tries=3 --timeout=60
```

The enquiry and both email jobs are stored together in MySQL. The worker sends
them separately, retrying failures after 60 seconds and then 300 seconds. The
notification includes every form field and uses the visitor's email as Reply-To.
The thank-you email uses the enquiry inbox as Reply-To. Neither email exposes
another visitor's details. The API's success response confirms storage and
queueing, not inbox delivery.

After changing mail settings, run `php artisan config:clear` and restart the
worker. To inspect exhausted retries, run `php artisan queue:failed`; after
fixing delivery, retry an individual job with `php artisan queue:retry <uuid>`.

## API and checks

Required fields: `full_name` (150 characters), `work_email` (valid email, up to
254 characters), and `message` (up to 10,000 characters). Optional fields:
`phone_number` (25 characters) and `company_name` (200 characters).

Responses: `201` saved, `422` validation failed, `429` rate limit exceeded
(five requests per minute per client IP), and `503` database unavailable.
The form retains input on failure and only clears it after a successful save.

Run `php artisan test` from `backend-laravel`. Tests use an isolated in-memory
SQLite database and do not write to your local MySQL database or send real email.
