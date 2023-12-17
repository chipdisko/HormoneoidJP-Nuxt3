<script setup lang="ts">
import type { MicroCMSQueries,MicroCMSListResponse } from "microcms-js-sdk";
import type { Onair as OnairProps } from "~/types/microcms";
const { $getOnairTime } = useNuxtApp(); // ~/plugin/linkType.ts


const nowISOstring = ref<string>(new Date().toISOString());
const queries: MicroCMSQueries = {
  fields: "id,airdate,title,jacket,description,soundcloud_embedcode",
  limit: 1,
  filters: `airdate[less_than]${nowISOstring.value}`,
};
const { data: lastOneOnairArticles } = await useAsyncData<MicroCMSListResponse<OnairProps>>(
  `lastOneOnairArticles`,
  ()=> $fetch(`/api/onairs`,{
    method: 'GET',
    query: queries,
  }),
);
const article = lastOneOnairArticles.value?.contents[0];

const articleDateInLondon = $getOnairTime(article.airdate) ?? '';

function nl2br(str:string):string {
  return str.replace(/\n/g, '<br>');
}
const description = article.description ? nl2br(article.description) : '';

const { $extractSoundcloudIdFromEmbedcode } = useNuxtApp();
const isSoundcloudActive = ref(false);
const mySoundcloudId = ref<number | null>(null);

const isOnairEnd = ref<boolean>();
const airdate = new Date(article.airdate);
const onairEnd = new Date(airdate.setHours(airdate.getHours() + 2));
const now = ref(new Date());
isOnairEnd.value = onairEnd < now.value;


</script>
<template>

  <section class="lg:sticky top-0 left-0 bg-base-200 lg:h-screen relative">
    <template v-if="article">
      <!-- component -->
      <!-- SVG Background -->
    <span class="[&>svg]:absolute [&>svg]:-z-10 [&>svg]:hidden [&>svg]:h-[560px] [&>svg]:w-full [&>svg]:lg:block">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"
        class="absolute top-[60px] hidden h-[580px] w-full transition-opacity duration-300 dark:opacity-0 lg:block">
        <defs>
          <linearGradient id="sw-gradient-light" x1="0" x2="0" y1="1" y2="0">
            <stop stop-color="hsl(209, 92.2%, 92.1%)" offset="0%"></stop>
            <stop stop-color="hsl(209, 92.2%, 99.1%)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path fill="url(#sw-gradient-light)"
          d="M -0.664 3.46 C -0.664 3.46 405.288 15.475 461.728 21.285 C 601.037 35.625 672.268 76.086 701.056 97.646 C 756.056 138.838 797.267 216.257 857.745 245.156 C 885.704 258.516 980.334 280.547 1048.511 268.826 C 1121.622 256.256 1199.864 226.267 1214.176 220.176 C 1241.273 208.643 1280.201 191.509 1343.494 179.436 C 1434.325 162.111 1439.504 196.099 1439.503 183.204 C 1439.502 161.288 1440 0 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L -0.664 3.46 Z">
        </path>
      </svg>
      <svg data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"
        class="absolute top-[60px] hidden h-[580px] w-full opacity-0 transition-opacity duration-300 dark:opacity-100 lg:block">
        <defs>
          <linearGradient id="sw-gradient-dark" x1="0" x2="0" y1="1" y2="0">
            <stop stop-color="hsl(240, 4%, 28%)" offset="0%"></stop>
            <stop stop-color="hsl(0, 0%, 15%)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path fill="url(#sw-gradient-dark)"
          d="M -0.664 3.46 C -0.664 3.46 405.288 15.475 461.728 21.285 C 601.037 35.625 672.268 76.086 701.056 97.646 C 756.056 138.838 797.267 216.257 857.745 245.156 C 885.704 258.516 980.334 280.547 1048.511 268.826 C 1121.622 256.256 1199.864 226.267 1214.176 220.176 C 1241.273 208.643 1280.201 191.509 1343.494 179.436 C 1434.325 162.111 1439.504 196.099 1439.503 183.204 C 1439.502 161.288 1440 0 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L -0.664 3.46 Z">
        </path>
      </svg>
    </span>
    <!-- SVG Background -->

    <!-- Jumbotron -->
    <div class="h-full">
      <div class="w-100 mx-auto h-full">
        <div class="flex md:grid grid-cols-2 lg:flex flex-col-reverse md:flex-row lg:flex-col-reverse items-center justify-end md:justify-center lg:justify-end gap-8 h-full">
          <div class="p-4 md:p-6 md:pr-0 lg:p-8 md:flex md:flex-col md:justify-end md:items-end">
            <div class="font-official uppercase text-[3rem] leading-none sm:text-5xl md:text-6xl lg:text-7xl md:text-right">
              <div>
                <span  class="line-text">
                  {{ article.channel ?? 'Hormoneoid JP' }}
                </span>
                <span> LAST ONAIR</span>
              </div>
              <template v-if="article.theme">
                <div>
                  <span class=""><span class="line-text">THEME:</span>{{ article.theme }}</span>
                </div>
              </template>
            </div>
            <div class="mt-8">
              <template v-if="!isOnairEnd">
                <OnairCountdown skeuo aaja :deadline="article.airdate" class="text-2xl md:text-3xl w-fit border border-white bg-black/60 hover:bg-black/100 hover:scale-105" />
              </template>
              <template v-else-if="article.soundcloud_embedcode">
                <div>
                  <OnairPlayButton
                    :embedcode="article.soundcloud_embedcode"
                    class="flex items-center gap-4 bg-transparent border rounded-full p-[.33em] pl-[.5em] pr-[.7em] text-2xl md:text-2xl lg:text-4xl xl:text-5xl font-tertiary font-bold"
                    :class="{
                      'border-red-500 text-red-500 hover:bg-red-500 hover:text-white': isSoundcloudActive,
                      'border-white/80 text-white  hover:text-black hover:border-black hover:bg-white': !isSoundcloudActive,
                      
                    }"
                    >
                    <template v-if="isSoundcloudActive">
                      STOP
                    </template>
                    <template v-else>
                      PLAY
                    </template>  
                    THE ONAIR
                  </OnairPlayButton>
                </div>
              </template>
              <template v-else>
                <button
                  disabled
                  class="flex items-center justify-center gap-4 bg-transparent border rounded-full p-[.33em] pl-[.5em] pr-[.7em] text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-tertiary font-bold border-white/80 text-white "
                  >
                  <template v-if="isSoundcloudActive">
                    STOP
                  </template>
                  <template v-else>
                    PLAY
                  </template>  
                  THE ONAIR
                </button>
              </template>
            </div>
          </div>
          <div class="w-full max-h-[400px] md:max-h-full md:h-full">
            <Image
              :src="article.jacket.url"
              :alt="article.title"
              :width="article.jacket.width"
              :height="article.jacket.height"
              class="w-full max-h-[400px] md:h-full max-h-full block object-cover object-top rounded-lg shadow-lg dark:shadow-black/20"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Jumbotron -->
    </template>
    <template v-else>
      // loading screen
      <div class="title">
        Last Onair
      </div>
      <div class="jacket">
        <div class="skeleton h-32 w-32 rounded-lg"></div>
      </div>
      <div class="title">
        <div class="skeleton h-6 w-32 rounded-lg"></div>
      </div>

    </template>

  </section>
</template>
<style lang="sass" scoped>
.line-text
  -webkit-text-stroke: 1px white
  color: transparent
      
.text-shadow-far
  text-shadow:1px 1px 0px #111,2px 2px 0px #111, 3px 3px 0px #111

</style>
