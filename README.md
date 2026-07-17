# ECOEarn - E-Waste Management System

A full-stack E-Waste Management web application with user authentication, photo submission, real-time status notifications, and an administrative control panel to manage collections.

---

## 🚀 Technologies Used

* **Frontend:** HTML5, Vanilla CSS, JavaScript (ES6+), Socket.io Client
* **Backend:** Node.js, Express.js, Socket.io (WebSockets)
* **Database:** MongoDB (using Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs hashing

---

## ✨ Features

### 1. **User Authentication & Profiles**
* **Sign Up:** Email availability check, password strength matching, and mathematical captchas.
* **Log In:** Captha-verified sign-in with a "Remember Me" option.
* **Profile Setup:** Mandatory username, birthdate, and address word count validation (max 100 words), plus profile photo upload support.
* **Dashboard:** Tracks metrics like points earned, devices recycled, and days active.

### 2. **E-Waste Submission & Photo Upload**
* Capture photos directly using your device's camera (native media support) or upload standard images (JPG/PNG, up to 5MB).
* Choose collection methods (Home Pickup or Drop at Center).
* Submissions are instantly stored in the MongoDB database with dynamic point allocation.

### 3. **Admin Dashboard**
* Administrative panel to view all pending and completed e-waste requests.
* Ability to update submission statuses (e.g., pending, collected, rejected).
* Updates are pushed instantly to the user's dashboard in real-time via WebSockets.

---

## 📁 Project Structure

```text
E-waste-ECoearn/
├── index.html           # Main frontend interface
├── css/
│   └── style.css        # Frontend styling
├── js/
│   ├── auth.js          # Authentication, API calls, and WebSockets client
│   └── validation.js    # Client-side form validations
├── assets/              # Images and icon assets
└── server/              # Node.js/Express Backend
    ├── server.js        # Main backend entry point
    ├── setup-admin-direct.js # One-time admin setup helper script
    ├── models/          # Database schemas (User.js, Submission.js)
    ├── routes/          # API endpoint files (auth.js, waste.js, admin.js)
    └── middleware/      # JSON Web Token authentication middlewares
```

---

## ⚙️ Local Installation & Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (version 16 or later)
* [MongoDB](https://www.mongodb.com/) (locally installed or a MongoDB Atlas Cloud account)

### 1. Configure the Backend Server
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` configuration file inside the `server/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_secret_signing_key_here
   ```
4. Start the backend:
   ```bash
   npm start
   ```

### 2. Setup the Admin Account
To create a default administrator profile in the database, run the helper script in the `server/` folder:
```bash
node setup-admin-direct.js
```

### 3. Configure the Frontend
1. Open the [js/auth.js](js/auth.js) file.
2. In the **Backend Configuration** section, verify the local development URL configuration:
   * By default, when running on `localhost`, the frontend automatically points to `http://localhost:5000`.
   * For production, assign your hosted backend URL to the `PROD_BACKEND_URL` variable.

---

## 🌐 Production Deployment

For global, public access, deploy using the following setup:
1. **Database:** Host your MongoDB database on **MongoDB Atlas** (M0 Free Tier). Ensure the IP Access List is set to `0.0.0.0/0` to allow connections from your cloud host.
2. **Backend:** Deploy the `server` subdirectory as a **Web Service** on **Render** or **Railway**. Configure the environment variables (`MONGO_URI` and `JWT_SECRET`) directly on the host console.
3. **Frontend:** Deploy the root directory static files on **GitHub Pages** or **Netlify**.
