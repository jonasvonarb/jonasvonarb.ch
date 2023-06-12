<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <RouterView />
</template>

<style lang="stylus">
.mapboxgl-map
  :last-child
    pointer-events none

.mapboxgl-canvas-container.mapboxgl-interactive,
.mapboxgl-ctrl-group button.mapboxgl-ctrl-compass
  // cursor grabed !important
</style>
