import type { Meta, StoryObj } from "@storybook/vue3-vite";

import PasswordRecoveryOtpStep from "@/components/auth/forms/PasswordRecoveryOtpStep.vue";

const meta = {
  title: "Auth/PasswordRecoveryOtpStep",
  component: PasswordRecoveryOtpStep,
  tags: ["autodocs"],
} satisfies Meta<typeof PasswordRecoveryOtpStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    reSending: false,
  },
};
