import Cookies from "js-cookie";

interface Props {
  name: "token" | "refresh";
  value: string;
  expires?: number;
}

export function useAuthCookie() {
  const token = Cookies.get("token");
  const refresh = Cookies.get("refresh");

  function set(options: Props[]) {
    for (const option of options) {
      Cookies.set(option.name, option.value, {
        expires: option.expires,
      });
    }
  }

  function remove() {
    const cookieNames: Array<Props["name"]> = ["token", "refresh"];
    for (const cookieName of cookieNames) {
      Cookies.remove(cookieName);
    }
  }

  return {
    token,
    refresh,
    setCookie: set,
    deleteCookies: remove,
  };
}
