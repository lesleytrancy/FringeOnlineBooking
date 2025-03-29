# 🛠️ Run Instructions for Node.js + TypeScript + MySQL Project

## 📦 Prerequisites
- Node.js (v18+ recommended)
- MySQL Server
- `npm` or `yarn`
- (Optional) `npx` installed globally

## 🔧 Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
PORT=3000
```

### 4. Setup the Database
Make sure your MySQL server is running and a database is created.

If using Prisma:
```bash
npx prisma migrate dev --name init
```

If using Sequelize or raw SQL:
- Run the SQL scripts in `/database/` manually or via an init script.

### 5. Run the Project
```bash
npm run dev
```

Or if you're using `ts-node-dev`:
```bash
npx ts-node-dev src/index.ts
```

---

## 🧪 Test API
Use Postman or Curl to test:
```bash
curl http://localhost:3000/health
```

---

## 📁 Useful Scripts

| Script         | Description                  |
|----------------|------------------------------|
| `npm run dev`  | Run in development mode      |
| `npm run build`| Compile TypeScript to JS     |
| `npm start`    | Run compiled app in production |

---

## ✨ Notes
- TypeScript config: `tsconfig.json`
- Main entry: `src/index.ts`
- Routes and controllers follow MVC pattern.
