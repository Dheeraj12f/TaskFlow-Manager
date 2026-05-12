# TaskFlow

Modern Team Task Manager built using:
- FastAPI
- React
- MySQL
- JWT Authentication
- Tailwind CSS

## Run Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

## Database

Create MySQL database:

```sql
CREATE DATABASE taskflow;
```

Update `.env` in backend.

## Deployment

Backend: Railway
Frontend: Vercel