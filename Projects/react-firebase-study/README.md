# React + TypeScript + Vite

## Firebase setup

1. Create project "firebase-react-study"

2. Add web app

3.

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
firebase deploy
```
