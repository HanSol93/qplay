<script lang="javascript">
  import { onMount, tick } from "svelte";
  import { onFirebase } from "../store/service/firebase/subscribe";
  import Modal from "../component/organisms/modal.svelte";
  import { store } from "../store/store";
  import { createRoom } from "../store/service/firebase/createRoom";
  import {
    myProfile$,
    allChat$,
    sendAllChat$,
  } from "../store/service/RxJS/allChat";
  import { push } from "svelte-spa-router";

  onMount(() => {
    onFirebase();
  });

  let users = store.getState().userList$;
  let rooms = store.getState().roomsList$;
  let allChatArray = store.getState().allChatArray$;
  let myProfile = store.getState().myProfile$;
  let myRoomKey = store.getState().myRoomKey$;
  let allChatListEl = null;
  let isModal = false;
  let createRoomName = "";

  store.subscribe(async () => {
    users = store.getState().userList$;
    rooms = store.getState().roomsList$;
    allChatArray = store.getState().allChatArray$;
    myProfile = store.getState().myProfile$;
    myRoomKey = store.getState().myRoomKey$;

    await tick();
    if (!allChatListEl) return false;
    allChatListEl.scrollTop = allChatListEl.scrollHeight;
  });

  $: myProfile$.next(myProfile);

  const onSendAllChat = (event) => sendAllChat$.next(event);

  const onCreateRoom = () => {
    if (!createRoomName) return false;

    createRoom(createRoomName, myProfile.id);

    push(`/room/${myRoomKey.key}`);
  };
</script>

<svelte:body
  on:click={(event) => {
    const isModelEl = event.target.parentElement.classList[0] === 'modal';
    if (isModelEl) return false;
    if (event.target.name !== 'create-room') isModal = false;
  }} />

<section class="room-list">
  <div class="room-list-bg">
    <div class="room-list-left">
      <div class="room-list-rooms">
        {#if rooms}
          {#each rooms as room}
            <div class="room-list-room">
              <p>
                <span class="room-list-users-length">
                  {room.users.length}
                </span>
                <span class="room-list-users-hidden" />
              </p>
              <h1>{room.name}</h1>
            </div>
          {/each}
        {/if}
      </div>
      <div class="room-list-buttons">
        <button name="create-room" on:click={() => (isModal = true)} />
        <div class="room-list-buttons-hidden" />
      </div>
      <div class="room-list-all-chat">
        <div class="room-list-all-chat-list" bind:this={allChatListEl}>
          {#if allChatArray}
            {#each allChatArray as chat}
              <p>{chat.id} : {chat.message}</p>
            {/each}
          {/if}
        </div>
        <div>
          <div class="room-list-all-chat-form">
            <div class="room-list-all-chat-checkbox">모두에게</div>
            <div class="room-list-all-chat-form-input">
              <input
                type="text"
                bind:value={$allChat$}
                on:keypress={onSendAllChat} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="room-list-right">
      <div class="room-list-users">
        {#if users}
          {#each users as user}
            <p>{user.id}</p>
          {/each}
        {/if}
      </div>
      <div class="room-list-banner" />
      <div class="room-list-my-profile">내정보</div>
    </div>
  </div>
</section>

<Modal {isModal}>
  <div class="create-room">
    <div class="modal create-room-items">
      <div class="create-room-item" />
    </div>
    <div class="modal create-room-form">
      <input type="text" bind:value={createRoomName} />
      <div class="create-room-form-hidden">구현중입니다.</div>
      <button
        class="create-room-form-send-button"
        on:click={() => {
          onCreateRoom();
        }} />
    </div>
  </div>
</Modal>

<style lang="scss">
  .room-list {
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
    z-index: 1;
    &-bg {
      width: 1100px;
      height: 825px;
      background-image: url("../../images/layout/room-list.png");
      background-size: contain;
      background-color: #171c4b;
      display: flex;
    }
    &-left {
      margin-top: 96px;
      margin-left: 22px;
      width: 708px;
    }
    &-right {
      margin-top: 96px;
      margin-left: 10px;
      width: 338px;
    }
    &-rooms {
      height: 328px;
      display: flex;
      padding: 15px 50px 5px 15px;
    }
    &-users-hidden {
      top: 8px;
      right: 44px;
      width: 18px;
      height: 25px;
      background: #de6e9b;
      z-index: 0;
    }
    &-users-length {
      z-index: 1;
    }
    &-room {
      width: 50%;
      height: 72px;
      background-image: url("../../images/layout/room.png");
      background-size: cover;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 8px;
        left: 10px;
        width: 50px;
        height: 25px;
        background: #f38bbc;
      }
      > p {
        text-align: right;
        padding-top: 12px;
        padding-right: 45px;
        font-size: 22px;
        position: relative;
        > span {
          position: absolute;
        }
      }
    }
    &-buttons {
      padding-left: 37px;
      height: 58px;
      margin-top: 8px;
      display: flex;
      > button {
        width: 140px;
        height: 50px;
        opacity: 0;
        margin-top: 2px;
        margin-left: 3px;
        cursor: pointer;
      }
      &-hidden {
        background: #d3e5f9;
        width: 473px;
        height: 57px;
        margin-left: 8px;
        border-bottom-right-radius: 13px;
      }
    }
    &-all-chat {
      height: 270px;
      &-list {
        height: 192px;
        color: white;
        overflow: auto;
        margin: 30px 17px 13px;
        > p {
          padding-bottom: 5px;
          width: 630px;
        }
      }
      &-checkbox {
        color: white;
        width: 160px;
        margin-top: 4px;
      }
      &-form {
        display: flex;
        margin-top: 10px;
        margin-left: 20px;
        &-input {
          > input {
            background-color: #3d528f;
            border: 0;
            color: white;
            font-size: 17px;
            padding: 3px;
            width: 480px;
          }
        }
      }
    }
    &-users {
      height: 326px;
      padding: 50px 20px 0;
      color: white;
      overflow: auto;
    }
    &-banner {
      height: 113px;
    }
    &-my-profile {
      height: 157px;
      margin-top: 18px;
    }
  }

  .create-room {
    background-image: url("../../images/layout/create-room.jpeg");
    width: 600px;
    height: 670px;
    padding-top: 70px;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 70px 26px 0px;
    &-items {
      height: 344px;
      width: 230px;
    }
    &-item {
      width: 196px;
      height: 35px;
      margin: 8px 7px;
      border-radius: 4px;
      border: 3px solid yellow;
    }
    &-form {
      width: 540px;
      padding: 8px 12px 8px 12px;
      height: 159px;
      > input {
        font-size: 20px;
        margin-left: 100px;
        padding: 0 7px;
        width: 398px;
        height: 32px;
        background: transparent;
        border: 0;
        margin-bottom: 10px;
      }
      &-hidden {
        background: #82a9cf;
        height: 92px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 23px;
      }
      &-send-button {
        margin-top: 50px;
        margin-left: 125px;
        width: 123px;
        height: 41px;
        opacity: 0;
        cursor: pointer;
      }
    }
  }
</style>
