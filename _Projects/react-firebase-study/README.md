# React + TypeScript + Vite

## Firebase setup

1. Create project "firebase-react-study"

2. Add web app

3. Create firestore: Open project -> Firestore Database -> Create database -> Start in test mode, setup security rules

4. Create realtime database: Open project -> Realtime Database -> Create database -> Start in test mode, setup security rules

```sh
npm install -g firebase-tools
```

## Create react app

```sh
npm create vite@latest

npm i firebase
npm i -D @types/firebase
```

Create .env

```ini
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DB_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Create config/FirebaseConfig.ts

## Deploy

```sh
npm i -g firebase-tools
firebase login

firebase init
- use existing project
- select dist folder


firebase deploy
```

https://fir-react-study-f0792.web.app/
