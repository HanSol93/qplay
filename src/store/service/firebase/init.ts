import { __DATABASE_INIT } from "./../../action";
import { state } from "./../../store";
declare const firebase: any;

export const fbInit = async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBofsfSu-pALRyck2xUAZo6R7ulpKflYDE",
    authDomain: "qplay-d61d4.firebaseapp.com",
    databaseURL: "https://qplay-d61d4.firebaseio.com",
    projectId: "qplay-d61d4",
    storageBucket: "qplay-d61d4.appspot.com",
    messagingSenderId: "607197648909",
    appId: "1:607197648909:web:9862a623f30a12d05a9d44",
  };

  await firebase.initializeApp(firebaseConfig);

  state.dispatch(__DATABASE_INIT(firebase.database()));
};
