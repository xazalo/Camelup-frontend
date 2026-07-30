<script setup lang="ts">
import { onMounted } from "vue";
import { useFx } from "@/composables/useFx";

const { init } = useFx();

onMounted(() => {
  init();
});
</script>

<template />