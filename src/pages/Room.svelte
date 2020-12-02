<script lang="javascript">
  import { beforeUpdate, onDestroy, onMount, tick } from "svelte";
  import { push } from "svelte-spa-router";
  import { myRoomClose } from "../store/service/firebase/room";
  import { store } from "../store/store";

  let myProfile = store.getState().myProfile$;
  let myRoomKey = store.getState().myRoomKey$;

  store.subscribe(() => {
    myProfile = store.getState().myProfile$;
    myRoomKey = store.getState().myRoomKey$;
  });

  onMount(async () => {
    await tick();
    if (!myProfile) {
      push("/");
    } else {
      console.log(myRoomKey);
    }
  });

  onDestroy(() => {
    myRoomClose();
  });
</script>

zz

<style lang="scss">
</style>
