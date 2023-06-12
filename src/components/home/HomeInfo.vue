<template>
  <div class="container" :class="infoIsActive ? 'active' : ''">
    <div class="hide" @click="setInfoIsActive(!infoIsActive)"></div>
    <div class="info">
      <Pill class="title" text="Jonas von Arb" />
      <Pill
        class="intro"
        text="frontend developer, data enthusiast und designer <br/> working at [A/Z&T](https://azt.ch/), Zürich Switzerland"
      />
      <Pill
        class="intro"
        text="<a href='mailto:mail@jonasvonarb.ch'>Contact</a>"
      />
    </div>
    <template v-if="infoIsActive">
      <div v-if="isLargeScreen" class="header small">
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
      <div class="header small" v-else>
        <div>
          titel <br />
          year <br />
          info <br />
          colab [] or Studio
        </div>
        <div class="arrow">
          <ArrowDown />
        </div>
      </div>
      <div class="projects">
        <div
          class="subtitle small"
          v-html="mToH(`### Design, Concept & Code`)"
        />
        <template v-for="year in Object.keys(data)">
          <template v-for="l in data[year]">
            <div class="project" v-if="l.work === 'DCC'">
              <div class="title" v-html="mToH(l.link)" />
              <div
                class="year"
                :class="!isLargeScreen ? 'dark' : ''"
                v-html="year.replace('year', '')"
              />
              <div v-html="mToH(l.content)" />
              <div
                :class="!isLargeScreen ? 'dark' : ''"
                v-html="mToH(l.colab)"
              />
            </div>
          </template>
        </template>
        <div class="subtitle small" v-html="mToH(`### Code only`)" />
        <template v-for="year in Object.keys(data)">
          <template v-for="l in data[year]">
            <div class="project" v-if="l.work === 'C'">
              <div class="title" v-html="mToH(l.link)" />
              <div
                class="year"
                :class="!isLargeScreen ? 'dark' : ''"
                v-html="year.replace('year', '')"
              />
              <div v-html="mToH(l.content)" />
              <div
                :class="!isLargeScreen ? 'dark' : ''"
                v-html="mToH(l.colab)"
              />
            </div>
          </template>
        </template>
        <div class="subtitle small" v-html="mToH(`### Print`)" />
        <template v-for="year in Object.keys(data)">
          <template v-for="l in data[year]">
            <div class="project" v-if="l.work === 'P'">
              <div class="title" v-html="mToH(l.link)" />
              <div
                class="year"
                :class="!isLargeScreen ? 'dark' : ''"
                v-html="year.replace('year', '')"
              />
              <div v-html="mToH(l.content)" />
              <div
                :class="!isLargeScreen ? 'dark' : ''"
                v-html="mToH(l.colab)"
              />
            </div>
          </template>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup>
import Pill from "@/components/UI/Pill.vue";
import { mToH } from "@/helper";
import ArrowDown from "@/icons/ArrowDown.vue";
import { useMediaQuery } from "@vueuse/core";
import data from "@/assets/data";
import { useGeneralStore } from "../../stores";
import { storeToRefs } from "pinia";
const store = useGeneralStore();
const setInfoIsActive = store.setInfoIsActive;
const { infoIsActive } = storeToRefs(store);

const isLargeScreen = useMediaQuery("(min-width: 600px)");
</script>

<style lang="stylus">
.container
  position fixed
  z-index 100
  width 100%
  height 100%
  overflow-x hidden
  overflow-y scroll
  flex-direction column
  align-items flex-start
  color white
  padding 24px
  pointer-events none
  &.active
    pointer-events all
    .hide
      background-color red
  .hide
    height 30px
    width 24px
    border-radius 5px
    background-color green
    position fixed
    right 36px
    border solid var(--lightGray)
    cursor pointer
    z-index 2000
    pointer-events all
    &:hover
      opacity 0.6
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
    margin-left 10px
    margin-top 0px
    position fixed
    width calc(100% - 48px)
    height auto
    display flex
    flex-direction column
    align-items: flex-start
    gap 8px
  .projects
    padding 0 12px
    position fixed
    top 93vh
    background-color var(--anthracite)
    width calc(100%);
    height auto
    min-height calc(100% - 93vh - 48px)
    overflow-x scroll
    position relative
    border solid var(--anthracite)
    border-radius 5px
    margin-bottom calc(100vh + 24px)
    // border var(--lightGray) solid
    box-shadow: 0px 0px 12px 2px var(--anthracite);
    -webkit-box-shadow: 0px 0px 12px 2px var(--anthracite);
    -moz-box-shadow: 0px 0px 12px 2px var(--anthracite);
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
    height: 100%;
    padding: 14px;
    overflow-y: scroll;
    .header
      top calc(65vh - 70px)
      width calc(100% - 48px)
      grid-template-columns: 1fr;
      margin 0 23px
      padding 3px 0
      z-index 0
    .info
      padding-top 3px
      margin-left 5px
    .hide
      right 12px
      top 12px
    .projects
      width 100%;
      top 65vh
      padding 0 10px
      margin-bottom calc(65vh)
      .project
        padding 3px 0
        padding-bottom 60px
        display flex
        flex-wrap wrap
        border-top solid white
        div
          width 100%
        .title
          padding-bottom 0
        .dark
          color rgb(150,150,150)
        .year
          width 50px
</style>
