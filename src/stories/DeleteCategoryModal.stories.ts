import type { Meta, StoryObj } from "@storybook/vue3-vite";

import DeleteCategoryModal from "@/components/categories/modals/DeleteCategoryModal.vue";

const meta = {
  title: "Categories/DeleteCategoryModal",
  component: DeleteCategoryModal,
  tags: ["autodocs"],
} satisfies Meta<typeof DeleteCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: {
      id: "1",
      name: "Test",
      isActive: false,
      parentId: "1",
      sortOrder: 0,
      subcategories: [],
    },
    loading: false,
  },
};
