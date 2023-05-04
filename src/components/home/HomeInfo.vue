<template>
  <div class="container">
    <div class="info">
      <Pill class="title" text="Jonas von Arb" />
      <Pill
        class="intro"
        text="Frontend Entwickler und Designer at [A/Z&T](https://azt.ch/)"
      />
      <Pill
        class="intro"
        text="<a href='mailto:mail@jonasvonarb.ch'>Contact</a>"
      />
    </div>
    <div class="hide" :class="'active'" />
    <div class="header small">
      <div>
        titel <br />
        info
      </div>
      <div>
        year <br />
        colab [] or Studio
      </div>
      <div class="arrow">
        <ArrowDown />
      </div>
    </div>
    <div class="projects">
      <div class="subtitle small" v-html="mToH(`### Design, Concept & Code`)" />
      <template v-for="year in Object.keys(data)">
        <template v-for="l in data[year]">
          <div class="project" v-if="l.work === 'DCC'">
            <div class="title" v-html="mToH(l.link)" />
            <div class="year" v-html="year.replace('year', '')" />
            <div v-html="mToH(l.content)" />
            <div v-html="mToH(l.colab)" />
          </div>
        </template>
      </template>
      <div class="subtitle small" v-html="mToH(`### Code only`)" />
      <template v-for="year in Object.keys(data)">
        <template v-for="l in data[year]">
          <div class="project" v-if="l.work === 'C'">
            <div class="title" v-html="mToH(l.link)" />
            <div class="year" v-html="year.replace('year', '')" />
            <div v-html="mToH(l.content)" />
            <div v-html="mToH(l.colab)" />
          </div>
        </template>
      </template>
      <div class="subtitle small" v-html="mToH(`### Print`)" />
      <template v-for="year in Object.keys(data)">
        <template v-for="l in data[year]">
          <div class="project" v-if="l.work === 'P'">
            <div class="title" v-html="mToH(l.link)" />
            <div class="year" v-html="year.replace('year', '')" />
            <div v-html="mToH(l.content)" />
            <div v-html="mToH(l.colab)" />
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import Pill from "@/components/UI/Pill.vue";
import { mToH } from "@/helper";
import ArrowDown from "@/icons/ArrowDown.vue";

import data from "@/assets/data";
</script>

<style lang="stylus">
.container
  width 100%
  height 100%
  overflow-x hidden
  overflow-y scroll
  flex-direction column
  align-items flex-start
  color white
  padding 24px
  .hide
    height 24px
    width 24px
    border-radius 5px
    background-color red
    position fixed
    right 36px
    border solid var(--lightGray)
    cursor pointer
    &:hover
      background-color blue
  .header
    pointer-events none
    position fixed
    top calc(93vh - 60px)
    left 0
    border-top solid white 2px
    width calc(100% - 75px)
    display grid
    grid-template-columns: 1fr 1fr;
    margin 38px
    padding 3px 0
    z-index 10000
    mix-blend-mode difference
    text-transform uppercase
    color white
    .arrow
      position absolute
      top 3px
      right 0
    .hideButton
      position absolute
      top -18px
      right 12px
  .info
    position fixed
    width calc(100% - 48px)
    height auto
    display flex
    flex-direction column
    align-items: flex-start
    gap 6px
  .projects
    padding 0 12px
    position fixed
    top 93vh
    background-color var(--anthracite)
    width calc(100%);
    height auto
    min-height calc(100vh - 93vh - 48px)
    overflow-x scroll
    position relative
    border solid var(--anthracite)
    border-radius 5px
    margin-bottom calc(100vh + 24px)
    // box-shadow: 0px 0px 10px 2px var(--anthracite);
    // -webkit-box-shadow: 0px 0px 10px 2px var(--anthracite);
    // -moz-box-shadow: 0px 0px 10px 2px var(--anthracite);
    > .subtitle
    > .header
      width 100%
      padding-bottom 40px
      padding-top 4px
    .project
      display grid
      border-top solid 2px
      grid-template-columns: 1fr 1fr;
      padding 0 0 80px 0
      div
        padding-right 50px

  .title
    font-family EverettBlack
    text-transform uppercase
@media (max-width: 600px)
  .container
    height 100vh;
    height -moz-available;
    height -webkit-fill-available;
    height fill-available;
    .info
      height 10%
    .projects
      height auto;
      width calc(100% - 24px);
      .project
        padding 12px
        display flex
        flex-wrap wrap
        border-top solid white
        div
          width 100%
          border none
        .title
          padding-bottom 0
        .year
          width 50px
</style>
