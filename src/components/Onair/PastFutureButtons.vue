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
    <NuxtLink v-if="pastArticle" :to="`/onair/${pastArticle.id}`" class="past button mr-auto">
      <div class="icon">
        <Icon name="ph:caret-left-light" />
      </div>
      <div class="title">
        {{ pastArticle.title }}
      </div>
    </NuxtLink>
    <NuxtLink v-if="futureArticle" :to="`/onair/${futureArticle.id}`" class="future button ml-auto">
      <div class="icon">
        <Icon name="ph:caret-right-light" />
      </div>
      <div class="title">
        {{ futureArticle.title }}
      </div>
    </NuxtLink>
  </div>
</template>
<style lang="sass" scoped>
.button
  @apply relative flex flex-col items-center justify-center bg-slate-100/0 backdrop-blur
  @apply h-24 sm:h-24 md:h-28 sm:text-base md:text-xl lg:text-3xl
  @apply shadow-none shadow 
  width: 50%
  box-sizing: border-box
  padding: 0.5rem
  border-top: 1px solid rgba(#FFF, .2)
  font-weight: bold
  text-align: center
  color: #fff
  transition: all .1s ease
  cursor: pointer
  .icon
    @apply text-[.8em]
  &.past
    .icon::after
      content: "PAST"
    @screen lg
      left: 0
  &.future
    .icon::before
      content: "FUTURE"
    @screen lg
      right: 0
  & + .button
    border-left: 1px solid rgba(#FFF, .1)
  &:hover
    @apply text-lime-500 z-10 bg-black
    box-shadow: 0 0px 40px rgba(white, .2)
  @screen lg 
    @apply fixed top-0 h-full w-16 hover:w-36 hover:bg-black/10 grid text-white/50
    > *
      grid-row: 1/-1
      grid-column: 1/-1
    .icon
      @apply text-8xl relative
      &::before, &::after
        @apply text-xl absolute bottom-[-1em] left-0 opacity-0 transition-opacity
        transition-delay: .1s
    .title
      @apply opacity-0 transition-opacity translate-y-[50%] mt-36 text-base text-white text-left
    &:hover
      @apply text-lime-200
      .icon
        @apply pointer-events-none
        &::before, &::after
          @apply opacity-100
      .title
        @apply opacity-100 
        transition-delay: .1s
</style>

