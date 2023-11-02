<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSoundcloud } from "~/store/soundcloud";
const { soundcloudId } = defineProps<{
  soundcloudId: number;
}>()

const soundcloudStore = useSoundcloud()
const { setIsPlaying, setPlayingId } = soundcloudStore;
const { isPlaying, playingId } = storeToRefs(soundcloudStore);

const isDisabled = ref(false);
const handlePlay = ():void => {
  console.log('handlePlay', soundcloudId);
  if ( playingId.value === soundcloudId ) {
    setPlayingId(null);
  } else {
    setIsOpen(true);
    setPlayingId(soundcloudId);
  }
  isDisabled.value = true;
  setTimeout(() => {
    isDisabled.value = false;
  }, 1000);
}
</script>
<template>
  <button @click="handlePlay" class="border-white border hover:bg-orange-600 rounded-full flex items-center justify-center h-20 w-20 text-5xl text-white opacity-70 hover:opacity-90 drop-shadow-md" :disabled="isDisabled" >
    <Icon v-if="!isPlaying || (playingId !== soundcloudId)" name="mdi:play" />
    <Icon v-else name="mdi:stop" />
  </button>
</template>
