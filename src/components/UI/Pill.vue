<template>
  <div v-if="!html" class="pill" v-html="mToH(text)" />
  <div v-else class="pill" v-html="text" />
</template>

<script setup>
import { mToH } from "@/helper";

defineProps({
  text: String,
  html: Boolean,
});
</script>

<style lang="stylus" scoped>
.pill
    display inline-block
    padding 4px 8px
    background-color var(--anthracite)
    color white
    border-radius 5px
    box-shadow: 0px 0px 5px 2px var(--anthracite);
    -webkit-box-shadow: 0px 0px 5px 2px var(--anthracite);
    -moz-box-shadow: 0px 0px 5px 2px var(--anthracite);
</style>
