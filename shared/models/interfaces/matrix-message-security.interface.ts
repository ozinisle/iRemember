import * as CryptoJS from 'crypto-js';
export interface MatrixMessageSecurityInterface {
    /**
    * The method should be used for CryptoJS: javascript encrypt -> PHP7.2+ openssl decrypt combination
    * This method helps encrypt the message sent to the server
    * @param request a json object
    * @returns encryptedMessage as string
    */
    CryptoJS_Aes_OpenSSL_Encrypt(request: any): string;
    /**
    * The method should be used for CryptoJS: javascript encrypt -> PHP7.2+ openssl decrypt combination
    * This method helps decrypt the message received from the server
    * @param encrypted_response: OpenSSLCommTransactionInterface
    * @returns decryptedMessage as string
    */
    CryptoJS_Aes_OpenSSL_Decrypt(encrypted_response: OpenSSLCommTransactionInterface): any;
    /**
    * The method should be used in conjuction with mcrypt_decrypt methods available in php5 and less
    * This method helps encrypt the message sent to the server
    * @param requestObj a json object
    * @returns encryptedMessage as string
    */
    getMcrypt_EncryptedMessage(requestObj: any): string;
    /**
    * The method should be used in conjuction with mcrypt_decrypt methods available in php5 and less
    * The method helps decrypt the encrypted message sent by the server
    * @param encryptedMessage : string
    * @returns decryptedMessage as string
    */
    getMcrypt_DecryptedMessage(encryptedMessage: string): any;
}
export interface OpenSSLCommTransactionInterface {
    ciphertext: string;
    salt: string;
    iv: string;
}
