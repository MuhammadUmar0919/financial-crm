// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
// import { getStorage } from "firebase/storage";

// // type your own config
// const firebaseConfig = {
//     apiKey: "AIzaSyDYm-AF9IhN1Zh_1fhxIxJJ7rJLfkPgLHA",
//     authDomain: "dostavka-d565c.firebaseapp.com",
//     projectId: "dostavka-d565c",
//     storageBucket: "dostavka-d565c.appspot.com",
//     messagingSenderId: "451859585467",
//     appId: "1:451859585467:web:9bcd68e5ed8c724c3d0c9e",
//     measurementId: "G-N1GMMBX959"
//   };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// export const db = getFirestore(app);
// const auth = getAuth(app);
// const storage = getStorage();
// const googleAuthProvider = new GoogleAuthProvider();
// const facebookAuthProvider = new FacebookAuthProvider();
// const githubAuthProvider = new GithubAuthProvider();

// export { auth, storage, googleAuthProvider, facebookAuthProvider, githubAuthProvider };



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFUCKLMJTUe_XuUF6Xa_8gf4Z06txZe7Y",
  authDomain: "admin-crm-8c470.firebaseapp.com",
  projectId: "admin-crm-8c470",
  storageBucket: "admin-crm-8c470.appspot.com",
  messagingSenderId: "949319730692",
  appId: "1:949319730692:web:71c6c39a4ba69adb5d1751",
  measurementId: "G-D9WFKNH89B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();
const googleAuthProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { db, auth, storage, googleAuthProvider };
