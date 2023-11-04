<!-- src/components/Pagination.vue -->
<script setup lang="ts">
type Props = {
  numPages: number;
  current: number;
};

const { numPages, current } = defineProps<Props>();

// ページリンクを返す
function getPath(p: number) {
  const currentUrl = ref<string>(window.location.pathname);
  const path = currentUrl.value.replace(/\/?(\/page\/)?[^\/]*$/, "/page/");
  return path + p;
}

// クラスを返す
// 現在のページの場合スタイルをかえるため
function getClass(page: number, current: number) {
  if (page == current) return "current";
  return "link";
}

//最初のページかどうかを判定
function isFirstPage(current: number) {
  return current === 1;
}
//最後のページかどうかを判定
function isLastPage(current: number, numPages: number) {
  return current === numPages;
}
</script>

<template>
  <nav class="pagination mt-20">
    <ul class="flex justify-center items-center -space-x-px h-10 mx-auto border-2 border-primary rounded-full overflow-hidden w-fit">
      <li v-if="!isFirstPage(current)">
        <NuxtLink :to="getPath(current - 1)" class="link !px-2 !border-l-0">
          <span class="sr-only">Previous</span>
          <Icon name="material-symbols:chevron-left" size="1.6em" />
        </NuxtLink>
      </li>

      <li v-for="page in numPages" :key="page">
        <NuxtLink :class="getClass(page, current)" :to="getPath(page)">
          {{ page }}
        </NuxtLink>
      </li>

      <li v-if="!isLastPage(current, numPages)">
        <NuxtLink :to="getPath(current + 1)" class="link !px-2">
          <span class="sr-only">Next</span>
          <Icon name="material-symbols:chevron-right" size="1.6em" />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="sass">
.current,
.link
  @apply flex items-center justify-center px-4 h-10 border-l border-primary hover:bg-black no-underline


.current
  @apply border-primary bg-primary text-white cursor-default hover:bg-primary hover:text-white

.link
  @apply hover:bg-black

</style>
