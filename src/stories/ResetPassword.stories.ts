import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ResetPassword from "@/components/auth/forms/ResetPassword.vue";

const meta = {
  title: "Auth/ResetPassword",
  component: ResetPassword,
  tags: ["autodocs"],
} satisfies Meta<typeof ResetPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
  },
};
