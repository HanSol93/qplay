import { removeAllChat } from "./chat";
import {
  __USERS_INIT,
  __UPDATE_ALL_CHAT,
  __MY_ROOM_INIT,
  __ROOMS_INIT,
} from "./../../action";
import { push } from "svelte-spa-router";
import { store, state } from "./../../store";

export const onFirebase = () => {
  let database: any = store.getState().database$;
  let allChatList: any = store.getState().allChatArray$;
  let myProfile: any = store.getState().myProfile$;
  let myRoomKey: any = store.getState().myRoomKey$;

  store.subscribe(() => {
    database = store.getState().database$;
    allChatList = store.getState().allChatArray$;
    myProfile = store.getState().myProfile$;
    myRoomKey = store.getState().myRoomKey$;
  });

  if (database === null) {
    push("/");
    return false;
  }

  const usersRef = database.ref(`user`);
  usersRef.on("value", (snapshot: any) => {
    const users = Object.values(snapshot.val()).filter((user: any) => {
      return user.isLogin;
    });

    state.dispatch(__USERS_INIT(users));
  });

  const allChatRef = database.ref(`chat/all`);
  allChatRef.on("value", (snapshot: any) => {
    if (!snapshot.val()) return false;

    const allChatArray = Object.values(snapshot.val());
    const allChatKeyArray = Object.keys(snapshot.val());

    if (allChatArray.length >= 30) {
      removeAllChat(allChatKeyArray[0]);
    }

    if (allChatList.length === 0) {
      allChatArray.map((message) => {
        state.dispatch(__UPDATE_ALL_CHAT(message));
      });
    } else if (allChatArray.length < 30) {
      const lastMessage = allChatArray[allChatArray.length - 1];

      state.dispatch(__UPDATE_ALL_CHAT(lastMessage));
    }
  });

  const roomsRef = database.ref(`rooms`);
  roomsRef.on("value", (snapshot: any) => {
    if (!snapshot.val()) {
      state.dispatch(__ROOMS_INIT([]));
      return false;
    }

    const rooms = Object.values(snapshot.val());
    state.dispatch(__ROOMS_INIT(rooms));

    for (const [key, value] of Object.entries(snapshot.val())) {
      // @ts-ignore
      if (value.users[0] === myProfile.id) {
        state.dispatch(__MY_ROOM_INIT({ key }));
      }
    }
  });
};

// const createFirebaseObservable = (path) => new Observable(observer => {

//   const ref = database.ref(path);
//   ref.on("value", (snapshot: any) => observer.next(snapshot.val()))

//   return () => ref.off()
// })

// // source
// const allChat$ = createFirebaseObservable(`chat/all`)

// const click$ = new Subject()

// const s = allChat$.pipe(
//   map(allChat => Object.values(allChat)),
//   filter(allChatArray => allChatArray.length >= 30),
//   tap(allChatArray => removeAllChat(allChatKeyArray[0])),
// ).subsribe()

// const inc = event => inc$.next()
// const inc = event => dec$.next()

// <div on:click={inc}>inc</div>
// <div on:click={dec}>dec</div>

// /////

// export const inc$ = Subject()
// export const dec$ = Subject()

// const count$ = merge(
//   inc$.pipe(mapTo(1)),
//   dec$.pipe(mapTo(-1))
//   ).pipe(
//     startWith(0)
//     scan(([prev, curr] => prev + curr))
// ).subscribe()

// // 참여자 추가 이벤트
// export const findparticipants$ = participants$.pipe(
//   bufferCount(2,1),
//   filter([(prev, curr)] => curr.length > prev.length)
// )

// findparticipants$.pipe(tap)
