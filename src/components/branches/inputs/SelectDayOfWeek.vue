<template>
  <v-select
    :label="$t('days.label')"
    v-model="day"
    :items="[
      { text: $t('days.monday'), value: 'MONDAY' },
      { text: $t('days.tuesday'), value: 'TUESDAY' },
      { text: $t('days.wednesday'), value: 'WEDNESDAY' },
      { text: $t('days.thursday'), value: 'THURSDAY' },
      { text: $t('days.friday'), value: 'FRIDAY' },
      { text: $t('days.saturday'), value: 'SATURDAY' },
      { text: $t('days.sunday'), value: 'SUNDAY' },
    ]"
    item-title="text"
    item-value="value"
  ></v-select>
</template>
<script lang="ts" setup>
const day = defineModel<string>("day", { type: String });
</script>
