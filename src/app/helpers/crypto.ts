import * as CryptoJS from "crypto-js";

export function encryptData(data: string) {
  try {
    return CryptoJS.AES.encrypt(data, "secret key 123").toString();
  } catch (e) {
    console.log(e);
  }
}

export function decryptData(data: string) {
  try {
    const bytes = CryptoJS.AES.decrypt(data, "secret key 123");
    if (bytes.toString()) {
      return bytes.toString(CryptoJS.enc.Utf8);
    }
    return data;
  } catch (e) {
    console.log(e);
  }
}
