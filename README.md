# Real-Time Chat App

A real-time chat application built with React and Google Firebase. This app allows users to send and receive messages instantly and supports user authentication using Firebase Authentication.

## Features

- Real-time messaging
- User authentication with Firebase Authentication
- Designed only for laptop and desktop
- User-friendly interface

## Demo

You can view a live demo of the app [here]( https://samiralam04.github.io/Real-Time-chatApp/).

## Technologies Used

- **React**: Frontend library for building user interfaces
- **Firebase**: Backend service for real-time database and authentication
- **GitHub Pages**: Hosting the static site

## Firebase Authentication Setup

This app uses Firebase Authentication to handle user sign-up, login, and authentication. To configure Firebase Authentication:

1. **Set up Firebase Authentication**:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Select your project or create a new one.
   - Navigate to "Authentication" in the left-hand menu.
   - Under the "Sign-in method" tab, enable the authentication methods you want to use (e.g., Email/Password, Google Sign-In).

2. **Add Firebase Authentication configuration to your project**:
   - Create or update `src/firebaseConfig.js` with your Firebase configuration details:

     ```js
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };

     export default firebaseConfig;
     ```

   - Initialize Firebase and set up authentication in your React components.

## Installation

To run this project locally, follow these steps:

## Made by
Samir alam

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-github-username/your-repository-name.git

   
