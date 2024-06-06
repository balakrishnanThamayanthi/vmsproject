
import packageJson from './../../package.json';
declare global {
  interface Window {
    REACT_APP_TARGET_ENV?: string;
    REACT_APP_API_URL?: string;
    REACT_APP_SQUIDX_URL?: string;
  }
}

export const TARGET_ENV =
  window.REACT_APP_TARGET_ENV || process.env.REACT_APP_TARGET_ENV || 'production';
export const API_URL = window.REACT_APP_API_URL
|| process.env.REACT_APP_API_URL;
export const SQUIDX_API_URL = window.REACT_APP_SQUIDX_URL
|| process.env.REACT_APP_SQUIDX_URL;

export const BASENAME = '/';
console.info(`Target env: ${TARGET_ENV}`);
console.info(`API URL: ${API_URL}`);
console.info(`Version: ${packageJson.version}`);
export const CURRENCY = 'LKR'



