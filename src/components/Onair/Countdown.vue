<script setup lang="ts">
const { deadline } = defineProps<{
  deadline: string;
}>();

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const deadlineTime = Date.parse(deadline);
const airdate = new Date(deadlineTime);
const onairEndTime = new Date(airdate.setHours(airdate.getHours() + 2)).getTime();
const isLoading = ref(true);
const isOnair = ref(false);
const isOnairEnd = ref(false);

onMounted(() => {
  const refreshTime = () => {
    if(isOnair.value) return;

    const timeLeft = deadlineTime - Date.now();
    if (timeLeft < 0) {
      isOnair.value = true;
    }
    days.value = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    minutes.value = Math.floor((timeLeft / 1000 / 60) % 60);
    seconds.value = Math.floor((timeLeft / 1000) % 60);
  };

  const waitOnairFinish = () => {
    if(!isOnair.value) return;
    const timeLeft = onairEndTime - Date.now();
    console.log('timeLeft', timeLeft)
    if (timeLeft < 0) {
      isOnair.value = false;
      clearInterval(timer);
      isOnairEnd.value = true;
    }
  }

  const timer = setInterval(() => {
    refreshTime();
    waitOnairFinish();
  }, 1000);
  onUnmounted(() => clearInterval(timer));
  isLoading.value = false;
});
</script>

<template>
  <NuxtLink
    to="https://aajamusic.com/"
    class="flex flex-col gap-[.1em] md:gap-[.2em] border border-white bg-black/60 rounded-lg p-1 sm:p-2 w-fit text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl hover:bg-black/100 hover:scale-105 transition-all duration-200 ease-in-out"
  >

    <h3 
      class="font-primary pt-[.1em] text-[.6em] xl:text-4xl flex items-center gap-[.2em]"
      :class="{
        'text-red-400': isOnair,
      }"
    >
      <template v-if="isOnairEnd">
        <Icon name="arcticons:simplethankyou" />
        THANKS FOR LISTENING
      </template>
      <template v-else-if="isOnair">
        <span class="text-red-600 inline-flex items-center justify-center">
          <Icon name="svg-spinners:pulse-rings-2" />
        </span>
        ONAIR NOW
        <Icon name="streamline:interface-share-satellite-broadcast-satellite-share-transmit" />
        <LogoAaja class="h-[1em] fill-red-400 ml-auto mr-[.2em]" />
      </template>
      <template v-else>
        <Icon name="icon-park-outline:broadcast-radio" />
        UPCOMING COUNTDOWN
        <Icon name="streamline:interface-share-satellite-broadcast-satellite-share-transmit" />
        <LogoAaja class="h-[1em] fill-white  ml-auto mr-[.2em]" />
      </template>
    </h3>
    <div
      class=" border border-white/10 rounded text-black/90 font-seg backdrop-blur-md p-1 md:p-2.5 w-fit gap-[.2em] shadow-inner shadow-black/30 leading-tight"
      :class="{
        'bg-red-400 ': isOnair,
        'bg-[#95A843]': !isOnair,
      }"
    >
      <template v-if="isOnairEnd">
        <span class="text-burned before:content-['~~~~~~~~']">
          <span>FINISHED</span>
        </span>
      </template>
      <template v-else-if="isOnair">
        <span class="text-burned before:content-['~~~~~~~~']">
          <span>AAJA_CH2</span>
        </span>
      </template>
      <template v-else>
        <span class="text-burned before:content-['~~']">
          <ClientOnly fallback="~~">
            <span>{{ days < 10 ? `0${days}` : days }}</span>
          </ClientOnly>
        </span>
        <span class="text-burned text-[.6em] text-black/90 before:content-['~~~~']">
          <ClientOnly fallback="~~~~">
            <span>days</span>
          </ClientOnly>
        </span>
        <span class="text-burned before:content-['~~:~~:~~']">
          <ClientOnly fallback="~~:~~:~~">
            <span>
              {{ hours < 10 ? `0${hours}` : hours }}:{{ minutes < 10 ? `0${minutes}` : minutes }}:{{ seconds < 10 ? `0${seconds}` : seconds }}
            </span>
          </ClientOnly>
        </span>
      </template>
    </div>
  </NuxtLink>
</template>

<style scoped lang="sass">
.text-burned
  @apply inline-grid before:text-black/5
  > *, &::before
    grid-area: 1/-1
</style>
