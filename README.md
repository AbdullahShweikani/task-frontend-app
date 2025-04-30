# 📱 Task Manager App (React Native + Expo)

This is a React Native app built using [Expo Router](https://expo.dev/router) that features login authentication and a task management system, including recurring tasks and due dates.

---

## 🚀 Features

- 🔐 Login with email and password (using token-based auth)
- ✅ View assigned tasks and recurring tasks
- 🔁 Support for recurring task logic
- 🧭 File-based routing with `expo-router`

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the App

```bash
npm start
```

This opens the Expo Dev Tools interface. You can:

📱 Scan QR with Expo Go app on your device

🖥️ Run in Android/iOS simulator (if installed)

🌐 Open in web browser

🔍 Folder Structure

app/
\_layout.tsx # Root layout with theme and font loading
index.tsx # Login screen
(tabs)/ # Tab navigation (e.g. assigned.tsx, recurring.tsx)
utils/
request.ts # API request logic
auth.ts # Token helpers
validation.ts # Zod schema for form validation
