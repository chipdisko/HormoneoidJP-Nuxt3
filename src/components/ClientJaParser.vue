<script setup lang="ts">
const { $parseJaHtml } = useNuxtApp();
const parsed = ref<HTMLButtonElement|null>(null);
onMounted(() => {
  if (parsed.value) {
    parsed.value.innerHTML = $parseJaHtml(parsed.value.innerHTML);
  }
});
</script>
<template>
  <div class="parsedJa" ref="parsed">
    <slot />
  </div>
</template>
<style scoped lang="sass">
</style>
