<script lang="typescript">
</script>

<section class="modal" class:modal-on={$$props.isModal}>
  <slot />
</section>

<style lang="scss">
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    color: #fff;
    opacity: 0;
    transition: 0.4s ease-in-out;
    -webkit-transition: 0.4s ease-in-out;
    z-index: 0;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
    &-on {
      opacity: 1;
      z-index: 2;
    }
  }
</style>
