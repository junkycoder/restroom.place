// Note: Imports has to be from https://www.gstatic.com/, otherwise COmponents like auth and firestore wont work together
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeH_RDEDJj_63xSc3LGrCvgMiCV3dT-Tg",
  authDomain: "restroom-place.firebaseapp.com",
  projectId: "restroom-place",
  storageBucket: "restroom-place.appspot.com",
  messagingSenderId: "746979184762",
  appId: "1:746979184762:web:f9f3767b16f9dedf0febc3",
  measurementId: "G-YBMXH9H78K",
};

export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
