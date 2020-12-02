import { store } from "./../../store";

let database = store.getState().database$;

store.subscribe(() => {
  database = store.getState().database$;
});

export const createRoom = (name: string, id: string) => {
  const rooomsRef = database.ref(`rooms`).push();
  rooomsRef.set({ name, users: [id] });
};
