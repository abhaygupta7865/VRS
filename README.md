Chalo Chale - Vehicle Rental System (VRS)

Chalo Chale is a full-stack vehicle rental web application designed to provide a seamless experience for both vehicle renters and owners. Renters can search, book, and pay for vehicles, while vehicle owners can list, manage, and monitor their rentals. The application addresses the common challenges faced by both parties, ensuring a smooth and secure transaction process.

Table of Contents

*Features
*Tech Stack
*Installation
*Usage
*Contributors

For Renters:
Secure registration and login with JWT authentication.
Profile management, including driving history and rental preferences.
Advanced search functionality with filters (vehicle type, location, date, etc.).
Easy booking process with Razorpay integration for secure payments.
Personalized vehicle recommendations.
For Vehicle Owners:
Secure registration and login with JWT.
Dashboard for managing vehicle listings (add, update, or remove).
Profile management with rental terms and availability.
Booking management and real-time communication with renters.
Common Features:
Fully responsive design for a seamless experience on all devices.
Secure payment gateway integration using Razorpay.
JWT-based authentication for secure user data management.
RESTful API for efficient communication between frontend and backend.
Tech Stack

Frontend: Vue.js, Vuex (for state management), Tailwind CSS (for styling)
Backend: Node.js, Express.js
Database: PostgreSQL
Authentication: JSON Web Tokens (JWT)
Payment Gateway: Razorpay
Version Control: Git
Installation

Clone the repository:

git clone https://github.com/abhaygupta7865/VRS.git
Install backend dependencies:


cd VRS/backend
npm install
Install frontend dependencies:


cd ../frontend
npm install
Create a .env file in the backend directory with the following:

DB_HOST=your_postgresql_host
DB_USER=your_postgresql_user
DB_PASS=your_postgresql_password
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY=your_razorpay_key

Run the backend:

cd ../backend
npm start

Run the frontend:

cd ../frontend
npm run server

Usage:

Renter: Create an account, search for available vehicles, book a vehicle, and complete the transaction using Razorpay.
Owner: Register, list vehicles, and manage your vehicle listings from your dashboard.

Contributors:

Abhay Gupta (@abhaygupta7865)
Satwik (@baghelsatwik)
