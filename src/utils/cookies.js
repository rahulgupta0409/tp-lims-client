import Cookies from "js-cookie";
import { encrypt, decrypt } from "./crypto";

export function setCookie(name, value, options = {}) {
  const encryptedValue = encrypt(value);
  Cookies.set(name, encryptedValue, options);
}

export function getCookie(name) {
  const encryptedValue = Cookies.get(name);
  return encryptedValue ? decrypt(encryptedValue) : null;
}

export function removeCookie(name) {
  Cookies.remove(name);
}
