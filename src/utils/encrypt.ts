export { AES } from 'crypto-js';

export class Base64 {
  encrypt(p: string, k = 'gYn') {
    return btoa(k.split('').reverse().join('') + btoa(p));
  }

  decrypt(p: string, k = 'gYn') {
    return atob(atob(p).substr(k.length));
  }
}

