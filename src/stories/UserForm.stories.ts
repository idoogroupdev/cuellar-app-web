import type { Meta, StoryObj } from "@storybook/vue3-vite";

import UserForm from "@/components/users/forms/UserForm.vue";

const adminRole = {
  id: "1",
  name: "ADMIN",
};

const user = {
  id: "1",
  email: "usuario@example.com",
  firstName: "Juan",
  lastName: "Perez",
  username: "usuario",
  isActive: true,
  isStaff: true,
  isSuperuser: false,
  isVerified: true,
  role: adminRole,
  permissions: [],
};

const meta = {
  title: "Users/UserForm",
  component: UserForm,
  tags: ["autodocs"],
} satisfies Meta<typeof UserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
  args: {
    loading: false,
  },
};

export const Edit: Story = {
  args: {
    loading: false,
    user,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    user,
  },
};
