<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSoundcloud } from "~/store/soundcloud";

import type { Onair as OnairProps } from "~/types/microcms";
const { $getOnairTime } = useNuxtApp(); // ~/plugin/linkType.ts

const { article } = defineProps<{
  article: OnairProps;
}>(); 

// debug
//article.airdate = new Date('2023-11-08 01:37:20').toISOString();

const articleDateInLondon = $getOnairTime(article.airdate) ?? '';

function nl2br(str:string):string {
  return str.replace(/\n/g, '<br>');
}
const description = article.description ? nl2br(article.description) : '';


const tracklists = article.tracklists ? article.tracklists.map((tracklist) => {
  return {
    ...tracklist,
    tracklist: nl2br(tracklist.tracklist)
  }
}) : [];

const getArtistNameByParticipantType = (participantType: 'host' | 'guest' | 'guest2') => {
  switch (participantType) {
    case 'guest':
      return article.feat ? article.feat[0].name : 'GUEST';
    case 'guest2':
      return article.feat ? article.feat[1].name : 'GUEST2';
    default:
      return article.host ? article.host[0] : 'Ascalypso B2B KA4U';
  }
}

const { $extractSoundcloudIdFromEmbedcode } = useNuxtApp();
const isSoundcloudActive = ref(false);
const mySoundcloudId = ref<number | null>(null);

const isOnairEnd = ref<boolean>();
const airdate = new Date(article.airdate);
const onairEnd = new Date(airdate.setHours(airdate.getHours() + 2));
const now = ref(new Date());
isOnairEnd.value = onairEnd < now.value;

const isOnMounted = ref(false);

onMounted( ()=> {
  isOnMounted.value = true;
  isOnairEnd.value = onairEnd < new Date();
  if (article.soundcloud_embedcode) {
    mySoundcloudId.value = $extractSoundcloudIdFromEmbedcode(article.soundcloud_embedcode) ?? null;
    const soundcloudStore = useSoundcloud();
    const { isPlaying, playingId } = storeToRefs(soundcloudStore);
    
    isSoundcloudActive.value = isPlaying.value && playingId.value === mySoundcloudId.value;
    watchEffect( () => {
      isSoundcloudActive.value = isPlaying.value && playingId.value === mySoundcloudId.value;
    })
  }
});

</script>

