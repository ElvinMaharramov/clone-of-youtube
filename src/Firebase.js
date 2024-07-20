import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAHQpiO5maPKlvTQ8cYgMnZi-nsM4Hdvmc",
  authDomain: "project-by-elvinmaharramov.firebaseapp.com",
  projectId: "project-by-elvinmaharramov",
  storageBucket: "project-by-elvinmaharramov.appspot.com",
  messagingSenderId: "620768012904",
  appId: "1:620768012904:web:2a65640ca3f92a4ae9a9dd"
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();