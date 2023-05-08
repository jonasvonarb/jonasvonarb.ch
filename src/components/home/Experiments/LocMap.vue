<template>
  <div v-if="!loading">{{ d }}</div>
  <div v-else>loading...</div>
</template>

<script setup>
import { createClient } from "@supabase/supabase-js";
import { onMounted, ref } from "vue";

const loading = ref(false);
const d = ref();

onMounted(() => {
  const supabaseUrl = "https://pgoqiciappgtminvyhev.supabase.co";
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  getData(supabase);
  setData();
});

const setData = async () => {
  fetch("https://api.3geonames.org/?randomland=yes&json=1")
    .then((res) => res.json())
    .then((data) => console.log(data));
};

const getData = async (supabase) => {
  try {
    loading.value = true;
    const { data, error } = await supabase
      .from("jonasvoarb_localisations")
      .select();

    d.value = data;
    console.log(data.value);
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
