export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;
export const API_BASE_URL: string = `http://${HOST}:${PORT}`;
//export const REST_BASE_URL: string = 'https://1stcreditv5-dev.telrock.com/telrock-tas-war/rest/';
export const REST_BASE_URL: string = 'https://1stcreditqa-dev.telrock.com/telrock-tas-war/rest/';
