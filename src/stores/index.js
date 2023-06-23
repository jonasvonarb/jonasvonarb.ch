import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", () => {
  const infoIsActive = ref(true);
  const setInfoIsActive = (value) => {
    console.log("set");
    return (infoIsActive.value = value);
  };
  const markers = ref([]);
  const setMarker = (marker) => (markers.value = marker);
  const updateMarker = (marker) => markers.value.push(marker);

  return { infoIsActive, setInfoIsActive, markers, setMarker, updateMarker };
});
