export { AES } from 'crypto-js';

// node-browser-compat/btoa
function btoa(str) {
  return new Buffer(str).toString('base64');  // browser implement not support UTF-8 but this works
}

// node-browser-compat/atob
function atob(str) {
  return new Buffer(str, 'base64').toString('binary');
}

export class Base64 {
  encrypt(p: string, k = 'gYn') {
    return btoa(k.split('').reverse().join('') + btoa(p));
  }

  decrypt(p: string, k = 'gYn') {
    return atob(atob(p).substr(k.length));
  }
}

