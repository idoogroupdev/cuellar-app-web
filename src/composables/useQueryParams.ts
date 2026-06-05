import { type LocationQueryValue, useRoute, useRouter } from "vue-router";
import { isNumeric } from "@/lib/helpers";

function prefixedKey(key: string, field: string) {
  return `${key}_${field}`;
}

function getParamValue(
  defaultValue: any,
  paramValue: LocationQueryValue | LocationQueryValue[],
) {
  if (typeof defaultValue === "number" || isNumeric(String(paramValue))) {
    return Number(paramValue);
  }

  if (
    defaultValue === undefined &&
    typeof paramValue === "string" &&
    paramValue.length === 0
  ) {
    return undefined;
  }

  return paramValue as any;
}

export function useQueryParams() {
  const route = useRoute();
  const router = useRouter();

  function read<T>(key: string, defaults: T): T {
    const result = { ...defaults };

    for (const paramName in defaults) {
      const paramKey = prefixedKey(key, paramName);
      const paramValue = route.query[paramKey];

      if (paramValue !== undefined) {
        const defaultValue = defaults[paramName];
        result[paramName] = getParamValue(defaultValue, paramValue);
      }
    }

    return result;
  }

  function write<T extends Record<string, any>>(key: string, value: T) {
    const nextQuery = { ...route.query };

    for (const paramName in value) {
      const paramKey = prefixedKey(key, paramName);
      const paramValue = value[paramName];

      if (paramValue === null || paramValue === undefined) {
        delete nextQuery[paramKey];
      } else {
        nextQuery[paramKey] = String(paramValue);
      }
    }

    router.replace({ query: nextQuery });
  }

  return { read, write };
}
