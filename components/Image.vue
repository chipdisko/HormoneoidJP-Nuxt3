<template>
  <template v-if="newSrc">
    <NuxtImg :src="newSrc" :width="width" :height="height" />
  </template>
  <template v-else>
    <span class="no-image">
      <span>
        <ClientOnly>
          <Icon name="carbon:no-image" size="20" />
        </ClientOnly>
        <span>No Image</span>
      </span>
    </span>
  </template>
</template>
<script setup lang="ts">
  type Props = {
    src?: string;
    noImgSrc?: string;
    width?: number;
    height?: number;
    quality?: number;
    fit?:
      | "clip"
      | "clamp"
      | "crop"
      | "fill"
      | "scale"
      | "max"
      | "fillmax"
      | "min";
    crop?:
      | "top"
      | "right top"
      | "right"
      | "right bottom"
      | "bottom"
      | "left bottom"
      | "left"
      | "left top"
      | "center";
    fill?: "blur";
    fm?: "jpg" | "png" | "webp" | "json";
  };
  const {
    src,
    noImgSrc,
    width,
    height,
    quality = 100,
    fit = "max",
    crop = "center",
    fill = "blur",
    fm = "webp",
  } = defineProps<Props>();
  const defaultImageSize = {
    width: 500,
    height: 500,
  };
  const suffix = `?fm=${fm}&fit=${fit}${
    fit === "crop" ? `?crop=${crop.replace(" ", ",")}` : ``
  }&q=${quality}&w=${width ?? defaultImageSize.width}&h=${
    height ?? defaultImageSize.height
  }`;
  const newSrc = src
    ? src.includes("images.microcms-assets.io")
      ? `${src}${suffix}`
      : src
    : noImgSrc ?? undefined;
</script>
<style scoped lang="sass">
  .no-image
    @apply w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg shadow-inner
    span
      @apply flex items-center gap-2
</style>
