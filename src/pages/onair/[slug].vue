<script setup lang="ts">
import type { Onair as OnairProps } from "~/types/microcms";
const { params } = useRoute();
const slug =  Array.isArray(params.slug) ? params.slug[0] : params.slug

const { data: article } = await useMicroCMSGetListDetail<OnairProps>({
  endpoint: "onairs",
  contentId: slug,
});

const seoTitle = `${article.value?.title ?? 'a radio archive'} ${article.value?.theme ? `THEME:${article.value.theme}` : ''} | a radio archive on Hormoneoid JP hosted on AAJA CH2`;

useSeoMeta({
  title: seoTitle,
  description: article.value?.description?.replace(/\n/g, '') ?? article.value?.title,
  ogTitle: seoTitle,
  ogDescription: article.value?.description?.replace(/\n/g, '') ?? article.value?.title,
  ogImage: article.value?.jacket?.url ?? '',
  twitterTitle: seoTitle,
  twitterDescription: article.value?.description?.replace(/\n/g, '') ?? article.value?.title,
  twitterImage: article.value?.jacket?.url ?? '',
  robots: 'follow, index'
})
</script>

<template>
  <OnairSlug v-if="article" :article="article" />
</template>
