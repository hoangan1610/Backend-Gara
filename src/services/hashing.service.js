import crypto from 'crypto';
import fs from 'fs';
export default class HashingService {
  constructor() {
    this.privateKey = fs.readFileSync('../keys/private.key', 'utf8');
  }

  verifyToken = (encryptedData) => {
    const decryptedData = crypto.privateDecrypt(
      {
        key: this.privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(encryptedData, 'base64') // Convert base64 -> Buffer
    );

    const data = JSON.parse(decryptedData.toString());

    return data;
  };
}