<script setup lang="ts">
import type { Onair as OnairProps } from "~/types/microcms";

const { article } = defineProps<{
  article: OnairProps;
}>();

const fields = "id,title,image,publishedAt";

const { data: pastOneArticles } = await useMicroCMSGetList<OnairProps>({
  endpoint: "onairs",
  queries: {
    limit: 1,
    fields,
    orders: "-publishedAt",
    filters: `publishedAt[less_than]${article.publishedAt}`,
  },
});
const pastArticle = pastOneArticles.value?.contents[0];

const { data: futureOneArticles } = await useMicroCMSGetList<OnairProps>({
  endpoint: "onairs",
  queries: {
    limit: 1,
    fields,
    orders: "publishedAt",
    filters: `publishedAt[greater_than]${article.publishedAt}`,
  },
});
const futureArticle = futureOneArticles.value?.contents[0];
</script>
<template>
  <div class="flex gap-4 mt-8">
    <ButtonPast v-if="pastArticle" :to="`/${categoryId ? categoryId + '/' : ''}onairs/${pastArticle.id}`" class="mr-auto">
      {{ pastArticle.title }}
    </ButtonPast>
    <ButtonFuture v-if="futureArticle" :to="`/${categoryId ? categoryId + '/' : ''}onairs/${futureArticle.id}`" class="ml-auto">
      {{ futureArticle.title }}
    </ButtonFuture>
  </div>
</template>
