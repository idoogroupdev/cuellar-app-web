import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ClientForm from "@/components/users/forms/ClientForm.vue";

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
  branch: null,
  phone: "+1111111111",
  cashbackBalance: "0.00",
};

const meta = {
  title: "Users/ClientForm",
  component: ClientForm,
  tags: ["autodocs"],
} satisfies Meta<typeof ClientForm>;

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
