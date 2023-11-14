<template>
  <div class="layout">
    <NuxtLoadingIndicator :throttle="0" :height="2" class="bg-orange" />
    <Header />

    <NuxtLayout>
      <!-- <SeoKit />
      <OgImageScreenshot />
      <OgImageStatic /> -->
      <main id="main">
        <NuxtPage/>
      </main>
    </NuxtLayout>
    <LazySoundcloudPlayer />
  </div>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
