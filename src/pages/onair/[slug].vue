<script setup lang="ts">
import type { Onair as OnairProps } from "~/types/microcms";
const { params } = useRoute();
const { data: article } = await useMicroCMSGetListDetail<OnairProps>({
  endpoint: "onairs",
  contentId: params.slug,
});
useSeoMeta({
  title: `${article.value.title} | a dj mix archive on Hormoneoid JP hosted on AAJA CH2`,
  description: article.value.description?.replace(/\n/g, '') ?? article.value.title,
  ogTitle: `${article.value.title} | a dj mix archive on Hormoneoid JP hosted on AAJA CH2`,
  ogDescription: article.value.description?.replace(/\n/g, '') ?? article.value.title,
  ogImage: article.value.jacket?.url ?? '',
  twitterTitle: `${article.value.title} | a dj mix archive on Hormoneoid JP hosted on AAJA CH2`,
  twitterDescription: article.value.description?.replace(/\n/g, '') ?? article.value.title,
  twitterImage: article.value.jacket?.url ?? '',
  robots: 'follow, index'
})
</script>

<template>
  <OnairSlug :article="article" />
</template>
