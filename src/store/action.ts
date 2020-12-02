export const DATABASE_INIT = "[데이터베이스초기화]/DATABASE_INIT";
export const MY_PROFILE_INIT = "[내정보초기화]/MY_PROFILE_INIT";
export const USERS_INIT = "[유저리스트초기화]/USERS_INIT";
export const UPDATE_ALL_CHAT = "[전체채팅업데이트]/UPDATE_ALL_CHAT";
export const MY_ROOM_INIT = "[내방초기화]/MY_ROOM_INIT";
export const ROOMS_INIT = "[방목록초기화]/ROOMS_INIT";

/* 데이터베이스 초기화 */
export const __DATABASE_INIT = (database: any) => ({
  type: DATABASE_INIT,
  value: database,
});

/** 내정보 초기화 */
export const __MY_PROFILE_INIT = (profile: object) => ({
  type: MY_PROFILE_INIT,
  value: profile,
});

/** 접속중인 유저 리스트 초기화 */
export const __USERS_INIT = (users: any) => ({
  type: USERS_INIT,
  value: users,
});

/** 전체채팅 업데이트 */
export const __UPDATE_ALL_CHAT = (message: any) => ({
  type: UPDATE_ALL_CHAT,
  value: message,
});

/** 내 방 초기화 */
export const __MY_ROOM_INIT = (room: object) => ({
  type: MY_ROOM_INIT,
  value: room,
});

/** 내 방 초기화 */
export const __ROOMS_INIT = (rooms: object) => ({
  type: ROOMS_INIT,
  value: rooms,
});
