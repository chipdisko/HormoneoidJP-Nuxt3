
<script setup lang="ts">
import type { MicroCMSQueries } from "microcms-js-sdk";
import type { Onair as OnairProps } from "~/types/microcms";

type Props = {
  page?: number;
  pagination?: boolean;
  limit?: number | string;
};

const { page, pagination, limit } = withDefaults(defineProps<Props>(), {
  page: 1,
  pagination: false,
  limit: 20,
});

const numLimit: number = Number(limit);

const queries: MicroCMSQueries = {
  fields: "id,date,title,jacket,host,feat,description,soundcloud_embedcode,publishedAt",
  limit: numLimit,
  offset: (page - 1) * numLimit,
};

const { data } = await useMicroCMSGetList<OnairProps[]>({
  endpoint: "onairs",
  queries: queries,
});

const numPages = Math.ceil((data.value?.totalCount || 0) / numLimit);
</script>»

<template>
  <div v-if="!data">something happend. please reload;</div>
  <div v-else-if="!data.totalCount" class="text-center">現在、新着情報はありません。</div>
  <div v-else class="flex gap-8 flex-wrap px-4">
    <OnairCard v-for="content in data.contents" :key="content.id" :content="content" class="" :style="{ width: Math.floor(Math.random() * 140) + 200 + 'px' }" />
    <!--
    <NewsItem :categoryId="categoryId" v-for="content in data.contents" :key="content.id" :content="content" />
    <OnairPagination v-if="pagination && data.totalCount > numLimit" :numPages="numPages" :current="page" />
    -->
  </div>
</template>
