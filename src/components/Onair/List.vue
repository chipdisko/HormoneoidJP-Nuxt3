
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
  filters: `airdate[less_than]${new Date().toISOString()}`,
};

const { data } = await useMicroCMSGetList<OnairProps[]>({
  endpoint: "onairs",
  queries: queries,
});


const numPages = Math.ceil((data.value?.totalCount || 0) / numLimit);
</script>»

<template>
  <div class="flex gap-8 flex-wrap px-4">
    <OnairCard v-for="article in data.contents" :key="'list_'+article.id" :article="article" class="z-10" :style="{ width: Math.floor(Math.random() * 140) + 200 + 'px' }" />
    <!--
    <NewsItem :categoryId="categoryId" v-for="content in data.contents" :key="content.id" :content="content" />
    <OnairPagination v-if="pagination && data.totalCount > numLimit" :numPages="numPages" :current="page" />
    -->
  </div>
</template>
