import EmailIcon from "@/components/iconsax/EmailIcon.vue";
import type { IconAliases } from "vuetify";

export const iconsax = {
  email: EmailIcon as IconAliases[string],
} satisfies Partial<IconAliases>;
