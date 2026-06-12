import type { Meta, StoryObj } from "@storybook/vue3-vite";

import SelectRole from "@/components/users/inputs/SelectRole.vue";

const meta = {
  title: "Forms/SelectRole",
  component: SelectRole,
  tags: ["autodocs"],
} satisfies Meta<typeof SelectRole>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Error: Story = {
  args: {
    errorMessages: "Error message",
  },
};
