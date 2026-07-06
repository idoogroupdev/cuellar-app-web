<template>
  <v-text-field
    v-model="time"
    :label
    prepend-inner-icon="mdi-clock-time-four-outline"
    readonly
  >
    <v-menu
      v-model="showMenu"
      :close-on-content-click="false"
      activator="parent"
      min-width="0"
    >
      <v-time-picker v-model="time"></v-time-picker>
    </v-menu>
  </v-text-field>
</template>
<script lang="ts" setup>
export interface Props {
  label: string;
}

withDefaults(defineProps<Props>(), {
  label: "Select time",
});

const time = defineModel<string>({ type: String });
const showMenu = ref(false);
</script>
