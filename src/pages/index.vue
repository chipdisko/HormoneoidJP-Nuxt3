<script setup lang="ts">
const config = useAppConfig();
useSeoMeta({
  ogTitle: config.siteMetadata.title,
  ogDescription: config.siteMetadata.description ?? config.siteMetadata.title,
  twitterTitle:  config.siteMetadata.title,
  twitterDescription: config.siteMetadata.description ?? config.siteMetadata.title,
  robots: 'follow, index'
});
</script>
<template>
  <div class="lg:flex">
    <Chrissy2023Hero class="lg:max-w-[50%]" />
    <Onair />
  </div>
</template>
