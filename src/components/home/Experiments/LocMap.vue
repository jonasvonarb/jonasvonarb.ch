<template>
  <div v-if="!loading">{{ d }}</div>
  <div v-else>loading...</div>
</template>

<script setup>
import { createClient } from "@supabase/supabase-js";
import { onMounted, ref, watch, watchEffect } from "vue";

const loading = ref(false);
const d = ref();

const supabaseUrl = "https://pgoqiciappgtminvyhev.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
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
  const data = await fetch("http://ip-api.com/json/")
    .then((response) => response.json())
    .then((data) => (place.value = data));
};

const getPlace = async (d) => {
  const lat = d.lat;
  const lng = d.lng;
  // loading.value = true;
  await fetch(
    // [out:json][timeout:25];(node["tourism"="museum"](41.884067934462,12.482528686523,41.89707040541,12.500360012054);way["tourism"="museum"](41.884067934462,12.482528686523,41.89707040541,12.500360012054);relation["tourism"="museum"](41.884067934462,12.482528686523,41.89707040541,12.500360012054););out;>;out skel qt;
    //     "https://www.overpass-api.de/api/interpreter?" +
    // "data=[out:json][timeout:25];" +
    // `(nwr["ice_cream"](around:1000000,${d.lat},${d.lng});` +
    // `way["amenity"="ice_cream"](around:1000000,${d.lat},${d.lng});` +
    // `relation["amenity"="ice_cream"](around:1000000,${d.lat},${d.lng}););` +
    // "out 40;"
    `https://nominatim.openstreetmap.org/search.php?amenity=cafe&state=${d.regionName}&city=${d.city}&format=json`
  )
    .then((r) => r.json())
    .then((data) => {
      nominatimData.value = data;
    });
};

watchEffect(() => {
  if (place.value?.city) {
    getPlace(place.value);
  }
});

watch(nominatimData, (newData) => {
  // writeData(supabase, newData);
  getData(supabase, newData);
});

const writeData = async (supabase, location) => {
  const l = location;
  // const l = location[(Math.random(location.length - 1) * 10).toFixed(0)];
  try {
    const { error } = await supabase.from("jonasvoarb_localisations").insert({
      place_id: l.place_id,
      display_name: l.display_name,
      lat: l.lat,
      lon: l.lon,
      type: l.type,
    });
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
  try {
    loading.value = true;
    const { data, error } = await supabase
      .from("jonasvoarb_localisations")
      .select();

    if (!data.find((x) => x.place_id === l.place_id)) {
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
