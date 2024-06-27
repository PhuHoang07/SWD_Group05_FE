import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAgK3bso3DQj67bYc2ENlRISoRjr42Q9gQ",
  authDomain: "goodsexchange-b106b.firebaseapp.com",
  projectId: "goodsexchange-b106b",
  storageBucket: "goodsexchange-b106b.appspot.com",
  messagingSenderId: "196336764695",
  appId: "1:196336764695:web:112c1ae442829d2c85d952"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage