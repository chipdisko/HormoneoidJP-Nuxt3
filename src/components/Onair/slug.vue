<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSoundcloud } from "~/store/soundcloud";

import type { Onair as OnairProps } from "~/types/microcms";
import sample from './sample.json';
const { $getOnairTime } = useNuxtApp(); // ~/plugin/linkType.ts

const { article } = defineProps<{
  article: OnairProps;
}>();


const articleDateInLondon = $getOnairTime(article.airdate) ?? '';

function nl2br(str) {
  return str.replace(/\n/g, '<br>');
}

// const readableArticle = article ? JSON.stringify(article, null, 2) : "";
const { $extractSoundcloudIdFromEmbedcode } = useNuxtApp();
const isActive = ref(false);
const mySoundcloudId = ref(null);
if(article.soundcloud_embedcode){
  mySoundcloudId.value = $extractSoundcloudIdFromEmbedcode(article.soundcloud_embedcode);
  const soundcloudStore = useSoundcloud()
  const { isPlaying, playingId } = storeToRefs(soundcloudStore)
  effect(() => {
    isActive.value = isPlaying.value && playingId.value === mySoundcloudId.value;
  })
  watch( [ isPlaying, playingId ], () => {
    isActive.value = isPlaying.value && playingId.value === mySoundcloudId.value;
  })
}

</script>

<template>
<section v-if="article"
  class="section"
>
  <NuxtImg
    v-if="article.jacket"
    :src="article.jacket.url"
    :alt="article.title"
    lazy
    class="bg pointer-events-none fixed top-0 left-0 z-0 w-full h-full object-cover object-top "
  />
  <div class="relative z-[1] flex flex-col gap-16 pt-24 min-h-[100dvh] box-border">
    <div class="img_parent flex flex-col sm:flex-row gap-10 lg:gap-16 xl:gap-20 2xl:max-w-screen-2xl mx-4 md:mx-12 lg:mx-20 2xl:mx-auto">
      <div class="img w-full sm:w-[260px] md:w-[400px] lg:w-[500px] self-start shrink-0 grow-0 frame relative flex flex-col rounded-lg bg-black transition-transform .2s ease-in-out ">
        <NuxtImg
          v-if="article.jacket" 
          :src="article.jacket.url"
          :alt="article.title"
          :width="article.jacket.width"
          :height="article.jacket.height"
          lazy
          cropPosition="top"
          fit="crop"
          class="rounded-lg w-full"
        />
      </div>
      <div class="flex flex-col gap-12">
        <div class="font-official uppercase text-6xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl">
          <Logo class="line-text" /><br />
          <h1>{{ article.title }}</h1>
          <div>
            <span>{{ articleDateInLondon }}</span>
          </div>
        </div>
        <div>
          <OnairPlayButton
            v-if="mySoundcloudId"
            :embedcode="article.soundcloud_embedcode"
            class="flex items-center gap-4 bg-transparent border rounded-full p-[.33em] pl-[.5em] pr-[.7em] md:text-3xl lg:text-4xl xl:text-5xl font-tertiary font-bold  "
            :class="{
              'border-red-500 text-red-500 hover:bg-red-500 hover:text-white': isActive,
              'border-white/80 text-white  hover:text-black hover:border-black hover:bg-white': !isActive,

            }"
          >
          <template v-if="isActive">
            STOP
          </template>
          <template v-else>
            PLAY
          </template>  
            THE ONAIR
          </OnairPlayButton>
        </div>
        <div v-if="article.description" class="font-secondary backdrop-blur-md border-white/10 border bg-black/10">
          <span
            v-html="nl2br(article.description)"
          />
        </div>

      </div>
    </div>
    <div v-if="article.tracklists || article.tracklist" class="w-fit mx-auto flex">
      <div class="flex flex-col items-start gap-8">
        <h3 class="sticky top-12 tracklist_title font-tertiary text-5xl lg:text-8xl font-bold text-transparent tracking-[.17em] lg:leading-[.7] translate-y-[6.6em] -rotate-90 origin-top-left w-[1em] h-[6.6em]">
          TRACKLIST
        </h3>
      </div>
      <div
        v-if="article.tracklists"
        class=""
      >
        <span
          v-for="(tracklist, index) in article.tracklists"
          :key="tracklist"
          v-html="nl2br(tracklist)"
          class="bg-black"
        />
      </div>
      <div
        v-else-if="article.tracklist"
        class="max-w-[1000px] mx-auto font-secondary text-sm lg:text-2xl leading-snug backdrop-blur-lg bg-slate-950/40 lg:bg-black/0 lg:hover:bg-slate-950/70 transition-colors border-white/10 border text-stroke-1 text-stroke-black"
      >
        <span
          v-html="nl2br(article.tracklist)"
          class=""
        />
      </div>
    </div>
    
    <OnairPastFutureButtons :article="article" class="mt-auto" />

    <NuxtLink to="/" class="w-[80%] max-w-[400px] mx-auto mb-48 lg:mb-28 border-white/80 border h-[2.6em] flex items-center justify-center gap-[.5em] text-white text-xl md:text-2xl hover:text-lime-500 hover:border-lime-500 hover:bg-slate-950/30 active:bg-black active:duration-75 transition-colors">
      <Icon name="ph:caret-left-fill" />
      Home
    </NuxtLink>
  </div>
</section>

</template>
<style lang="sass" scoped>
.tracklist_title
  -webkit-text-stroke: 2px #FFF

.bg
  // animation opacity and filter on tailwind.config
  @apply animate-text-focus-in
.frame
  box-shadow: 0 0 0 5px black, 0 0 0 6px white
  @screen md
    position: relative
    top: 6px
    left: 6px
.line-text
  -webkit-text-stroke: 1px white
  color: transparent
.img_parent
  perspective: 1500px
.img
  @screen lg
    transform-style: preserve-3d
    transform-origin: 0 0
    transform: rotateY(30deg) skewY(-6deg)
    img
      transition: opacity .2s ease-in-out
      opacity: .9
    &:hover
      transform: rotateY(0deg)
      img
        opacity: 1
.text-shadow-far
  text-shadow:1px 1px 0px #111,2px 2px 0px #111, 3px 3px 0px #111
</style>
