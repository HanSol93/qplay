import { store } from "./../../store";

let myProfile = store.getState().myProfile$;
let database = store.getState().database$;

store.subscribe(() => {
  myProfile = store.getState().myProfile$;
  database = store.getState().database$;
});

export const login = () => {
  if (!myProfile) return false;
  const isLoginRef = database.ref(`user/${myProfile.id}/isLogin`);
  isLoginRef.set(true);
};

export const logout = () => {
  if (!myProfile || !myProfile.id) return false;
  const isLoginRef = database.ref(`user/${myProfile.id}/isLogin`);
  isLoginRef.set(false);
};

export const join = ({ id, pwd }: any) => {
  if (!id) return false;
  const userRef = database.ref(`user/${id}`);
  userRef.set({ id, pwd, isLogin: true });
};
