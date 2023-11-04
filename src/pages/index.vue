<script setup lang="ts">
const appConfig = useAppConfig();
console.log(appConfig.siteMetadata);

</script>
<template>
  <div class="lg:flex">
    <Chrissy2023Hero class="lg:max-w-[50%]" />
    <Onair />
  </div>
</template>
