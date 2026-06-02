<template>
  <v-dialog max-width="580" v-model="isOpen">
    <template #activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps">
        <v-btn
          v-bind="activatorProps"
          :text="
            isEditing
              ? $t('users.modals.user.createTitle')
              : $t('users.modals.user.createTitle')
          "
        ></v-btn>
      </slot>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card
        :title="
          isEditing
            ? $t('users.modals.user.editTitle')
            : $t('users.modals.user.createTitle')
        "
        :subtitle="$t('users.modals.user.description')"
      >
        <v-card-text>
          <UserForm
            :loading="loading"
            :user
            :roles
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
import UserForm, {
  type UserFormValues,
  type UserFormErrors,
} from "@/components/users/forms/UserForm.vue";
import type { RoleNode } from "@/graphql/entities/roles";
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
    modelValue: boolean;
    user?: UserNode | null;
    roles: RoleNode[];
  }>(),
  {
    modelValue: false,
    user: null,
    roles: () => [],
  },
);

const isOpen = defineModel<boolean>({
  default: false,
});

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

const userFormRef = ref<InstanceType<typeof UserForm> | null>(null);
const loading = computed(() => creating.value || updating.value);
const close = () => (isOpen.value = false);

const onSubmit = async (values: UserFormValues) => {
  const result = isEditing.value
    ? await updateUser({
        input: {
          id: values.id ?? "",
          password: values.password,
          roleName: values.roleName,
          firstName: values.firstName,
          lastName: values.lastName,
          isActive: values.isActive,
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
          ? "users.forms.user.updated"
          : "users.forms.user.created",
      ),
      color: "success",
    });
    emit("saved", savedUser);
  }
};

onCreateError((error) => {
  const errors = normalizeApolloError(
    error?.graphQLErrors,
  ) as unknown as UserFormErrors;

  userFormRef.value?.setErrors({
    ...errors,
  });
});

onUpdateError((error) => {
  const errors = normalizeApolloError(
    error?.graphQLErrors,
  ) as unknown as UserFormErrors;

  userFormRef.value?.setErrors({
    ...errors,
  });
});
</script>
