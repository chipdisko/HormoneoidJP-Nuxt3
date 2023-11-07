<script setup lang="ts">
const { deadline } = defineProps<{
  deadline: string;
}>();

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const deadlineTime = Date.parse(deadline);

onMounted(() => {
  const getTime = () => {
    const timeLeft = deadlineTime - Date.now();
    days.value = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    minutes.value = Math.floor((timeLeft / 1000 / 60) % 60);
    seconds.value = Math.floor((timeLeft / 1000) % 60);
  };

  const timer = setInterval(() => getTime(), 1000);
  onUnmounted(() => clearInterval(timer));
});
</script>

<template>
  <div class="flex flex-col gap-3 border border-white rounded-lg bg-black/60 p-2 w-fit">

    <h3 class="font-primary text-4xl flex items-center gap-[.2em]">
      UPCOMING COUNTDOWN
      <Icon name="streamline:interface-share-satellite-broadcast-satellite-share-transmit" />
    </h3>
    <div class="bg-[#95A843] border border-white/10 text-black/90 font-seg text-8xl backdrop-blur-md p-2.5 w-fit flex flex-col gap-[.2em] shadow-inner shadow-black/30">
      <div class="">
        <span class="text-burned before:content-['~~']">
          <ClientOnly>
            <span>{{ days < 10 ? `0${days}` : days }}</span>
          </ClientOnly>
        </span>
        <span class="text-burned text-[.6em] text-black/90 before:content-['~~~~']">
          <span>days</span>
        </span>
        <span class="text-burned before:content-['~~:~~:~~']">
          <ClientOnly>
            <span>
              {{ hours < 10 ? `0${hours}` : hours }}:{{ minutes < 10 ? `0${minutes}` : minutes }}:{{ seconds < 10 ? `0${seconds}` : seconds }}
            </span>
          </ClientOnly>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.text-burned
  @apply inline-grid before:text-black/5
  > *, &::before
    grid-area: 1/-1
</style>
