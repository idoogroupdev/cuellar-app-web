import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Pagination, { type Props } from "@/components/ui/Pagination.vue";

const meta: Meta = {
  title: "Ui/Pagination",
  component: Pagination,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<Props>;

export const Default: Story = {
  args: {
    pageInfo: {
      endCursor: "",
      hasNextPage: true,
      hasPreviousPage: true,
      startCursor: "",
    },
  },
};
