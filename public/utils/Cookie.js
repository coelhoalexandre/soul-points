export default class Cookie {
  static createCookie(key, value) {
    document.cookie = `${key}=${value};path=/`;
  }

  static readCookie(key) {
    return document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${key}=`))
      ?.split("=")[1];
  }

  static deleteCookie(key) {
    document.cookie = `${key}=; expire=Thu, 01 Jan 1970 00:00:00`;
  }
}
