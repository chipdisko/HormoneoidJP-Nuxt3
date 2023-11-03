<script setup lang="ts">
import type { Onair as OnairProps } from "~/types/microcms";
const { params } = useRoute();
const { data: article } = await useMicroCMSGetListDetail<OnairProps>({
  endpoint: "onairs",
  contentId: params.slug,
});
</script>

<template>
  <OnairSlug :article="article" />
</template>
