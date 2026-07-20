import type { Meta, StoryObj } from "@storybook/vue3-vite";

import SubCategoryForm from "@/components/categories/forms/SubCategoryForm.vue";

const meta = {
  title: "Categories/SubCategoryForm",
  component: SubCategoryForm,
  tags: ["autodocs"],
} satisfies Meta<typeof SubCategoryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EditSubcategories: Story = {
  args: {
    loading: false,
    subcategories: [
      {
        id: "1",
        name: "Test #1",
        isActive: false,
        parentId: "1",
        sortOrder: 0,
        subcategories: [],
      },
      {
        id: "2",
        name: "Test #2",
        isActive: false,
        parentId: "1",
        sortOrder: 0,
        subcategories: [],
      },
      {
        id: "3",
        name: "Test #3",
        isActive: false,
        parentId: "1",
        sortOrder: 0,
        subcategories: [],
      },
    ],
  },
};

export const CreateSubcategories: Story = {
  args: {
    subcategories: [],
    loading: false,
  },
};
