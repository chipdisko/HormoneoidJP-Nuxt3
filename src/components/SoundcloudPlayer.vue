<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSoundcloud } from "~/store/soundcloud";

const soundcloudStore = useSoundcloud()
const { setPlayingId, setIsOpen } = soundcloudStore;
const { playingId, isPlaying, isOpen } = storeToRefs(soundcloudStore);

const handleOpener = () => {
  setIsOpen(!isOpen.value);
}


</script>

<template>
  <div v-if="playingId">
    <div
      class="fixed bottom-0 left-0 md:w-[700px] transition-all duration-500 ease-in-out"
      :class="{
        ' translate-y-full': !isOpen,
        ' translate-y-0': isOpen
        
      }"
    >
      <div class="relative lg:w-[560px]">
        <button @click="handleOpener" class="absolute left-0 -top-14 text-5xl text-white hover:text-lime-400">
          <Icon
            class=" transition-transform duration-500 ease-in-out"
            :class="{
              'rotate-90': isOpen,
              'rotate-45': !isOpen          
            }" name="mdi:escalator-up"
          />
        </button>
        <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" :src="`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${playingId}&color=%23ff5500&auto_play=${isPlaying ? 'true':'false'}&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`"></iframe>
      </div>
    </div>
  </div>
</template>