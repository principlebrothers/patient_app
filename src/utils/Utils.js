import CryptoJS from "crypto-js";

const toUrlSafeBase64 = (str) => {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const fromUrlSafeBase64 = (str) => {
  return str.replace(/-/g, '+').replace(/_/g, '/');
};

const SECRET_KEY = import.meta.env.VITE_PATIENT_APP_CRYPTOJS_SECRET;

export const encryptId = (id) => {
  const encrypted = CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
  return toUrlSafeBase64(encrypted);
};

export const decryptId = (encryptedId) => {
  const encryptedBase64 = fromUrlSafeBase64(encryptedId);
  const bytes = CryptoJS.AES.decrypt(encryptedBase64, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

export const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-GB', options);
};

export const today = new Date().toLocaleDateString('en-GB', options);

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const handleLogout = (navigateHook) => {
  localStorage.removeItem('authToken')
  navigateHook('/', { replace: true });
}