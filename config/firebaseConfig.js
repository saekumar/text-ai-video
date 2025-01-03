// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from 'firebase/storage'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDf7fwnxCop20rgG3L89gIw8fVS8Wymi5o',
  authDomain: 'texttovideo-27af3.firebaseapp.com',
  projectId: 'texttovideo-27af3',
  storageBucket: 'texttovideo-27af3.firebasestorage.app',
  messagingSenderId: '534995112011',
  appId: '1:534995112011:web:cdb9c3fac634fceaf27dce',
  measurementId: 'G-3NEFLLNE97',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
