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
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
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
export const DEFAULT_PFP ="https://firebasestorage.googleapis.com/v0/b/tread-c514d.appspot.com/o/profile-img%2Fdepositphotos_137014128-stock-illustration-user-profile-icon.jpg?alt=media&token=b4b2ea1f-6c73-4514-9155-a8d35f11a732";