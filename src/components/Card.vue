<template>
  <div class="card">
    <div class="card__top">
      <p class="card__name">
        {{ result.name }}
      </p>
      <p class="card__type">Type: {{ result.type }}</p>
    </div>
    <div class="card__content">
      <div class="card__full-name">
        {{ result.display_name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, defineProps } from "vue";
import { TGetResult } from "../stores/SearchStore";

const props = defineProps({
  result: {
    type: Object as PropType<TGetResult>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 2px 6px 1px #0000001a;
  padding: 10px;
  border-radius: 8px;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__name {
    font-weight: 600;
  }

  &__type {
    color: rgb(100, 100, 100);
    font-size: 12px;
  }

  &__content {
    margin-top: 8px;
  }
}
</style>
