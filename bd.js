const { getDatabase } = require("firebase/database");
const { initializeApp } = require("firebase/app")

const firebaseConfig = {
  apiKey: "AIzaSyCRMa39DoVNEgBBf0FXVhHrr9Rs2Yf7el8",
  authDomain: "testbd-e84c9.firebaseapp.com",
  databaseURL: "https://testbd-e84c9-default-rtdb.firebaseio.com",
  projectId: "testbd-e84c9",
  storageBucket: "testbd-e84c9.appspot.com",
  messagingSenderId: "874810449832",
  appId: "1:874810449832:web:48908020824616fbd9479d"
};

const db = getDatabase(initializeApp(firebaseConfig));

module.exports = db;