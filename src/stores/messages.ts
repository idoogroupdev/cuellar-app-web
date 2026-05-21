import { defineStore } from "pinia";

type SnackbarMessage = {
  text: string;
  color: "error" | "success" | "info" | "warning";
};

export const useMessagesStore = defineStore("messages", () => {
  const queue = ref<SnackbarMessage[]>([]);

  function add(message: SnackbarMessage) {
    queue.value.push(message);
  }

  return { queue, add };
});
