import type { Meta, StoryObj } from "@storybook/vue3-vite";

import SelectDayOfWeek from "@/components/branches/inputs/SelectDayOfWeek.vue";

const meta = {
  title: "Branches/SelectDayOfWeek",
  component: SelectDayOfWeek,
  tags: ["autodocs"],
} satisfies Meta<typeof SelectDayOfWeek>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
