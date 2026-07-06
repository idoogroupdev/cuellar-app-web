<template>
  <v-select
    :label="$t('days.label')"
    v-model="day"
    :items="items"
    item-title="text"
    item-value="value"
  ></v-select>
</template>
<script lang="ts" setup>
import { useLocale } from "vuetify";

const { t } = useLocale();

type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface Props {
  disabledDays?: DayOfWeek[];
}

const props = withDefaults(defineProps<Props>(), {});

const items = computed(() => {
  const days: Array<{ text: string; value: DayOfWeek }> = [
    { text: t("days.monday"), value: "MONDAY" },
    { text: t("days.tuesday"), value: "TUESDAY" },
    { text: t("days.wednesday"), value: "WEDNESDAY" },
    { text: t("days.thursday"), value: "THURSDAY" },
    { text: t("days.friday"), value: "FRIDAY" },
    { text: t("days.saturday"), value: "SATURDAY" },
    { text: t("days.sunday"), value: "SUNDAY" },
  ];

  return days.filter((day) => !props.disabledDays?.includes(day.value));
});

const day = defineModel<string>("day", { type: String });
</script>
