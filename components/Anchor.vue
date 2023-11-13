<script setup lang="ts">
const { $linkType } = useNuxtApp(); // ~/plugin/linkType.ts

type Props = {
  to?: string;
  noIcon?: boolean;
  iconName?: string;
  iconPosition?: "start" | "end";
  hasUnderline?: boolean;
  disabled?: boolean;
};

const icons = {
  mailto: "bi:envelope",
  tel: "bi:telephone-forward",
  pdf: "bi:file-earmark-pdf",
  external: "line-md:external-link",
  anchor: "",
  internal: "",
};

const { to, disabled } = withDefaults(defineProps<Props>(), {
  iconPosition: "end",
});

const linkType: "mailto" | "tel" | "pdf" | "external" | "anchor" | "internal" | undefined = to ? $linkType(to) : undefined;
</script>

<template>
  <button
    v-if="!to"
    class="text-left"
  >
    <slot />
  </button>
  <button
    v-else-if="disabled"
    class="text-left"
    disabled
  >
    <template v-if="iconPosition === 'start' && !noIcon">
      <Icon class="icon" v-if="!iconName && linkType && icons[linkType] !== ''" :name="icons[linkType]" />
      <Icon class="icon  text-left" v-if="iconName" :name="iconName" />
    </template>
    <slot />
    <template v-if="iconPosition === 'end' && !noIcon">
      <Icon class="icon" v-if="!iconName && linkType && icons[linkType] !== ''" :name="icons[linkType]" />
      <Icon class="icon" v-if="iconName" :name="iconName" />
    </template>
  </button>
  <a
    v-else-if="linkType === 'pdf'"
    :href="!disabled ? to : ''"
    target="_blank"
  >
    <template v-if="iconPosition === 'start' && !noIcon">
      <Icon class="icon" v-if="!iconName && linkType && icons[linkType] !== ''" :name="icons[linkType]" />
      <Icon class="icon text-left" v-if="iconName" :name="iconName" />
    </template>
    <slot />
    <template v-if="iconPosition === 'end' && !noIcon">
      <Icon class="icon" v-if="!iconName && linkType && icons[linkType] !== ''" :name="icons[linkType]" />
      <Icon class="icon" v-if="iconName" :name="iconName" />
    </template>
  </a>
  <NuxtLink
    v-else-if="linkType === 'external'"
    target="_blank"
    rel="noopener noreferrer"
    :to="!disabled ? to : ''"
    :class="{ hasUnderline: hasUnderline }"
  >
    <template v-if="iconPosition === 'start' && !noIcon">
      <Icon class="icon" v-if="!iconName && linkType && icons[linkType] !== ''" :name="icons[linkType]" />
      <Icon class="icon" v-if="iconName" :name="iconName" />
    </template>
    <slot />
    <template v-if="iconPosition === 'end' && !noIcon">
      <Icon class="icon" v-if="!iconName && linkType && icons[linkType] !== ''" :name="icons[linkType]" />
      <Icon class="icon" v-if="iconName" :name="iconName" />
    </template>
  </NuxtLink>
  <NuxtLink
    v-else
    :to="!disabled ? to : ''"
    :class="{ hasUnderline: hasUnderline }"
  >
    <template v-if="iconPosition === 'start' && !noIcon">
      <Icon class="icon" v-if="!iconName && linkType && icons[linkType] !== ''" :name="icons[linkType]" />
      <Icon class="icon" v-if="iconName" :name="iconName" />
    </template>
    <slot />
    <template v-if="iconPosition === 'end' && !noIcon">
      <Icon class="icon" v-if="!iconName && linkType && icons[linkType] !== ''" :name="icons[linkType]" />
      <Icon class="icon" v-if="iconName" :name="iconName" />
    </template>
  </NuxtLink>
</template>

<style lang="sass" scoped>
.icon
  @apply flex-shrink-0 flex-grow-0
.default
  @apply align-bottom text-[1.5em]
.hasUnderline
  @apply underline underline-offset-8 decoration-2
</style>