<template>
  <article
    class="article"
  >
    <NuxtImg
      v-if="article.jacket"
      :src="article.jacket.url"
      :alt="article.title"
      lazy
      class="bg pointer-events-none fixed top-0 left-0 z-0 w-full h-full object-cover object-top "
    />
    <div class="relative z-[1] flex flex-col gap-16 lg:gap-20 pt-24 min-h-[100dvh] box-border">
      <div class="img_parent flex flex-col sm:flex-row gap-4 ms:gap-6 md:gap-12 lg:gap-16 xl:gap-20 2xl:max-w-screen-2xl mx-4 md:mx-12 lg:mx-20 2xl:mx-auto">
        <div :class="['img w-full sm:w-[260px] md:w-[400px] lg:w-[500px] self-start shrink-0 grow-0 frame relative flex flex-col rounded-lg bg-black transition-transform  ease-in-out', isOnMounted ? 'active' : '']">
          <template v-if="article.jacket" >
            <NuxtImg
              :src="article.jacket.url"
              :alt="article.title"
              :width="article.jacket.width"
              :height="article.jacket.height"
              cropPosition="top"
              fit="crop"
              class="rounded-lg w-full"
            />
          </template>
        </div>
        <div class="flex flex-col gap-8 md:gap-12">
          <div class="font-official uppercase text-[3.45rem] leading-none sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl">
            <div class="line-text">
              {{ article.channel ?? 'Hormoneoid JP' }}
            </div>
            <h1>
              <span>{{ article.title }}</span>
            </h1>
            <template v-if="article.theme">
              <div>
                <span class=""><span class="line-text">THEME:</span>{{ article.theme }}</span>
              </div>
            </template>
            <div>
              <span>{{ articleDateInLondon }}</span>
            </div>
          </div>
          <template v-if="!isOnairEnd">
            <OnairCountdown skeuo aaja :deadline="article.airdate" class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl w-fit border border-white bg-black/60 hover:bg-black/100 hover:scale-105" />
          </template>
          <template v-else-if="article.soundcloud_embedcode">
            <div>
              <OnairPlayButton
                :embedcode="article.soundcloud_embedcode"
                class="flex items-center gap-4 bg-transparent border rounded-full p-[.33em] pl-[.5em] pr-[.7em] text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-tertiary font-bold  "
                :class="{
                  'border-red-500 text-red-500 hover:bg-red-500 hover:text-white': isSoundcloudActive,
                  'border-white/80 text-white  hover:text-black hover:border-black hover:bg-white': !isSoundcloudActive,
                  
                }"
                >
                <template v-if="isSoundcloudActive">
                  STOP
                </template>
                <template v-else>
                  PLAY
                </template>  
                THE ONAIR
              </OnairPlayButton>
            </div>
          </template>
          <template v-else>
            <button
              disabled
              class="flex items-center justify-center gap-4 bg-transparent border rounded-full p-[.33em] pl-[.5em] pr-[.7em] text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-tertiary font-bold border-white/80 text-white "
            >coming soon</button>
          </template>
          
          <template v-if="article.description">
            <div
              class="font-secondary backdrop-blur-md border-white/10 border bg-black/10"
            >
              <span v-html="description" />
            </div>
          </template>

        </div>
      </div>
      <template v-if="tracklists.length">
        <div class="w-auto mr-4 lg:w-fit max-w-full  lg:mx-auto flex">
          <div class="flex flex-col items-start gap-8">
            <h2 class="sticky top-12 tracklist_title font-tertiary text-5xl lg:text-8xl font-bold text-transparent tracking-[.17em] lg:leading-[.7] translate-y-[6.6em] -rotate-90 origin-top-left w-[1em] h-[6.6em]">
              TRACKLIST
            </h2>
          </div>
          <div
            class="flex flex-col items-stretch gap-8 lg:gap-10 max-w-[1000px] mx-auto"
          >
            <div
              v-for="(tracklist, index) in tracklists"
              :key="'tracklist-'+index"
              class="font-secondary  py-1 px-2 md:p-0 text-sm lg:text-xl leading-snug backdrop-blur-lg bg-slate-950/40 lg:bg-black/0 lg:hover:bg-slate-950/70 transition-colors border-white/10 border "
              >
                <h3 class="font-primary font-extrabold text-2xl lg:text-4xl mb-[.5em] text-stroke-1 text-stroke-black">
                  <span class="after:content-['part:'] after:font-tertiary after:text-base after:ml-[.8em]">
                    {{ getArtistNameByParticipantType(tracklist.artist?.[0]) }}
                  </span>
                </h3>
                <div class="text-stroke-1 text-stroke-black">
                  <span
                  v-html="tracklist.tracklist"
                  />
                </div>
              </div>
          </div>
        </div>
      </template>
      
      <OnairPastFutureButtons :article="article" class="mt-auto" />
      
      <NuxtLink to="/" class="w-[80%] max-w-[400px] mx-auto mb-48 lg:mb-28 border-white/80 border h-[2.6em] flex items-center justify-center gap-[.5em] text-white text-xl md:text-2xl hover:text-lime-500 hover:border-lime-500 hover:bg-slate-950/30 active:bg-black active:duration-75 transition-colors">
        <Icon name="ph:caret-left-fill" />
        Home
      </NuxtLink>
    </div>
  </article>

</template>
<style lang="sass" scoped>
.line-text
  -webkit-text-stroke: 1px white
  color: transparent
      
.text-shadow-far
  text-shadow:1px 1px 0px #111,2px 2px 0px #111, 3px 3px 0px #111

.tracklist_title
  -webkit-text-stroke: 2px #FFF

.bg
  // animation opacity and filter on tailwind.config
  @apply animate-text-focus-in opacity-60
.frame
  box-shadow: 0 0 0 5px black, 0 0 0 6px white
  @screen md
    position: relative
    top: 6px
    left: 6px
.img_parent
  perspective: 1500px
.img
  @screen lg
    transform-style: preserve-3d
    backface-visibility: hidden
    transition-duration: .8s
    transition-delay: .4s
    transform-origin: 0 0
    transform: rotateY(120deg) skewY(-6deg)
    img
      transition: opacity .2s ease-in-out
      opacity: .9
    &:hover,
    &.active
      transform: rotateY(0deg) skewY(0deg)
      img
        opacity: 1
</style>
