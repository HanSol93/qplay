import { store } from "../../store";
import { Observable, BehaviorSubject } from "rxjs";

export const createFirebaseOnceObservable = (path: string) => {
  return new Observable((observer) => {
    const database = store.getState().database$;
    const userRef = database.ref(path);

    userRef.once("value", (snapshot: any) => {
      observer.next(snapshot.val());
    });

    return () => userRef.off();
  });
};

export const ref = (value: any) => {
  const r = new BehaviorSubject(value);
  // @ts-ignore
  r.set = (value) => r.next(value);
  // @ts-ignore
  r.update = (callback) => r.next(callback(r.value));

  return r;
};
