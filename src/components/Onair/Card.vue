<script setup lang="ts">
// reference: https://www.hyperui.dev/components/marketing/cards
import { storeToRefs } from 'pinia';
import { useSoundcloud } from "~/store/soundcloud";

import type { Onair as OnairProps } from "~/types/microcms";
import NoJacket from "./no-jacket.jpg";

type Props = {
  content: OnairProps;
};
const { content } = defineProps<Props>();
const soundcloudStore = useSoundcloud()
const { isPlaying, playingId } = storeToRefs(soundcloudStore)

function extractNumberFromString(str: string):(number | undefined)  {
  const regex = /\/tracks\/(\d+)/;
  const match = str.match(regex);
  return match ? Number(match[1]) : undefined;
}

const soundcloudId = content.soundcloud_embedcode ? extractNumberFromString(content.soundcloud_embedcode) : undefined;
</script>

<template>
  <div class="wrapper group relative flex flex-col rounded-lg bg-black w-fit hover:scale-105 transition-transform .2s ease-in-out">
    <Image
      alt="Developer"
      :src="content.jacket?.url"
      :width="content.jacket?.width"
      :height="content.jacket?.height"
      :noImgSrc="NoJacket"
      cropPosition="top"
      fit="crop"
      class="absolute inset-0 h-full w-full rounded-lg object-cover opacity-75 transition-opacity group-hover:opacity-40"
    />
    <div class="relative z-10 p-2 pb-4 lg:p-3 lg:pb-8">
      <p class="text-sm font-tertiary font-medium uppercase tracking-widest text-pink-500">
        <span class="bg-black">
          {{ content.date  }}
        </span>
      </p>
  
      <h3 class="title text-2xl text-stroke-1 text-stroke-black font-primary font-bold tracking-wider sm:text-3xl">
        {{ content.title }}
      </h3>

      <OnairPlayButton v-if="soundcloudId" :soundcloudId="soundcloudId" class="mt-6" />
  
    </div>
    <div class="w-full mt-auto">
      <div
        class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <p v-if="content.description" class=" text-sm font-secondary p-2 text-white leading-tight">
          <span class="">{{ content.description.substring(0, 140) + '...' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
.wrapper
  box-shadow: 0 0 0 5px black, 0 0 0 6px white
</style>
