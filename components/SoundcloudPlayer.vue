<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useSoundcloud } from "~/store/soundcloud";

  const soundcloudStore = useSoundcloud();
  const { setPlayingId, setIsOpen } = soundcloudStore;
  const { playingId, isPlaying, isOpen } = storeToRefs(soundcloudStore);

  const handleOpener = () => {
    setIsOpen(!isOpen.value);
  };
</script>

<template>
  <div v-if="playingId">
    <div
      class="fixed z-20 bottom-0 w-full lg:w-fit left-0 transition-all duration-500 ease-in-out"
      :class="{
        ' translate-y-full': !isOpen,
        ' translate-y-0': isOpen,
      }"
    >
      <div class="relative lg:w-[560px]">
        <button
          @click="handleOpener"
          class="absolute right-0 md:right-auto md:left-0 -top-14 text-5xl text-white hover:text-lime-400"
        >
          <Icon
            class="transition-transform duration-500 ease-in-out"
            :class="{
              'rotate-180': isOpen,
              'rotate-0': !isOpen,
            }"
            name="mdi:arrow-up-drop-circle-outline"
          />
        </button>
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameborder="no"
          allow="autoplay"
          :src="`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A${playingId}&color=%23ff5500&auto_play=${
            isPlaying ? 'true' : 'false'
          }&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`"
        ></iframe>
      </div>
    </div>
  </div>
</template>
