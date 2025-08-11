# AchieveIt – ToDo List Application (React Native)

AchieveIt is a todo list application built with React Native. It provides a user-friendly interface for managing tasks on both iOS and Android devices.

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Dockerized)
- **Frontend:** React Native (Expo Router)
- **Others:** Docker Compose, Bcrypt for password hashing, Axios

---

## Features

- Create, update, and delete tasks
- Mark tasks as complete
- Organize tasks by categories
- Sync tasks across devices

---

## 🛠️ Backend Setup

```sh
git clone https://github.com/salmanazamdev/todo-list-app.git
cd todo-fullstack-app/backend
```

Start Docker services:
```sh
docker compose up -d
```

Create and seed the database:
```sh
docker exec -i todo-api-container psql -U root -d postgres -c "CREATE DATABASE todo_db;"
docker exec -i todo-api-container psql -U root -d todo_db < database-schema.sql
docker exec -i todo-api-container psql -U root -d todo_db < db-seed.sql
```

Install dependencies and run the server:
```sh
npm install
nodemon index.js
```

---

## 📱 Frontend (React Native + Expo)

Navigate to the frontend folder:
```sh
cd ../frontend
```

Install dependencies and start the app:
```sh
npm install
npx expo start
```

Scan the QR code using the Expo Go app to run it on your phone.

---

## 🔐 Status Codes

| Code | Description              |
|------|--------------------------|
| 200  | OK                       |
| 201  | Created                  |
| 400  | Bad Request              |
| 401  | Unauthorized             |
| 403  | Forbidden                |
| 404  | Not Found                |
| 500  | Internal Server Error    |

---

## 👨‍💻 Author

Muhammad Salman Azam  
[GitHub](https://github.com/salmanazamdev) • [LinkedIn](linkedin.com/in/salmanazamdev)

---

**AchieveIt – Every task, done with ease.**