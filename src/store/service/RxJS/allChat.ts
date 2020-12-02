import { sendAllChat } from "../../service/firebase/chat";
import { BehaviorSubject, Subject } from "rxjs";
import { filter, tap, withLatestFrom } from "rxjs/operators";
import { ref } from "../../service/RxJS/observables";

export const myProfile$ = new BehaviorSubject({});
export const allChat$: any = ref("");
export const sendAllChat$ = new Subject();

sendAllChat$
  .pipe(
    withLatestFrom(myProfile$, allChat$),
    filter(
      ([event, myProfile, allChat]: any) =>
        event.key === "Enter" && allChat.length > 0
    ),
    tap(([event, myProfile, allChat]) => sendAllChat(myProfile.id, allChat)),
    tap(() => allChat$.set(""))
  )
  .subscribe();
