<script setup lang="ts">
import type { MicroCMSQueries,MicroCMSListResponse } from "microcms-js-sdk";
import type { Onair as OnairProps } from "~/types/microcms";

// const nowISOstring = ref<string>(new Date().toISOString());
// const queries: MicroCMSQueries = {
//   fields: "id,airdate,title,jacket,description,soundcloud_embedcode",
//   limit: 1,
//   filters: `airdate[less_than]${nowISOstring.value}`,
// };
// const { data: lastOneOnairArticles } = await useAsyncData<MicroCMSListResponse<OnairProps>>(
//   `lastOneOnairArticles`,
//   ()=> $fetch(`/api/onairs`,{
//     method: 'GET',
//     query: queries,
//   }),
// );
// const lastOnairArticle = lastOneOnairArticles.value?.contents[0] ?? null;

const lastOnairArticle = ref<OnairProps | null>(null);
onMounted(()=>{
  lastOnairArticle.value = useNuxtApp().payload.data.onairs?.contents.find(article => article.id === '755t3gxwqvgb') ?? null;
  console.log(lastOnairArticle.value);
})

</script>
<template>

  <section class="lg:sticky top-0 left-0 bg-base-200 lg:h-screen">
    <template v-if="lastOnairArticle">
      <!-- component -->
      <div class="lg:h-screen">
        <div class="from-indigo-700 bg-gradient-to-r to-black w-full h-full px-8 pt-24 pb-16 md:px-24 lg:p-19 xl:p-28 ">
          <div class="h-full max-w-3xl mx-auto flex flex-col justify-center">
            <div class="aspect-square w-full">
              <img :src="lastOnairArticle.feat.photo.url" alt="mobile payment" class="h-full w-full object-cover object-bottom" />
            </div>
            <div class="flex md:max-h-1/2">
              <div class="relative group flex flex-col gap-6 md:gap-8 w-full p-6 md:p-8 hover:bg-indigo-800 border border-t-0 bg-opacity-5 transition-all duration-300">
                <nav>
                  <ul class="flex space-x-6 text-white font-tertiary text-sm">
                    <li>last</li>
                    <li>time</li>
                    <li>guest</li>
                  </ul>
                </nav>
                <h1 class="font-tertiary font-bold mt-4 text-xl text-white transform group-hover:translate-x-6 duration-300 uppercase leading-snug">
                  <span class="w-fit bg-white text-indigo-800 block">Lomax ____</span>
                  (NC4K)<br/> from Kyoto
                </h1>
                <div class="flex flex-col gap-2">
                  <div v-html="lastOnairArticle.feat.biography" class=" text-white text-sm md:text-md font-secondary"></div>
                </div>
                <div class="text-lg md:text-2xl text-center font-primary border border-white rounded-full py-2 px-8 ">ARCHIVE COMING SOON!</div>
                <NuxtLink :to="`/onair/${lastOnairArticle.id}`"  class="hidden md:flex absolute z-50 bottom-0 md:bottom-auto left-1/2 md:left-auto md:-top-12 md:-right-12 items-center justify-center w-20 h-20 rounded-full bg-white group-hover:bg-green-200 text-indigo-800 group-hover:text-white font-semibold cursor-pointer group-hover:scale-110 duration-300 select-none">
                  Tracklist
                </NuxtLink>
              </div>

            </div>
          </div>

        </div>
      </div>
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
</style>
