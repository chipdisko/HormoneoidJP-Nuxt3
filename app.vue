<template>
  <NuxtLoadingIndicator :throttle="0" :height="2" class="bg-orange" />
  <NuxtLayout>
    <!-- <SeoKit />
    <OgImageScreenshot />
    <OgImageStatic /> -->
    <NuxtPage/>
  </NuxtLayout>
  <UNotifications />
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
