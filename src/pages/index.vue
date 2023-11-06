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
    <Chrissy2023Hero class="lg:max-w-[50%]" />
    <OnairPage />
  </div>
</template>
