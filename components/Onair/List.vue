<script setup lang="ts">
  import type { MicroCMSQueries, MicroCMSListResponse } from "microcms-js-sdk";
  import type { Onair as OnairProps } from "~/types/microcms";

  type Props = {
    page?: number;
    pagination?: boolean;
    limit?: number | string;
  };

  const { page = 1, pagination = false, limit = 100 } = defineProps<Props>();

  const numLimit: number = Number(limit);
  const nowISOstring = ref<string>(new Date().toISOString());
  const queries: MicroCMSQueries = {
    fields:
      "id,airdate,title,jacket,host,feat,description,soundcloud_embedcode",
    limit: numLimit,
    offset: (page - 1) * numLimit,
    //filters: `airdate[less_than]${nowISOstring.value}`,
  };

  const { data } = await useAsyncData<MicroCMSListResponse<OnairProps>>(
    "onairs",
    () =>
      $fetch("/api/onairs", {
        method: "GET",
        query: queries,
      })
  );

  const widths = ref<number[]>([]);
  for (let i = 0; i < Number(limit); i++) {
    if (i === 0) {
      widths.value.push(320);
      continue;
    }
    widths.value.push(Math.floor(Math.random() * 120) + 260);
  }

  //const numPages = Math.ceil((data.value?.totalCount || 0) / numLimit);
  //
</script>

<template>
  <div class="flex gap-12 sm:gap-8 flex-col sm:flex-row sm:flex-wrap px-4">
    <OnairCard
      v-for="(article, index) in data?.contents"
      :key="'list_' + article.id"
      :article="article"
      class="z-10"
      :style="{ width: widths[index] + 'px' }"
    />
  </div>
</template>
~~/types/microcms
