import { store } from "./../../store";

let database = store.getState().database$;
let myRoomKey = store.getState().myRoomKey$;

store.subscribe(() => {
  myRoomKey = store.getState().myRoomKey$;
  database = store.getState().database$;
});

export const myRoomClose = () => {
  if (!myRoomKey) return false;
  console.log(myRoomKey);
  const myRoomRef = database.ref(`rooms/${myRoomKey.key}`);

  myRoomRef.once("value", (snapshot: any) => {
    const myRoom = snapshot.val();

    if (myRoom.users.length <= 1) {
      console.error(snapshot.val());
      snapshot.forEach((child: any) => {
        child.ref.remove();
      });
    }
  });
};
