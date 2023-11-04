<script setup lang="ts">
// reference: https://www.hyperui.dev/components/marketing/cards
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { storeToRefs } from 'pinia';
import { useSoundcloud } from "~/store/soundcloud";
import type { Onair as OnairProps } from "~/types/microcms";
import NoJacket from "./no-jacket.jpg";

type Props = {
  article: OnairProps & MicroCMSContentId & MicroCMSDate;
};
const { article } = defineProps<Props>();

const mySoundcloudId = ref<number | null>(null);
const isActive = ref(false);
if(article.soundcloud_embedcode){
  const { $extractSoundcloudIdFromEmbedcode } = useNuxtApp();
  mySoundcloudId.value = $extractSoundcloudIdFromEmbedcode(article.soundcloud_embedcode) ?? null;
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
  <div class="wrapper group relative flex flex-col rounded-lg bg-black w-fit hover:scale-105 transition-transform .2s ease-in-out">
    <Image
      alt="Developer"
      :src="article.jacket?.url"
      :width="article.jacket?.width"
      :height="article.jacket?.height"
      :noImgSrc="NoJacket"
      cropPosition="top"
      fit="crop"
      class="absolute inset-0 h-full w-full rounded-lg object-cover opacity-75 transition-opacity group-hover:opacity-40"
    />
    <div class="relative z-10 p-2 pb-4 lg:p-3 lg:pb-8">
      <p class="text-sm font-tertiary font-medium uppercase tracking-widest text-pink-500">
        <span class="bg-black">
          {{ article.airdate  }}
        </span>
      </p>
  
      <h3 class="title text-2xl text-stroke-1 text-stroke-black font-primary font-bold tracking-wider sm:text-3xl">
        {{ article.title }}
      </h3>

      <OnairPlayButton v-if="article.soundcloud_embedcode" :embedcode="article.soundcloud_embedcode"
        class="play_button mt-6 border rounded-full flex items-center justify-center h-16 w-16 text-5xl opacity-80 hover:opacity-90 drop-shadow-md"
        :class="{
          'border-red-500 text-white bg-red-400/70 hover:bg-red-500 hover:text-white': isActive,
          'border-white text-white hover:bg-red-500/80': !isActive,
        }"
      />

      <NuxtLink
        :to="`/onair/${article.id}`" 
        class="btn mt-6 p-2 font-tertiary text-sm font-medium border-black/70 bg-black/30 group-hover:bg-black/70 text-lime-500 hover:text-lime-300 uppercase tracking-widest "
      >
        Read More
        <Icon name="mdi:book-open-page-variant-outline" />
      </NuxtLink>
    </div>
    <div class="w-full mt-auto">
      <div
        class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <p v-if="article.description" class=" text-sm font-secondary p-2 text-white leading-tight">
          <span class="">{{ article.description.substring(0, 140) + '...' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
.wrapper
  box-shadow: 0 0 0 5px black, 0 0 0 6px white
</style>
