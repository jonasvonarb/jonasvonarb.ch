<template>
  <div>
    <div v-if="!loading">{{ d }}</div>
    <div v-else>loading...</div>
    <BasicPure
      :supabase="supabase"
      :markerPos="markers"
      :infoIsActive="infoIsActive"
    />
  </div>
</template>

<script setup>
import { createClient } from "@supabase/supabase-js";
import { onMounted, ref, watch, watchEffect } from "vue";
import { applyReactInVue, applyPureReactInVue } from "veaury";
import { useGeneralStore } from "@/stores";

import BasicReactComponent from "./react_app/ReactMap";
import { storeToRefs } from "pinia";

const generalStore = useGeneralStore();

const { markers, infoIsActive } = storeToRefs(generalStore);

const BasicPure = applyPureReactInVue(BasicReactComponent);

const loading = ref(false);
const d = ref();

const supabaseUrl = "https://pgoqiciappgtminvyhev.supabase.co";
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnb3FpY2lhcHBndG1pbnZ5aGV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM0NDc5ODAsImV4cCI6MTk5OTAyMzk4MH0.UHa8uTLtwQFDWRC-LEJTUCr684R3Aef8WVIenHSHMS4";
const supabase = createClient(supabaseUrl, supabaseKey);

onMounted(() => {
  const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  const lat = getRandomArbitrary(-90, 90).toFixed(4).toString();
  const lng = getRandomArbitrary(-170, 180).toFixed(4).toString();
  const loc =
    (Math.sign(lat) === -1 ? "" : "+") +
    lat +
    "" +
    (Math.sign(lng) === -1 ? "" : "+") +
    lng;

  getLocation();
});
const place = ref();
const nominatimData = ref();

const getLocation = async () => {
  const data = await fetch("https://ipapi.co/json")
    .then((response) => response.json())
    .then((data) => (place.value = data));
};

const getPlace = async (d) => {
  await fetch(
    `https://nominatim.openstreetmap.org/search.php?amenity=bicycle_parking&state=${d.region}&city=${d.city}&format=json`
  )
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      nominatimData.value = data;
    });
};

watchEffect(() => {
  if (place.value?.city) {
    getPlace(place.value);
  }
});

watch(nominatimData, (newData) => {
  writeData(supabase, newData);
  getData(supabase, newData);
});

const writeData = async (supabase, location) => {
  // const l = location;
  const l =
    location && location[(Math.random(location.length - 1) * 10).toFixed(0)];
  try {
    const data = await supabase.from("jonasvoarb_localisations").select();
    generalStore.setMarker(data.data);
    const ids = data.data.map((x) => {
      return x?.["place_id"];
    });
    if (l && !ids.includes(l?.place_id)) {
      const { error } = await supabase.from("jonasvoarb_localisations").insert({
        place_id: l.place_id,
        display_name: l.display_name,
        lat: l.lat,
        lon: l.lon,
        type: l.type,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("error", error.message);
    }
  } finally {
    loading.value = false;
  }
};

const getData = async (supabase, location) => {
  const l = location[(Math.random(location.length - 1) * 10).toFixed(0)];
  console.log("location", location);
  try {
    loading.value = true;
    const { data, error } = await supabase
      .from("jonasvoarb_localisations")
      .select();
    if (!data.find((x) => l && x?.place_id === l?.place_id)) {
      writeData(supabase, l);
    }

    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error", error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
