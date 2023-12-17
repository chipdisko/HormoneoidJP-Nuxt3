<script setup lang="ts">
const TITLE = 'Hormoneoid JP | a dj mix archive on AAJA CH2'; 
const DESCRIPTION = 'You are listening to Hormoneoid JP. Enjoy';

useSeoMeta({
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: TITLE,
  ogDescription: DESCRIPTION,
  ogImage: undefined,
  robots: 'follow, index',
});
</script>
<template>
  <div class="lg:flex">
    <!-- <LastOnairHero class="lg:w-[45%] shrink-0 grow-0" /> -->
    <OnairPage />
  </div>
</template>
