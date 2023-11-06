import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './env.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import router from './routes/router.js';
import verifyApiKey from './middlewares/verifyApiKey.js';
// import morgan
  import morgan from 'morgan';
// TODO: Add SDKs for Firebase products that you want to use

const app = express();

// config firebase
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// initialize firebase database
// https://firebase.google.com/docs/firestore/web/start
export const db = getFirestore(firebaseApp);

// config bcrypt
const saltRounds = 15;

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

app.use(verifyApiKey);

// routes
app.get('/', (req, res) => {
  res.send('Hello world from render! Juan Pablo Arrioja \n');
});


app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!');
});
