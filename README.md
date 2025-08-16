# ✅ AchieveIt – ToDo List Application (React Native)

AchieveIt is a powerful and elegant ToDo List application built with **React Native**.  
It goes beyond just task management — helping you stay productive with smart filtering, categorization, authentication, and a neat, modern interface for both iOS and Android.

---

## 🖼️ App Logo

![App Logo](/frontend/assets/images/screenshots/applogo.png)

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL (Dockerized)  
- **Frontend:** React Native (Expo Router)  
- **Authentication & Security:** JWT, Bcrypt, Fingerprint/biometric auth  
- **Others:** Docker Compose, Axios  

---

## ✨ Features

- 📌 **Task Management**
  - Add tasks with **date, time, priority level, and category**
  - Update, delete, or mark tasks as complete
  - Organize tasks by categories and types

- 🔎 **Smart Filtering & Views**
  - Filter tasks by **completed / not completed**
  - View tasks by **date or calendar**
  - Sort by **priority levels** or categories

- 🔐 **Authentication**
  - Secure login and signup with JWT
  - Passwords hashed with Bcrypt
  - Fingerprint / biometric login supported

- 🎨 **UI & UX**
  - Clean, modern, and minimal interface
  - Responsive across iOS and Android
  - Smooth navigation with **Expo Router**

- 🔄 **Sync**
  - Seamless syncing of tasks across devices  

---

## 📸 Screenshots

_Add your screenshots here to showcase the UI and features._

### (🔑) SignUp / Login
![SignUp](/frontend/assets/images/screenshots/seven.jpeg)
![Login](/frontend/assets/images/screenshots/eight.jpeg)

### 📝 Add Task
![Add Task](/frontend/assets/images/screenshots/six.jpeg)

### 🗂️ Category Choice
![Category Choice](/frontend/assets/images/screenshots/four.jpeg)

---

## 🛠️ Backend Setup

```sh
git clone https://github.com/salmanazamdev/todo-list-app.git
cd todo-fullstack-app/backend
````

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

| Code | Description           |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |

---

## 👨‍💻 Author

Muhammad Salman Azam
[GitHub](https://github.com/salmanazamdev) • [LinkedIn](https://linkedin.com/in/salmanazamdev)

---

**AchieveIt – Every task, done with ease.**
