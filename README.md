# 🚗 ParkPilot

A full-stack parking management application built to replace spreadsheet-based parking management at a hotel reception.

Designed for real-world use, the system provides receptionists with a fast and intuitive interface to manage vehicle occupancy, assign parking spaces, monitor upcoming departures, and instantly locate vehicles through a visual parking dashboard.

> **Real-world project currently used in production by a hotel reception to manage daily parking operations.**
---

<img width="3762" height="1856" alt="Captura de pantalla 2026-07-06 230328" src="https://github.com/user-attachments/assets/6264da21-edf9-45d2-bb3b-c9c3a1776c71" />


---
## 📖 About the Project

This project was born from a real operational need.

At the hotel I worked, parking occupancy was managed manually by spreadsheets, making it difficult for receptionists to know which parking spaces were occupied, which guest each vehicle belonged to, and when vehicles were scheduled to leave.

The goal was to replace that manual workflow with a modern, visual, and easy-to-use web application that could run locally within the hotel and be shared between multiple Front Office computers.

Instead of creating a complex enterprise solution, the focus was simplicity, speed, and reliability. Every feature was designed around the daily workflow of reception staff, allowing them to perform common tasks with as few clicks as possible.

---

## ✨ Features

- 🚗 Visual parking grid with 50 parking spaces
- 🔴 Real-time occupied and available parking indicators
- 👤 Detailed parking information for each occupied space
- ➕ Add new parking records
- ✏️ Edit existing parking records
- ✅ Manual vehicle checkout
- ⏰ Automatic checkout based on departure date
- 🔍 Live search by guest name, room number, or license plate
- 📅 Upcoming departures dashboard
- 📜 Parking history
- 📊 Occupancy statistics
- 💻 Responsive modern interface

## 🛠️ Tech Stack

### Frontend
- **React** – Component-based user interface
- **Vite** – Fast development environment and build tool
- **Tailwind CSS** – Modern utility-first styling
- **Axios** – Communication with the backend REST API

### Backend
- **Node.js**
- **Express.js** – REST API

### Database
- **SQLite** – Lightweight local database, perfect for an internal application

### Development Tools
- **Git & GitHub**
- **Visual Studio Code**
- **Postman** – API testing
## Requirements

- Node.js 20+

- npm

- Git
## 📸 Screenshots

### Main Dashboard


<img width="3762" height="1856" alt="Captura de pantalla 2026-07-06 230328" src="https://github.com/user-attachments/assets/b44f6a73-aa0c-4156-8bdb-08af4a03aaaa" />

---

### Parking Grid

<img width="3771" height="1863" alt="Captura de pantalla 2026-07-06 230339" src="https://github.com/user-attachments/assets/e81cc000-51a5-4ed4-b268-9bd95c8646d1" />


---

### Spot Details Panel

<img width="1081" height="1349" alt="Captura de pantalla 2026-07-06 230347" src="https://github.com/user-attachments/assets/02ae462f-43e5-4f20-ba28-ad21124ea028" />


---

### Upcoming Departures

<img width="3816" height="1860" alt="Captura de pantalla 2026-07-06 231417" src="https://github.com/user-attachments/assets/b8986087-80d5-4833-97ed-6f382f00aa64" />


---

### Search Feature

<img width="3771" height="1559" alt="image" src="https://github.com/user-attachments/assets/f4c4ad48-0f45-43b4-8b91-a1925fcbca45" />



## 🏗 Architecture

```text
React + Vite
      │
   REST API
      │
Node.js + Express
      │
    SQLite
```


## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Matienzof6/parkpilot.git
```

Move into the project

```bash
cd Parking-Management-System
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

The backend API runs on:

```text
http://localhost:3000
```


### Production (PM2)
This project was made for a local deployment to use in the internal network
##### You can look online how to install PM2 and configure, it's very easy, but is out of the scope in this README

Once installed
```
cd client
```
```
npm run build
```
**Move the dist folder into server**


## 💡 What I Learned

Developing this project gave me practical experience with:

- Designing and building REST APIs
- Developing a complete full-stack application
- React component architecture
- Managing persistent data with SQLite
- Creating software around real user requirements
- Deploying an internal production application
- Improving usability through continuous feedback from daily users

## 🚀 Future Improvements

- Integration with the hotel's parking barrier API
- Automatic license plate recognition
- Excel and PDF export
- Backup and restore functionality
- Advanced statistics and reports
- Authentication and user roles
- Multi-hotel support


## 📄 License

This project is licensed under the MIT License.

Feel free to use it as inspiration for your own projects.

