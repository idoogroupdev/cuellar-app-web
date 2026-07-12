<template>
  <v-dialog max-width="580" v-model="isOpen">
    <template #activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps">
        <v-btn
          v-bind="activatorProps"
          :text="
            isEditing
              ? $t('branches.modals.editTitle')
              : $t('branches.modals.createTitle')
          "
          :append-icon="isEditing ? 'mdi-pencil' : 'mdi-plus'"
        ></v-btn>
      </slot>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card
        :title="
          isEditing
            ? $t('branches.modals.editTitle')
            : $t('branches.modals.createTitle')
        "
        :subtitle="$t('branches.modals.description')"
      >
        <v-card-text>
          <v-sheet>
            <v-tabs v-model="tab" color="primary" direction="horizontal">
              <v-tab value="one">{{ $t("information") }}</v-tab>
              <v-tab value="two" v-if="isEditing">{{
                $t("workingHours")
              }}</v-tab>
            </v-tabs>
            <v-divider></v-divider>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="one">
                <BranchForm ref="formRef" @submit="onSubmit" :branch :loading />
              </v-tabs-window-item>
              <v-tabs-window-item value="two">
                <BranchHourForm
                  @submit="onSync"
                  :hours="branch?.branchHours ?? []"
                  :loading="synchronizing"
                  :error="syncError?.message"
                />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-sheet>
        </v-card-text>
        <template #append>
          <v-btn
            density="comfortable"
            icon="mdi-close"
            variant="text"
            @click="isActive.value = false"
          ></v-btn>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import BranchForm, {
  type BranchFormValues,
  type BranchFormErrors,
} from "@/components/branches/forms/BranchForm.vue";
import type { BranchNode, BranchHourNode } from "@/graphql/branch/entities";
import {
  useCreateBranch,
  useUpdateBranch,
  useSyncBranchHour,
} from "@/graphql/branch/composables";
import { normalizeApolloError } from "@/lib/helpers";
import { useMessagesStore } from "@/stores/messages";
import { useLocale } from "vuetify";
import type { BranchHour } from "@/graphql/branch/composables";

const emit = defineEmits<{
  "update:modelValue": [boolean];
  saved: [BranchNode];
  synced: [BranchHourNode[]];
}>();

const props = withDefaults(
  defineProps<{
    branch?: BranchNode | null;
  }>(),
  {
    branch: null,
  },
);

const isOpen = ref(false);
const tab = ref("one");

const { t } = useLocale();
const messages = useMessagesStore();
const isEditing = computed(() => Boolean(props.branch?.id));
const close = () => (isOpen.value = false);

const {
  mutate: createBranch,
  loading: creating,
  onError: onCreateError,
} = useCreateBranch();

const {
  mutate: updateBranch,
  loading: updating,
  onError: onUpdateError,
} = useUpdateBranch();

const {
  mutate: syncBranchHour,
  loading: synchronizing,
  error: syncError,
} = useSyncBranchHour();

const formRef = ref<InstanceType<typeof BranchForm> | null>(null);
const loading = computed(() => creating.value || updating.value);

const onSubmit = async (values: BranchFormValues) => {
  const result = isEditing.value
    ? await updateBranch({
        input: {
          id: values.id ?? "",
          name: values.name,
          address: values.address,
          isActive: values.isActive,
          isPickupEnabled: values.isPickupEnabled,
        },
      })
    : await createBranch({
        input: {
          name: values.name,
          address: values.address,
          isActive: values.isActive,
          isPickupEnabled: values.isPickupEnabled,
        },
      });

  const savedBranch =
    // @ts-ignore
    result?.data?.updateBranch?.branch ?? result?.data?.createBranch?.branch;

  if (savedBranch) {
    messages.add({
      text: t(
        isEditing.value ? "branches.forms.updated" : "branches.forms.created",
      ),
      color: "success",
      variant: "flat",
    });
    emit("saved", savedBranch);

    // close the modal after the branch is created
    if (!isEditing.value) {
      close();
    }
  }
};

const onSync = async (values: BranchHourNode[]) => {
  const hours = values.map((item) => ({
    dayOfWeek: item.dayOfWeek,
    fromHour: item.fromHour,
    toHour: item.toHour,
  }));

  const result = await syncBranchHour({
    input: {
      branchId: props.branch?.id as string,
      hours: hours as BranchHour[],
    },
  });

  const savedBranchHours = result?.data?.syncBranchHour?.branchHours;

  if (savedBranchHours) {
    messages.add({
      text: t(
        isEditing.value ? "branches.forms.updated" : "branches.forms.created",
      ),
      color: "success",
      variant: "flat",
    });
    emit("synced", savedBranchHours);
  }
};

onCreateError((error) => {
  const errors = normalizeApolloError(
    error?.graphQLErrors,
  ) as unknown as BranchFormErrors;

  formRef.value?.setErrors({
    ...errors,
  });
});

onUpdateError((error) => {
  const errors = normalizeApolloError(
    error?.graphQLErrors,
  ) as unknown as BranchFormErrors;

  formRef.value?.setErrors({
    ...errors,
  });
});
</script>
