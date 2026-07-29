<script setup lang="ts">
import HomeHero from "@/components/HomeHero.vue";
import LobbyEntry from "@/components/lobby/LobbyEntry.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();

const lobbyCode = ref(
  typeof route.query.code === "string"
    ? route.query.code
    : undefined,
);
</script>

<template>
  <div class="wrapper">
    <HomeHero />
  </div>
  <div class="wrapper">
    <LobbyEntry :lobbyCode="lobbyCode"/>
  </div>
</template>
