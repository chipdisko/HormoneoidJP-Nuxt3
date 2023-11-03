<script setup lang="ts">
import type { Onair as OnairProps } from "~/types/microcms";

const { article } = defineProps<{
  article: OnairProps;
}>();

const fields = "id,title,date,publishedAt";

const { data: pastOneArticles } = await useMicroCMSGetList<OnairProps>({
  endpoint: "onairs",
  queries: {
    limit: 1,
    fields,
    orders: "-date",
    filters: `date[less_than]${article.date}`,
  },
});
const pastArticle = pastOneArticles.value?.contents[0];

const { data: futureOneArticles } = await useMicroCMSGetList<OnairProps>({
  endpoint: "onairs",
  queries: {
    limit: 1,
    fields,
    orders: "date",
    filters: `date[greater_than]${article.date}`,
  },
});
const futureArticle = futureOneArticles.value?.contents[0];
</script>
<template>
  <div class="flex mt-8 w-full font-tertiary ">
    <NuxtLink v-if="pastArticle" :to="`/onair/${pastArticle.id}`" class="button mr-auto">
      <div class="icon">
        <Icon name="ph:caret-left-fill" /> PAST
      </div>
      {{ pastArticle.title }}
    </NuxtLink>
    <NuxtLink v-if="futureArticle" :to="`/onair/${futureArticle.id}`" class="button ml-auto">
      <div class="icon">
        FUTURE <Icon name="ph:caret-right-fill" />
      </div>
      {{ futureArticle.title }}
    </NuxtLink>
  </div>
</template>
<style lang="sass" scoped>
.button
  @apply relative flex flex-col items-center justify-center bg-slate-100/0 backdrop-blur-md
  @apply shadow-none shadow 
  width: 50%
  box-sizing: border-box
  padding: 0.5rem
  border-top: 1px solid rgba(#FFF, .2)
  font-weight: bold
  text-align: center
  color: #fff
  transition: all .3s ease
  cursor: pointer
  @apply h-24 sm:h-24 md:h-28 sm:text-base md:text-xl lg:text-3xl  
  .icon
    @apply text-[.8em]
  & + .button
    border-left: 1px solid rgba(#FFF, .1)
  &:hover
    @apply text-lime-500 z-10 bg-black
    box-shadow: 0 -3px 200px rgba(white, .9)
</style>

