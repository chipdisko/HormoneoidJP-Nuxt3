import { ref } from "vue";
import { defineStore } from "pinia";

export const useSoundcloud = defineStore(
  "soundcloud",
  () => {
    const isOpen = ref(true);
    function setIsOpen(bool: boolean) {
      isOpen.value = bool;
    }
    const isPlaying = ref(false);
    function setIsPlaying(bool: boolean) {
      isPlaying.value = bool;
    }
    const playingId = ref<number | null>(null);
    function setPlayingId(id: number | null) {
      playingId.value = id;
      isPlaying.value = !!id;
    }
    return { isOpen, setIsOpen, isPlaying, setIsPlaying, playingId, setPlayingId };
  },
);
