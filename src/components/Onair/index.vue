<script setup lang="ts">
</script>
<template>
  <div class="overflow-x-hidden py-4 pb-12">
    <h2 class="title w-fit relative z-10 text-transparent text-5xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-tertiary skew-x-[20deg] skew-y-6 scale-y-150 lg:scale-y-100 lg:skew-y-0 scale-90 xl:translate-x-8 font-bold mb-6">Onair Archives</h2>
    <OnairList />
    <div class="font-official text-6xl md:text-9xl px-2 mt-12">
      <div class=" font-extralight">HORMONEOID JP</div>
      <div class=" font-light text-black text-stroke-1 tracking-wide">HORMONEOID JP</div>
      <div class=" font-bold tracking-wider">HORMONEOID JP</div>
      <div class=" font-extrabold text-black text-stroke-2 tracking-widest">HORMONEOID JP</div>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.title
  -webkit-text-stroke: 1px #FFF
  @screen md
    -webkit-text-stroke: 2px #FFF
</style>