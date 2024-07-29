# PixelPlaza

This is a demo website for a fictional e-commerce platform, inspired by GOG.com.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Credits](#credits)
- [Contact](#contact)
- [Changelog](#changelog)
- [Known Issues](#known-issues)

## Installation

### Prerequisites

- Node.js
- npm

### Backend (Express.js)

1. Clone the repository:

    ```bash
    git clone https://github.com/David-Brandenburg/final_project
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install bcrypt body-parser cloudinary cloudinary-multer cors date-fns dotenv express google-auth-libary jsonwebtoken mongodb mongoose multer multer-storage-cloudinary nodemon slugify
    ```

3. Create a `.env` file in the `backend` directory and add the following:

    ```
    PORT=3001
    MONGO_USER=your_user_id
    MONGO_PASS=your_pass
    MONGO_HOST=your_cluster
    MONGO_DATABASE=your_database
    JWT_SECRET=your_JWT_secret
    CLOUD_NAME=your_cloudinary_name
    CLOUD_API_KEY=your_api_key
    CLOUD_API_SECRET=your_api_secret
    EMAILJS_PUBLIC_KEY=your_email.js_public_key
    EMAILJS_SERVICE_ID=your_id
    EMAILJS_TEMPLATE_ID=your_templet_id
    GOOGLE_CLIENT_ID=your_google_client_id
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

### Frontend (React)

1. Navigate to the `frontend` directory:

    ```bash
    cd ../frontend
    ```

2. Install dependencies:

    ```bash
    npm install @emailjs/browser @react-oauth/google @testing-library/jest-dom @testing-library/react @testing-library/user-event bootstrap-icons date-fns dotenv framer-motion jwt-decode nodemon react react-dom react-range-slider-input react-router-dom react-scripts react-spinners react-toastify sass slugify swiper

    ```
3.  Create a `.env` file in the `frontend` directory and add the following:

    ```bash
    REACT_APP_URL_BACKEND=http://localhost:3001
    ```

4. Start the React development server:

    ```bash
    npm start
    ```

## Usage

### Backend API

The Backend-API runs on `http://localhost:3001` and provides the following endpoints:

For Games

- `GET /games/` - Get all games
- `GET /games/:title` - Gets perticular Game
- `GET /games/genres/:genre` - Gets games in a specific genre
- `POST /games/sold` - Set Game sold + 1
- `POST /games/addGame` - Create a new Game entry

For Accounts

- Die Backend-API läuft auf http://localhost:3001 und bietet die folgenden Endpunkte:

- `POST /accounts/users/create` - Benutzer erstellen 
- `GET /accounts/users` - Alle Benutzer abrufen
- `GET /accounts/users/:accountId` - Benutzer nach ID abrufen
- `POST /accounts/users/login` - Benutzeranmeldung
- `POST /accounts/users/checktoken` - Token überprüfen
- `PATCH /accounts/users/updateAccountProfilePic/:accountId` - Profilbild eines Benutzers aktualisieren
- `PATCH /accounts/users/resetAccountProfilePic/:accountId` - Profilbild eines Benutzers zurücksetzen
- `PATCH /accounts/users/updateAccountPassword/:accountId` - Passwort eines Benutzers aktualisieren
- `PATCH /accounts/users/updateAccountInfo/:accountId` - Benutzerinformationen aktualisieren
- `DELETE /accounts/users/deleteAccount/:accountId` - Benutzerkonto löschen
- `GET /accounts/users/confirm/:confirmationToken` - E-Mail bestätigen
- `POST /accounts/users/google` - Google-Login
- `PATCH /accounts/users/updateMyGames/:accountId` - Spiele eines Benutzers aktualisieren

### Frontend

Visit `http://localhost:3000` in your browser to view the application. You can browse products, add them to the cart, and proceed to checkout.

## Features

- User authentication (registration, login, logout)
- Product listing and details
- Shopping cart management
- Admin dashboard

## Credits

- [David Brandenburg](https://github.com/David-Brandenburg)
- [Danny](https://github.com/RealMahu)
- [React](https://reactjs.org/)
- [Express.js](https://expressjs.com/)

## Contact

For support, please contact [d-brandenburg@hotmail.de](mailto:d-brandenburg@hotmail.de).

## Changelog

- **v1.0.0**
  - Initial release

## Known Issues

- No responsive implementation; best viewed on desktop.

---

This is a comprehensive template, but you may need to adjust it according to your project's specific requirements and configurations.
    
