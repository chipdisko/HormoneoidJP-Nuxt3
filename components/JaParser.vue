<script setup lang="ts">
const { $parseJa } = useNuxtApp();
const { text } = defineProps<{
  text: string;
}>();
</script>
<template>
  <span class="parsedJa">
    <span v-for="$ja in $parseJa(text)" :key="$ja">{{ $ja }}</span>
  </span>
</template>
<style scoped lang="sass">
.parsedJa
  span
    display: inline-block
</style>
