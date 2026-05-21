import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Login from "@/components/auth/forms/Login.vue";

const meta = {
  title: "Auth/Login",
  component: Login,
  tags: ["autodocs"],
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
  },
};
