<template>
  <div id="app">
    <div id="nav">
      <Bingo />
    </div>
  </div>
</template>
<script>
  import Bingo from "@/views/Bingo";
  export default {
    components: {
      Bingo
    }
  }
</script>
<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>