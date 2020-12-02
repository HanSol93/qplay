import { store } from "./../../store";

let database = store.getState().database$;

store.subscribe(() => {
  database = store.getState().database$;
});

export const sendAllChat = (id: string, message: string) => {
  const allChatRef = database.ref(`chat/all`).push();
  allChatRef.set({ id, message });
};

export const removeAllChat = (id: string) => {
  const allChatRef = database.ref(`chat/all/${id}`);
  allChatRef.remove();
};
