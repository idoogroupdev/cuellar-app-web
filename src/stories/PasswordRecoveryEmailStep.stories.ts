import type { Meta, StoryObj } from "@storybook/vue3-vite";

import PasswordRecoveryEmailStep from "@/components/auth/forms/PasswordRecoveryEmailStep.vue";

const meta = {
  title: "Auth/PasswordRecoveryEmailStep",
  component: PasswordRecoveryEmailStep,
  tags: ["autodocs"],
} satisfies Meta<typeof PasswordRecoveryEmailStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
  },
};
