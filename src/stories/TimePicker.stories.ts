import type { Meta, StoryObj } from "@storybook/vue3-vite";

import TimePicker from "@/components/common/TimePicker.vue";

const meta = {
  title: "Common/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Select time",
  },
};
