<template>
  <div class="container">
    <h1 class="container__title">Прочешем места? &#127866;</h1>
    <Search />
  </div>
</template>

<script setup>
import Search from "./components/Search.vue";
</script>

<style lang="scss" scoped>
.container {
  max-width: 700px;
  margin: 80px auto;
  padding: 40px 40px;
  box-shadow: 0 3px 10px 2px #0000001a;
  border-radius: 16px;
}
</style>
