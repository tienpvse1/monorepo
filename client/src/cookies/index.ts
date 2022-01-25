import { EXPIRATION, TOKEN } from '../constance/cookie';

export const getCookies = (field = '') => {
  const rawCookieString = document.cookie;
  const rawCookies: string[] = rawCookieString.split(';');
  const cookies = [];
  for (let rawCookie of rawCookies) {
    rawCookie = rawCookie.trim();
    const currentCookie = rawCookie.split('=');
    if (rawCookie.includes(field)) {
      cookies.push({
        [currentCookie[0]]: decodeURI(currentCookie[1]),
      });
    }
  }
  return cookies;
};

export const setCookie = (name: string, value: string, expireDates: number) => {
  const d = new Date();
  d.setTime(d.getTime() + expireDates * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
};

export const getToken = () => {
  return getCookies(TOKEN)[0]?.token;
};

export const setToken = (token: string) => {
  return setCookie(TOKEN, token, EXPIRATION);
};

export const removeCookie = (token: string) => {
  document.cookie = `${token}= ; expires = ${Date.now()}`;
};
