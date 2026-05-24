import EmailIcon from "@/components/iconsax/EmailIcon.vue";
import LockIcon from "@/components/iconsax/LockIcon.vue";
import type { IconAliases } from "vuetify";

export const iconsax = {
  email: EmailIcon as IconAliases[string],
  lock: LockIcon as IconAliases[string],
} satisfies Partial<IconAliases>;
