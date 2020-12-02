<script lang="typescript">
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import { logout } from "./store/service/firebase/login";
  import { myRoomClose } from "./store/service/firebase/room";

  const beforeUnload = () => {
    logout();
  };
</script>

<svelte:window on:beforeunload={beforeUnload} />

<section class="bg">
  <Router {routes} />
</section>

<style lang="scss" global>
  @import "./scss/global";

  .bg {
    position: relative;
    background-image: url("../images/bg/window.jpg");
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
