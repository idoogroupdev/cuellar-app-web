<template>
  <v-dialog max-width="580" v-model="isOpen">
    <template #activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps">
        <v-btn
          v-bind="activatorProps"
          :text="
            isEditing
              ? $t('users.modals.client.editTitle')
              : $t('users.modals.client.createTitle')
          "
          :append-icon="isEditing ? 'mdi-pencil' : 'mdi-plus'"
        ></v-btn>
      </slot>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card
        :title="
          isEditing
            ? $t('users.modals.client.editTitle')
            : $t('users.modals.client.createTitle')
        "
        :subtitle="$t('users.modals.client.description')"
      >
        <v-card-text>
          <ClientForm
            :loading="loading"
            :user
            @submit="onSubmit"
            ref="userFormRef"
          />
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
import ClientForm, {
  type ClientFormValues,
  type ClientFormErrors,
} from "@/components/users/forms/ClientForm.vue";
import type { UserNode } from "@/graphql/entities/user";
import { useCreateUser, useUpdateUser } from "@/graphql/composables/user";
import { normalizeApolloError } from "@/lib/helpers";
import { useMessagesStore } from "@/stores/messages";
import { useLocale } from "vuetify";

const emit = defineEmits<{
  "update:modelValue": [boolean];
  saved: [UserNode];
}>();

const props = withDefaults(
  defineProps<{
    user?: UserNode | null;
  }>(),
  {
    user: null,
  },
);

const isOpen = ref(false);

const { t } = useLocale();
const messages = useMessagesStore();
const isEditing = computed(() => Boolean(props.user?.id));

const {
  mutate: createUser,
  loading: creating,
  onError: onCreateError,
} = useCreateUser();

const {
  mutate: updateUser,
  loading: updating,
  onError: onUpdateError,
} = useUpdateUser();

const userFormRef = ref<InstanceType<typeof ClientForm> | null>(null);
const loading = computed(() => creating.value || updating.value);
const close = () => (isOpen.value = false);

const onSubmit = async (values: ClientFormValues) => {
  const result = isEditing.value
    ? await updateUser({
        input: {
          id: values.id ?? "",
          password: values.password,
          roleName: values.roleName,
          firstName: values.firstName,
          lastName: values.lastName,
          isActive: values.isActive,
          phone: values.phone,
        },
      })
    : await createUser({
        input: {
          email: values.email,
          password: values.password ?? "",
          roleName: values.roleName,
          firstName: values.firstName,
          lastName: values.lastName,
          isActive: values.isActive,
          phone: values.phone,
        },
      });

  const savedUser =
    // @ts-ignore
    result?.data?.updateUser?.user ?? result?.data?.createUser?.user;

  if (savedUser) {
    close();
    messages.add({
      text: t(
        isEditing.value
          ? "users.forms.client.updated"
          : "users.forms.client.created",
      ),
      color: "success",
      variant: "flat",
    });
    emit("saved", savedUser);
  }
};

onCreateError((error) => {
  const errors = normalizeApolloError(
    error?.graphQLErrors,
  ) as unknown as ClientFormErrors;

  userFormRef.value?.setErrors({
    ...errors,
  });
});

onUpdateError((error) => {
  const errors = normalizeApolloError(
    error?.graphQLErrors,
  ) as unknown as ClientFormErrors;

  userFormRef.value?.setErrors({
    ...errors,
  });
});
</script>
