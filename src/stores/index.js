import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useGeneralStore = defineStore("markers", () => {
  const markers = ref([]);
  const setMarker = (marker) => (markers.value = marker);
  const updateMarker = (marker) => markers.value.push(marker);

  return { markers, setMarker, updateMarker };
});
