import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ResetPasswordStep from "@/components/auth/forms/ResetPasswordStep.vue";

const meta = {
  title: "Auth/ResetPasswordStep",
  component: ResetPasswordStep,
  tags: ["autodocs"],
} satisfies Meta<typeof ResetPasswordStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
  },
};

export const BackendErrors: Story = {
  args: {
    loading: false,
    errors: {
      password: "Message error",
    },
  },
};
