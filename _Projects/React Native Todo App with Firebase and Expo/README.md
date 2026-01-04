# React Native Todo App with Firebase and Expo

By Simon Grimm

https://www.youtube.com/live/TwxdOFcEah4

https://docs.expo.dev/guides/using-firebase/

## Firebase setup

1. Create project
2. Add web app, give a name

3. Setup cloud firestore: Create database -> Modify the rules

```json
allow read, write: if
```

## Create project

```sh
npx create-expo-app@latest fireApp -t expo-template-blank-typescript

npx expo install firebase

npx expo install react-native-screens react-native-safe-area-context @react-navigation/native-stack
```

Create firebaseConfig.ts at the root folder
