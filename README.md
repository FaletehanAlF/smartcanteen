# 🍽️ SmartCanteen

A modern web-based school canteen ordering system that allows students to browse menus, place orders, and reduce waiting times through a simple and efficient digital platform.

![SmartCanteen Banner](./asset/banner.png)

---

## 📖 About The Project

SmartCanteen is a school canteen ordering platform designed to simplify the food ordering process.

Students can:

* Browse available menus
* View food categories
* Place food orders online
* Reduce queue times
* Contact administrators through the website

This project was developed as part of a software development and UI/UX implementation practice using modern frontend technologies.

---

## 🎯 Objectives

* Improve canteen service efficiency
* Reduce physical queues
* Provide a better ordering experience
* Introduce digital transformation in school environments

---

## ✨ Features

### 🏠 Landing Page

* Responsive design
* Modern UI
* Smooth scrolling navigation

### 👤 Authentication

* Login page
* User access control (UI implementation)

### 🍔 Menu System

* Dynamic menu rendering using JSON API
* Food categories
* Product cards
* Add to cart button

### 📚 Articles Section

* Educational content
* Food and canteen-related information

### 📞 Contact Form

* Formspree integration
* Success notification
* Form validation

### 📱 Responsive Design

* Mobile First
* Tablet Friendly
* Desktop Optimized

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* Tailwind CSS
* JavaScript (Vanilla JS)

### Tools

* Tailwind CSS CLI
* Feather Icons
* Formspree

### Deployment

* GitHub Pages / Vercel

---

## 📂 Project Structure

```bash
SMARTCANTEEN/
│
├── api/
│   └── data.json
│
├── asset/
│   ├── images/
│   ├── logo/
│   └── screenshots/
│
├── script/
│   └── script.js
│
├── src/
│   ├── input.css
│   └── output.css
│
├── view/
│   ├── login.html
│   ├── register.html
│   └── dashboard.html
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/smartcanteen.git
```

Move into project directory

```bash
cd smartcanteen
```

Install dependencies

```bash
npm install
```

---

## 🚀 Running Tailwind CSS

Development mode

```bash
npm run dev
```

or

```bash
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
```

Build production CSS

```bash
npm run build
```

or

```bash
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --minify
```

---

## 📄 Sample package.json Scripts

```json
{
  "scripts": {
    "dev": "npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch",
    "build": "npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --minify"
  }
}
```

---

## 📱 Responsive Breakpoints

| Device  | Width    |
| ------- | -------- |
| Mobile  | < 768px  |
| Tablet  | ≥ 768px  |
| Laptop  | ≥ 1024px |
| Desktop | ≥ 1280px |

---

## 🔄 Data Flow

```text
data.json
     │
     ▼
script.js
     │
     ▼
Dynamic Menu Rendering
     │
     ▼
User Interface
```

---

## 📸 Screenshots

### Home Page

Add screenshot here:

```text
asset/screenshots/home.png
```

### Menu Section

```text
asset/screenshots/menu.png
```

### Contact Section

```text
asset/screenshots/contact.png
```

---

## 🌐 Future Improvements

* User Authentication Backend
* Shopping Cart System
* Order Tracking
* Payment Gateway Integration
* Admin Dashboard
* Database Integration
* API Development

---

## 👨‍💻 Developer

**Faletehan Al Farabi**

Frontend Developer

### Connect With Me

* GitHub: https://github.com/FaletehanAlF
* LinkedIn: https://www.linkedin.com/in/faletehan-al-farabi-/

---

## 📜 License

This project is developed for educational and portfolio purposes.

© 2026 SmartCanteen. All Rights Reserved.
