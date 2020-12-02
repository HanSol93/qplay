import { state } from "./store";
import { initialState } from "./state";
import { combineReducers } from "redux";
import {
  DATABASE_INIT,
  MY_PROFILE_INIT,
  USERS_INIT,
  UPDATE_ALL_CHAT,
  MY_ROOM_INIT,
  ROOMS_INIT,
} from "./action";

/* 데이터베이스 */
const database$ = (state = initialState.database$, action: any) => {
  switch (action.type) {
    case DATABASE_INIT: {
      return action.value;
    }
  }

  return state;
};

/** 내 정보 */
const myProfile$ = (state = initialState.myProfile$, action: any) => {
  switch (action.type) {
    case MY_PROFILE_INIT: {
      return action.value;
    }
  }

  return state;
};

/** 접속중인 유저 리스트 */
const userList$ = (state = initialState.userList$, action: any) => {
  switch (action.type) {
    case USERS_INIT: {
      return action.value;
    }
  }

  return state;
};

/** 전체 채팅 업데이트 */
const allChatArray$ = (state = initialState.allChatArray$, action: any) => {
  switch (action.type) {
    case UPDATE_ALL_CHAT: {
      return [...state, action.value];
    }
  }

  return state;
};

/** 내 방 */
const myRoomKey$ = (state = initialState.myRoomKey$, action: any) => {
  switch (action.type) {
    case MY_ROOM_INIT: {
      return action.value;
    }
  }

  return state;
};

/** 방목록 */
const roomsList$ = (state = initialState.roomsList$, action: any) => {
  switch (action.type) {
    case ROOMS_INIT: {
      return action.value;
    }
  }

  return state;
};

export const reducer = combineReducers({
  database$,
  myProfile$,
  userList$,
  allChatArray$,
  myRoomKey$,
  roomsList$,
});
