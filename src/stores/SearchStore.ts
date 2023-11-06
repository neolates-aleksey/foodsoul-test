import { defineStore } from "pinia";
import { ref } from "vue";

export type TGetResult = {
  place_id: number;
  name: string;
  display_name: string;
  type: string;
};

export const useSearchStore = defineStore("searchStore", () => {
  const loader = ref(false);
  const searchResult = ref<TGetResult | null>(null);

  const getResult = async (search: string) => {
    loader.value = true;
    const result = await fetch(`https://nominatim.openstreetmap.org/?q=${search}&format=json`);
    const data: TGetResult = await result.json();
    searchResult.value = data;
    loader.value = false;
  };

  return {
    searchResult,
    getResult,
    loader,
  };
});
