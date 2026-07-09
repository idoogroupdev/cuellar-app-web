import type { Meta, StoryObj } from "@storybook/vue3-vite";

import BranchHourForm from "@/components/branches/forms/BranchHourForm.vue";

const meta = {
  title: "Branches/BranchHourForm",
  component: BranchHourForm,
  tags: ["autodocs"],
} satisfies Meta<typeof BranchHourForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
  args: {
    hours: [],
    loading: false,
  },
};

export const Edit: Story = {
  args: {
    loading: false,
    hours: [
      {
        id: "1",
        dayOfWeek: "MONDAY",
        fromHour: "10:00",
        toHour: "12:00",
      },
      {
        id: "2",
        dayOfWeek: "TUESDAY",
        fromHour: "10:00",
        toHour: "12:00",
      },
    ],
  },
};

export const Error: Story = {
  args: {
    hours: [],
    loading: false,
    error: "Error",
  },
};
