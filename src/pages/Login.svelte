<script lang="typescript">
  import { onMount, tick } from "svelte";
  import { state, store } from "../store/store";
  import { fbInit } from "../store/service/firebase/init";
  import { __MY_PROFILE_INIT } from "../store/action";
  import { logout } from "../store/service/firebase/login";
  import {
    loginId$,
    loginPwd$,
    loginClick$,
  } from "../store/service/RxJS/login";

  let id: string;
  let pwd: number;

  $: loginId$.next(id);
  $: loginPwd$.next(pwd);

  const onLogin = (event: Event) => loginClick$.next(event);

  onMount(async () => {
    let database = store.getState().database$;

    if (!database) {
      fbInit();
    }

    await tick();
    logout();

    state.dispatch(__MY_PROFILE_INIT({}));
  });
</script>

<section class="login">
  <div class="login-bg">
    <div class="login-form">
      <div class="login-inputs">
        <input type="text" bind:value={id} placeholder="사용할 닉네임" />
        <input type="password" bind:value={pwd} placeholder="비밀번호" />
      </div>
      <div class="login-button"><button on:click={onLogin} /></div>
      <div class="warning">구현중입니다.</div>
    </div>
  </div>
</section>

<style lang="scss">
  .login {
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
    &-bg {
      background-image: url("../../images/layout/login.png");
      width: 1100px;
      height: 820px;
      background-size: contain;
      background-repeat: no-repeat;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: flex-end;
    }
    &-form {
      width: 410px;
      margin-bottom: 45px;
      &::after {
        content: "";
        height: 50px;
        display: block;
        background: #2da1d3;
        margin-top: 25px;
      }
    }
    &-inputs {
      width: 174px;
      margin-left: 114px;
      display: inline-block;
      > input {
        width: 174px;
        height: 30px;
        &:first-child {
          margin-bottom: 10px;
        }
        display: block;
      }
    }
    &-button {
      display: inline-block;
      margin-left: 10px;
      vertical-align: top;
      > button {
        width: 80px;
        height: 70px;
        opacity: 0;
        cursor: pointer;
      }
    }

    .warning {
      background-color: #278bc7;
      width: 370px;
      height: 113px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 20px;
      font-weight: 600;
    }
  }
</style>
