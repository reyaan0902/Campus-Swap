# CampusSwap 🎓

A MERN stack web application that helps college students buy, sell, and exchange used academic and college essentials in a convenient online marketplace.

## 📌 About the Project

CampusSwap is a student-focused marketplace designed to make it easier for college students to find affordable textbooks, stationery, calculators, lab coats, and other useful college items.

Instead of throwing away or storing unused items, students can list them for sale or exchange with other students, encouraging affordability and reuse.

## ✨ Features

- **User Authentication:** Register and log in securely.
- **Create Listings:** Add items with a title, description, price, category, and image.
- **Browse Items:** Explore available products listed by students.
- **Search and Filter:** Find items by keyword or category.
- **Manage Listings:** Edit, delete, or mark your listings as sold.
- **Favourites:** Save interesting listings for later.
- **Responsive Design:** Access the application on desktop and mobile devices.

*Features will be implemented progressively as the project develops.*

## 🛠️ Tech Stack

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API Communication:** REST API
- **Version Control:** Git and GitHub

## 📂 Project Structure

```text
CampusSwap/
├── client/              # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.jsx
├── server/              # Node.js and Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
├── .gitignore
└── README.md
```

*The structure may change as development progresses.*

## ⚙️ Installation and Setup

### Prerequisites

Make sure you have installed:

- Node.js and npm
- MongoDB or a MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd CampusSwap
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Add any additional environment variables required by your implementation.

### 3. Start the Backend

```bash
npm run dev
```

Ensure the backend start script is configured in `server/package.json`.

### 4. Set Up the Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed in the terminal to access the application.

*These commands assume the frontend and backend have been configured as described.*

## 🗄️ Database

MongoDB will store application data in collections such as:

- **Users:** User profiles and authentication information.
- **Listings:** Item details, prices, categories, images, and availability.
- **Favourites:** Saved listings associated with users.

The final schema will depend on the implemented features.

## 🎯 Project Objectives

- Develop a full-stack web application using the MERN stack.
- Implement CRUD operations using MongoDB, Express.js, and Node.js.
- Build an interactive and responsive user interface with React.
- Understand REST API development and frontend-backend integration.
- Solve a practical problem faced by college students.

## 📸 Screenshots

Screenshots of the application will be added here as development progresses.

Examples:
- Home Page
- Login and Registration
- Marketplace Listings
- Item Details
- User Dashboard
- Add/Edit Listing Page

## 🚀 Future Enhancements

- In-app messaging between buyers and sellers.
- Advanced filters and sorting.
- Product ratings and reviews.
- Notifications for listing updates.
- College-specific marketplace access.

## 👨‍💻 Contributors

Add the names and GitHub profiles of your project team members here.

## 📄 License

This project is developed for educational purposes as part of a Web Programming Laboratory mini-project.

