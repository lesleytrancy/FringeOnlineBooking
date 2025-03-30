# 🛠️ How to Run the Backend (Fringe 2025 Online Booking System)

This guide explains how to set up, configure, and run the backend server for the **Fringe 2025 Online Booking System**.

---

## 1. 📦 Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MySQL Server](https://www.mysql.com/) running on port `3306`
- [Redis Server](https://redis.io/) running on port `6379`
- [Git](https://git-scm.com/)
- A code editor such as [VS Code](https://code.visualstudio.com/)

---

## 2. 🔧 Setup

### 2.1 Clone the repository

```bash
git clone https://github.com/lesleytrancy/FringeOnlineBooking.git
cd backend
```

### 2.2 Install dependencies

```bash
npm install
```

### 2.3 Configure environment variables

Create a `.env` file from the example template:

```bash
cp .env.example .env
```

Edit the `.env` file and fill in your local connection details:

```env
# MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_password
DB_NAME=fringe2025_db

# Redis
CACHE_HOST=127.0.0.1
CACHE_PORT=6379
CACHE_USERNAME=
CACHE_PASSWORD=
```

---

## 3. 🗃️ Database Setup

### 3.1 Option A: Manual schema setup

Use MySQL Workbench, DBeaver, or CLI to execute:

- `database/schema.sql` for initial database structure
- `database/seed_data.sql` to insert sample data

### 3.2 Option B: TypeORM migrations

If you're using migrations, run:

```bash
npx typeorm migration:run
```

> Make sure your `ormconfig` or `data-source.ts` is correctly configured.

---

## 4. 🚀 Running the Server

### 4.1 For development (with live reload):

```bash
npm run dev
```

### 4.2 For production:

```bash
npm run build
npm start
```

---

## 5. 📘 API Documentation (Swagger UI)

Once the server is running, open your browser to:

```
http://localhost:3000/api-docs
```

Here, you can explore all available API endpoints with sample inputs and responses.

---

## 6. 🩺 System Health Check

To check if your services are running properly, go to:

```
http://localhost:3000/api/health
```

This returns a JSON with:

- MySQL status
- Redis status
- Memory usage
- CPU load
- Timestamp

Example:

```json
{
  "status": "ok",
  "timestamp": "2025-03-30T04:41:19.785Z",
  "services": {
    "mysql": "connected",
    "redis": "connected"
  },
  "system": {
    "cpuUsage": "8.4%",
    "memory": {
      "usage": "64.3%",
      "totalGB": "8.0",
      "usedGB": "5.1"
    }
  }
}
```

---

## 7. 🧪 Testing & Validation

You can validate the backend using:

- Swagger test interface (`/api-docs`)
- Postman or curl for endpoint testing
- Unit/integration test scripts (coming in `/tests/` folder)

---

## 8. 🐛 Troubleshooting

| Problem | Solution |
|--------|----------|
| ❌ MySQL access denied | Check `DB_USER`, `DB_PASS` in `.env` |
| ❌ Redis connection error | Confirm Redis is running on correct host/port |
| ❌ Swagger shows "No operations defined" | Make sure JSDoc annotations are correctly added |
| ❌ TypeError: Cannot read property 'query' of undefined | Ensure `app.set('db', AppDataSource)` is set in `app.ts` |

---

## 🧼 Final Notes

- Don't commit your `.env` file — it's already in `.gitignore`
- Keep dependencies updated (`npm outdated`)
- Make sure to pull from main often and resolve merge conflicts early

---

✅ You're now ready to develop and test the backend for the Fringe 2025 Booking System!