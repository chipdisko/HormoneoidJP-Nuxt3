<script setup lang="ts">
import type { Onair as OnairProps } from "~/types/microcms";
const { $getCategoryIdByFullPath } = useNuxtApp(); // ~/plugin/linkType.ts

const { routeSlug } = defineProps<{
  routeSlug: any;
}>();


const slug: string = Array.isArray(routeSlug) ? (routeSlug[0] as string) : (routeSlug as string);

const { data: article } = await useMicroCMSGetListDetail<OnairProps>({
  endpoint: "onairs",
  contentId: slug,
});

if (!article.value) throw createError({
  statusCode: 404,
  statusMessage: "Page Not Found",
  fatal: true,
});

function extractPdfFilename(url: string): string {
  const regex = /\/([^\/]+)\.pdf/i;
  const match = url.match(regex);
  if (match) {
    return match[1];
  } else {
    return "";
  }
}
</script>
<template>
  <PageHeaderSmall category="news" bg="/bg-pagetitle.png"> {{ article.title }}</PageHeaderSmall>
  <Contents hasBorderTop>
    <Content>
      <div class="meta flex items-center gap-4">
        <div v-if="article.publishedAt" class="published">{{ $formatDate(article.publishedAt) }}</div>
        <Tag :to="`/${article.category.id}`">
          <ClientJaParser>{{ article.category.title }}</ClientJaParser>
        </Tag>
      </div>
      <MarkUpText :text="article.content" />

      <div v-if="article.files" class="files flex flex-wrap gap-4">
        <ButtonFile v-for="(file, index) in article.files" :key="file.file.url + index" class="file" :to="file.file.url">
          {{ file.title ?? decodeURIComponent(extractPdfFilename(file.file.url)) }}
        </ButtonFile>
      </div>
      <NewsPastFutureButtons :article="article" :categoryId="categoryId" />
    </Content>
  </Contents>
</template>
