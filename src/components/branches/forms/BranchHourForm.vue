<template>
  <v-form @submit.prevent="submit" class="pa-4">
    <v-alert v-if="error" :text="error" type="error" class="mb-6" />
    <v-row v-for="item in days" :key="item.id" class="" size="7">
      <v-col cols="4">
        <SelectDayOfWeek
          v-model="item.dayOfWeek"
          hide-details="auto"
          :disabled-days="
            days.map((v) => v.dayOfWeek).filter((v) => v !== undefined)
          "
        />
      </v-col>
      <v-col>
        <TimePicker
          :label="$t('branches.forms.fromHour')"
          v-model="item.fromHour"
          hide-details="auto"
        />
      </v-col>
      <v-col>
        <TimePicker
          :label="$t('branches.forms.toHour')"
          v-model="item.toHour"
          hide-details="auto"
        />
      </v-col>
      <v-col cols="1" class="d-flex justify-center align-center">
        <v-btn
          density="compact"
          icon="mdi-delete-outline"
          variant="text"
          @click="removeDay(Number(item.id))"
          :disabled="days.length === 1"
        >
        </v-btn>
      </v-col>
    </v-row>
    <div class="d-flex justify-start align-center ga-4 mt-4">
      <v-btn
        @click="addDay"
        :disabled
        type="button"
        append-icon="mdi-calendar-edit"
      >
        {{ $t("add") }}
      </v-btn>
      <v-btn type="submit" append-icon="mdi-content-save" :loading>
        {{ $t("save") }}
      </v-btn>
    </div>
  </v-form>
</template>
<script lang="ts" setup>
import type { BranchHourNode } from "@/graphql/branch/entities";

const emit = defineEmits<{
  submit: [BranchHourNode[]];
}>();

export interface Props {
  hours: BranchHourNode[];
  loading: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const days = ref<BranchHourNode[]>([]);

const initialDay: BranchHourNode = {
  id: "1",
  dayOfWeek: undefined,
  fromHour: "06:00",
  toHour: "18:00",
};

const disabled = computed(() => days.value.length === 7);

function addDay() {
  if (disabled.value) return;

  const nextId =
    days.value.length === 0
      ? 1
      : Math.max(...days.value.map((d) => Number(d.id))) + 1;

  days.value.push({
    id: String(nextId),
    dayOfWeek: undefined,
    fromHour: initialDay.fromHour,
    toHour: initialDay.toHour,
  });
}

const removeDay = (id: number) => {
  days.value = days.value.filter((d) => Number(d.id) !== id);
};

const submit = () => {
  const hours = days.value.filter((items) => items.dayOfWeek !== undefined);
  emit("submit", hours);
};

watch(
  () => props.hours,
  (hours) => {
    if (!hours?.length) {
      days.value = [initialDay];
      return;
    }
    days.value = [...hours];
  },
  {
    immediate: true,
  },
);
</script>
