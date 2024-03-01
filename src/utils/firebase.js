// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
  storageBucket: "tread-9a163.appspot.com",
  messagingSenderId: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Keys
export const DB_STORAGE_PFP_KEY = "profile-img/";
export const DB_STORAGE_CHAT_IMAGE_KEY = "chat-img/";
export const DB_STORAGE_THREAD_IMAGE_KEY = "thread-img/";
export const DB_STORAGE_THREAD_CONTENT_IMAGE_KEY = "thread-content-img/";
