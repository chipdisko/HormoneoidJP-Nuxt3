<script setup lang="ts">
import type { MicroCMSQueries, MicroCMSListResponse } from "microcms-js-sdk";

import type { Onair as OnairProps } from "~/types/microcms";
const limit=20
const page=1
const numLimit: number = Number(20);
const date = ref<string>('');
date.value = new Date().toISOString()
const queries: MicroCMSQueries = {
  fields: "id,airdate,title,jacket,description,soundcloud_embedcode",
  limit: 2,
  offset: (page - 1) * numLimit,
  // filters: `airdate[less_than]${date.value}`,
};

const { data } = await useAsyncData<MicroCMSListResponse<OnairProps>>(
  'onairsaaaa',
  ()=> $fetch('/api/read_onairs',{
    method: 'GET',
    query: queries
  }), 
  );

const widths = ref<number[]>([]);
for (let i = 0; i < Number(limit); i++) {
  widths.value.push(Math.floor(Math.random() * 140) + 200);
}

//const numPages = Math.ceil((data.value?.totalCount || 0) / numLimit);
if(process.client){
  console.log('--client data--')
  console.log(data.value);
  console.log(data.value?.contents);
}
if(process.server){
  console.log('--server data--')
  console.log(data.value);
  console.log(data.value?.contents);
}
</script>

<template>
  <div class="flex gap-8 flex-wrap px-4">
    <OnairCard v-for="article, index in data?.contents" :key="'list_'+article.id"  :article="article" class="z-10" :style="{ width: widths[index] + 'px' }" />
  </div>
</template>
