<script setup lang="ts">
// reference: https://www.hyperui.dev/components/marketing/cards
import type { Onair as OnairProps } from "~/types/microcms";
import { storeToRefs } from 'pinia';
import { useSoundcloud } from "~/store/soundcloud";

type Props = {
  article: OnairProps;
};
const { article } = defineProps<Props>();
const description = article.description ? article.description.replace(/\n/g, '').substring(0, 140) + '...' : '';

const { $extractSoundcloudIdFromEmbedcode } = useNuxtApp();
const isSoundcloudActive = ref(false);
const mySoundcloudId = ref<number | null>(null);

const airdate = new Date(article.airdate);
const onairEnd = new Date(airdate.setHours(airdate.getHours() + 2));
const now = ref(new Date());
const isOnairEnd = ref<boolean>(onairEnd < now.value);

onMounted(() => {
  if( article.soundcloud_embedcode ) {
    mySoundcloudId.value = $extractSoundcloudIdFromEmbedcode(article.soundcloud_embedcode) ?? null;
    const soundcloudStore = useSoundcloud();
    const { isPlaying, playingId } = storeToRefs(soundcloudStore);
    
    watchEffect(() => {
      isSoundcloudActive.value = isPlaying.value && (playingId.value === mySoundcloudId.value);
    })
  }
})
</script>

<template>
  <article class="wrapper max-w-[90%] min-w-[90%] sm:max-w-[45%] sm:min-w-[45%] mx-auto sm:mx-0 md:min-w-0 group relative flex flex-col rounded-lg bg-black w-fit hover:scale-105 transition-transform .2s ease-in-out">
    <Image
      :alt="article.title"
      :src="article.jacket?.url"
      :width="article.jacket?.width"
      :height="article.jacket?.height"
      cropPosition="top"
      fit="crop"
      class="absolute inset-0 h-full w-full rounded-lg object-cover opacity-75 transition-opacity group-hover:opacity-40"
    />
    <div class="relative z-10 p-2 pb-4 lg:p-3 lg:pb-8">
      <p class="text-sm font-tertiary font-medium uppercase tracking-widest text-pink-500">
        <span class="bg-black">{{ article.airdate  }}</span>
      </p>
  
      <h3 class="title text-2xl text-stroke-1 text-stroke-black font-primary font-bold tracking-wider sm:text-3xl">
        {{ article.title }}
      </h3>
      <template v-if="!isOnairEnd">
        <OnairCountdown :deadline="article.airdate" is="div" class="text-3xl mt-6" />
      </template>
      <template v-else-if="article.soundcloud_embedcode">
        <div>
          <OnairPlayButton
            :embedcode="article.soundcloud_embedcode"
            class="play_button mt-6 border-2 rounded-full flex items-center justify-center h-16 w-16 text-4xl opacity-80 hover:opacity-90 drop-shadow-md"
            :class="{
              'border-red-500 text-white bg-red-400/70 hover:bg-red-500 hover:text-white': isSoundcloudActive,
              'border-white text-white hover:bg-red-500/80': !isSoundcloudActive,
            }"
          />
        </div>
      </template>

      <NuxtLink
        :to="`/onair/${article.id}`" 
        class="btn mt-6 p-2 font-tertiary text-sm font-medium border-black/70 bg-black/30 group-hover:bg-black/70 text-lime-500 hover:text-lime-300 uppercase tracking-widest "
      >
        Archive
        <Icon name="solar:map-arrow-right-linear" />
      </NuxtLink>
    </div>
    <div class="w-full mt-auto">
      <div
        class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <template v-if="description">
          <p class=" text-sm font-secondary p-2 text-white leading-tight">
            <span class="">{{ description }}</span>
          </p>
        </template>
      </div>
    </div>
  </article>
</template>
<style scoped lang="sass">
.wrapper
  box-shadow: 0 0 0 5px black, 0 0 0 6px white
</style>
~~/store/soundcloud~~/types/microcms