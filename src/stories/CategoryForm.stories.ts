import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CategoryForm from "@/components/categories/forms/CategoryForm.vue";

const meta = {
  title: "Categories/CategoryForm",
  component: CategoryForm,
  tags: ["autodocs"],
} satisfies Meta<typeof CategoryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
  args: {
    category: null,
    loading: false,
  },
};

export const Edit: Story = {
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

export const CreateCompact: Story = {
  args: {
    category: null,
    loading: false,
  },
};

export const EditCompact: Story = {
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
