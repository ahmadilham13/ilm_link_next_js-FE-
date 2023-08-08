import { parseCookies, setCookie, destroyCookie } from "nookies";
import swal from "sweetalert";

const tokenCookieName = "loginToken";

export const setCookieLogin = (token) => {
  const cookies = parseCookies();

  // set cookie
  setCookie(null, tokenCookieName, `${token}`, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const getCookieLogin = () => {
  const cookie = parseCookies(tokenCookieName);
  if (!cookie) {
    return false;
  }

  return true;
};

export const unSetCookieLogin = () => {
  destroyCookie(null, tokenCookieName);

  swal("Success", "Save Success", "success");
  // redirect
  setTimeout(() => {
    window.location = "/";
  }, 2000);
};
