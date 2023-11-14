<script setup lang="ts">
// about using <ClientOnly /> :: this button is always called from fetched item so Icons are client-only.

import { storeToRefs } from 'pinia';
import { useSoundcloud } from "~/store/soundcloud";
const { $extractSoundcloudIdFromEmbedcode } = useNuxtApp();
const { embedcode } = defineProps<{
  embedcode: string;
}>()

const mySoundcloudId = ref<number | null>(null);
mySoundcloudId.value = $extractSoundcloudIdFromEmbedcode(embedcode) ?? null;
const soundcloudStore = useSoundcloud()
const { setIsOpen, setIsPlaying, setPlayingId } = soundcloudStore;
const { isPlaying, playingId } = storeToRefs(soundcloudStore);

const isDisabled = ref(false);
const handlePlay = ():void => {
  console.log('handlePlay', mySoundcloudId.value);
  if ( !mySoundcloudId.value ) return;
  if ( playingId.value === mySoundcloudId.value ) {
    setPlayingId(null);
  } else {
    setIsOpen(true);
    setPlayingId(mySoundcloudId.value);
  }
  isDisabled.value = true;
  setTimeout(() => {
    isDisabled.value = false;
  }, 1000);
}
const isActive = ref(false);

watchEffect( () => {
  isActive.value = isPlaying.value && playingId.value === mySoundcloudId.value;
})

</script>
<template>
  <button
    @click="handlePlay"
    :disabled="isDisabled"
    class="button"
    :class="{
      'isActive': isActive,
      'isDisabled': isDisabled
    }"
  >
    <ClientOnly>
      <template #fallback>
        <Icon v-if="isDisabled" name="svg-spinners:ring-resize" />
      </template>
      <Icon v-if="isDisabled" name="svg-spinners:ring-resize" />
      <Icon v-else-if="isActive" name="svg-spinners:pulse-rings-2" />
      <Icon v-else name="line-md:play-filled" />
    </ClientOnly>
    <slot />
  </button>
</template>
<style lang="sass" scoped>
.button:disabled
  @apply bg-transparent border-slate-100 text-slate-100
</style>
