import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCo84eRnDu_G9f4qCSe86aTt25qq2V1ppE",
    authDomain: "whatsapp-e9423.firebaseapp.com",
    databaseURL: "https://whatsapp-e9423.firebaseio.com",
    projectId: "whatsapp-e9423",
    storageBucket: "whatsapp-e9423.appspot.com",
    messagingSenderId: "775956401191",
    appId: "1:775956401191:web:0b72f0a3473f058f6f1202",
    measurementId: "G-70PCKG59SR"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db