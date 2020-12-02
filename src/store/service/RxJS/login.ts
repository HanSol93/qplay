import { createFirebaseOnceObservable } from "./observables";
import { push } from "svelte-spa-router";
import { state } from "../../store";
import { BehaviorSubject, Subject } from "rxjs";
import {
  tap,
  exhaustMap,
  withLatestFrom,
  catchError,
  // bufferCount,
  // map,
  // filter,
} from "rxjs/operators";
import { empty } from "svelte/internal";
import { __MY_PROFILE_INIT } from "../../action";
import { join, login } from "../../service/firebase/login";

export const loginId$ = new BehaviorSubject("");
export const loginPwd$ = new BehaviorSubject(0);
export const loginClick$ = new Subject();

loginClick$
  .pipe(
    withLatestFrom(loginId$),
    exhaustMap(([event, id]) => createFirebaseOnceObservable(`user/${id}`)),

    withLatestFrom(loginId$, loginPwd$),

    // 닉네임 중복
    tap(([user, id, pwd]: any) => {
      if (user && user.pwd !== pwd) {
        throw "중복 닉네임 입니다.";
      }
    }),

    // 가입 or 로그인 성공
    tap(([user, id, pwd]) => {
      state.dispatch(__MY_PROFILE_INIT({ id, pwd, isLogin: true }));

      // 가입
      if (user === null) {
        join({ id, pwd });
      }

      // 로그인 성공
      else {
        login();
      }

      push("/room-list");
    }),

    catchError((error) => {
      alert(error);
      return empty();
    })
  )
  .subscribe();

// const createFirebaseObservable = (path: string) => {
//   return new Observable((observer) => {
//     const database = store.getState().database$;
//     const userRef = database.ref(path);

//     userRef.once("value", (snapshot: any) => {
//       console.log("value : ", snapshot.val());
//       observer.next(snapshot.val());
//     });

//     return () => userRef.off();
//   });
// };

// stroy: (when)참여자가 새로들어 오면 // (then)채팅룸에 글자를 입력함.
// dispatch, effect, state

// const users$ = createFirebaseObservable("/users")

// users$.pipe(
//   map(object => Object.values(object)),
//   bufferCount(2, 1),
//   filter(([prev, curr]) => curr.length > prev.length))
//   map(([prev, curr]) => curr)
//   map(user => {type: "NEW COME", payload: user})
// )

// // 채팅룸에 글자를 입력함.
// const dldldEpic = action$ => action$.pipe(
//   filter(action => "NEW_COME")
//   tap(() => console.log("채팅룸에 글자를 입력함."))
// )
