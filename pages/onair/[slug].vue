<script setup lang="ts">
import type { Onair as OnairProps } from "~/types/microcms";
const { params } = useRoute();
const slug =  Array.isArray(params.slug) ? params.slug[0] : params.slug

const { data: article } = await useAsyncData<OnairProps>(
  `onair_${slug}`,
  ()=> $fetch(`/api/onairs/${slug}`,{
    method: 'GET',
  }),
);

const seoTitle = `${article.value?.title ?? 'a radio archive'} ${article.value?.theme ? `THEME:${article.value.theme}` : ''} | a radio archive on Hormoneoid JP hosted on AAJA CH2`;
const seoDescription = article.value?.description?.replace(/\n/g, '') ?? article.value?.title;
const seoImage = article.value?.jacket?.url ?? '';
useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogImage: seoImage,
  ogUrl: `https://hormoneoid.w1dr.ink/onair/${article.value?.id}`,
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
  twitterImage: seoImage,
  twitterCard: 'summary',
  robots: 'follow, index'
})
</script>

<template>
  <OnairSlug v-if="article" :article="article" />
</template>
