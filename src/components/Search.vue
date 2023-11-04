<template>
  <input type="text" class="search" v-model="searchText" placeholder="Пиши свой поиск" @keyup="handleInput" />

  <span class="search__preloader" v-if="searchStore.loader">Ищу...</span>
  <span class="search__info" v-if="searchStore.searchResult?.length === 0 && !searchStore.loader">Ничего не нашел :(</span>

  <div class="search__item" v-for="result in searchStore.searchResult" :key="result.place_id">
    <Card :result="result" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useSearchStore } from "../stores/SearchStore";
import Card from "./Card.vue";

const searchStore = useSearchStore();
const searchText = ref("");

const handleInput = () => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    searchStore.getResult(searchText.value);
  }, 500);
};

let timer = null;

watch(
  () => searchStore.searchResult,
  () => {
    clearTimeout(timer);
  }
);
</script>

<style lang="scss" scoped>
.search {
  box-sizing: border-box;
  display: block;
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 40px;
  margin-top: 14px;
  margin-bottom: 30px;
  padding: 0 10px;
  border-radius: 8px;

  &__item {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
