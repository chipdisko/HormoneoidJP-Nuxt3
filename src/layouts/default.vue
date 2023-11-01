<template>
  <div class="layout">
    <Header />
    <main id="main">
      <slot />
    </main>
    <SoundcloudPlayer />
  </div>
</template>
<style lang="sass" scoped>
#main
  @apply lg:flex
</style>
