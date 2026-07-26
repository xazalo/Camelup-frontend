<script setup lang="ts">

import { ref } from "vue";

const emit = defineEmits<{
  select: [
    data: {
      position: number;
      tileType: string;
    }
  ];

  close: [];
}>();


const position = ref<number | null>(null);
const tileType = ref<string>("");


const tileTypes = [
  "oasis",
  "trap",
];


function confirm() {

  if (
    position.value === null ||
    !tileType.value
  ) {
    return;
  }


  emit("select", {
    position: position.value,
    tileType: tileType.value,
  });
}

</script>


<template>

  <div class="tile-selector">

    <h3>
      Select tile
    </h3>


    <input
      v-model.number="position"
      type="number"
      placeholder="Position"
    />


    <select v-model="tileType">

      <option
        disabled
        value=""
      >
        Select type
      </option>


      <option
        v-for="type in tileTypes"
        :key="type"
        :value="type"
      >
        {{ type }}
      </option>

    </select>


    <button @click="confirm">
      Confirm
    </button>


    <button @click="$emit('close')">
      Cancel
    </button>

  </div>

</template>