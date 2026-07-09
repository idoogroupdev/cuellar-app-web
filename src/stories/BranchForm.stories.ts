import type { Meta, StoryObj } from "@storybook/vue3-vite";

import BranchForm from "@/components/branches/forms/BranchForm.vue";

const meta = {
  title: "Branches/BranchForm",
  component: BranchForm,
  tags: ["autodocs"],
} satisfies Meta<typeof BranchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
  args: {
    branch: null,
    loading: false,
  },
};

export const Edit: Story = {
  args: {
    branch: {
      id: "1",
      name: "Test",
      address: "Test",
      isActive: false,
      isPickupEnabled: true,
      branchHours: [],
    },
    loading: false,
  },
};
