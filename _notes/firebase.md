# Firebase

Firebase is not just a database but a set of tools; it is often called a back-end-as-a-service
(BaaS). Firebase contains a variety of services:

- Authentication: User login and identity
- Real-time database: Real-time, cloud-hosted, NoSQL database
- Cloud Firestore: Real-time, cloud-hosted, NoSQL database
- Cloud storage: Massively scalable file storage
- Cloud functions: Serverless, event-driven back-end functions
- Firebase hosting: Global web hosting
- ML Kit: An SDK for common machine learning tasks

## Firebase Realtime Database and Cloud Firestore

Both Firebase Realtime Database and Cloud Firestore are **real-time**, cloud-hosted NoSQL databases from Google Firebase

Realtime Database is simpler and older — great for lightweight apps where realtime sync is the top priority.

Cloud Firestore is newer and more scalable — designed for modern, large-scale applications with richer querying and better data structuring.

Firebase Realtime Database uses JSON tree (flat, single large tree)

Cloud Firestore uses Collections → Documents → Subcollections (hierarchical, structured)

## Common usage

- Authentication to create user
- Firebase storage to update image
- Firestore database to fetch/send realtime data

## Firebase console setup

- Firebase Auth

Select project -> Build -> Authentication -> Get Start
use Native providers, Email/Password, Enable

- Firestore Database

Select project -> Build -> Firestore Database -> Create database -> Start in test mode

- Firebase Storage

Select project -> Build -> Storage -> Get start -> Start in test mode
