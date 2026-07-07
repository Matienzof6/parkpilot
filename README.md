# 🚗 ParkPilot

A full-stack parking management application built to simplify and digitize the daily parking operations of a hotel Front Office.

Designed for real-world use, the system provides receptionists with a fast and intuitive interface to manage vehicle occupancy, assign parking spaces, monitor upcoming departures, and instantly locate vehicles through a visual parking dashboard.

> Developed as a real internal tool and currently used in production at a hotel reception.

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



## 📁 Project Structure

```text
ParkPilot/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── database/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
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


## 🚀 Current Features

- Manage up to **50 parking spaces**
- Add, edit and remove parking records
- Automatic parking availability updates
- Automatic checkout after departure date
- Manual checkout option
- Live occupancy statistics
- Parking history
- Upcoming departures page
- Instant search by guest, room or license plate
- Responsive dashboard
- Real-time parking visualization

## 🚀 Future Improvements

Although the application is already used daily, there are several ideas planned for future versions:

### Parking Integration
- Connect with the hotel's parking barrier system through its API.
- Automatically detect when a vehicle enters or leaves the parking.
- Automatic checkout based on license plate recognition.

### Dashboard Improvements
- Daily occupancy statistics.
- Weekly and monthly reports.
- Parking usage analytics.
- Occupancy charts.

### Data Management
- Export parking history to Excel or PDF.
- Backup and restore the local database.
- Advanced filtering and sorting.

### User Experience
- Automatic scroll to searched parking space.
- Vehicle notifications.
- Better mobile responsiveness.
- Light/Dark theme support.

### Future Scalability
- Multi-hotel support.
- Cloud synchronization.
- Optional authentication and user roles.



## Contributing

Built with ❤️ to improve the daily workflow of hotel reception staff.

If you have suggestions, ideas or feedback, feel free to reach out or open an issue in this repository.

Contributions and different points of view are always welcome.

## 📄 License

This project is licensed under the MIT License.

Feel free to use it as inspiration for your own projects.

## 🌟 Final Thoughts

What started as a simple idea to replace a manual parking log became a complete management application used in a real hotel environment.

The project continues to evolve through continuous improvements, always focusing on simplicity, usability and solving real operational challenges.

This repository documents not only the final product, but also the learning process behind building reliable software one step at a time.
