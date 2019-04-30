import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { MatrixMessageSecurityInterface, OpenSSLCommTransactionInterface } from '../models/interfaces/matrix-message-security.interface';
import { MatrixErrorHandlerService } from './matrix-error-handler.service';
@Injectable({
    providedIn: 'root'
})
export class MatrixCommunicationChannelEncryptionService implements MatrixMessageSecurityInterface {
    constructor(private errorHandler: MatrixErrorHandlerService) { }
    private requestEncryptionKey = CryptoJS.enc.Hex.parse('bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3');
    private requestKeyIv = CryptoJS.enc.Hex.parse('101112131415161718191a1b1c1d1e1f');
    private encryptionPassPhrase = 'a3ed82d0522b3cff735b642403b312c35efd879e65d201c08407dbb27b95c2132a7ff9d97c85a77190';
    private decryptionPassPhrase = 'ecdf1ee7690c878a4ff58fbcc23c6e110fb13c3e9a60c48a651869115b5b1f51ef7bed15044516842c3';
    /**
    * The method should be used for CryptoJS: javascript encrypt -> PHP7.2+ openssl decrypt combination
    * This method helps encrypt the message sent to the server
    * @param request a json object
    * @returns encryptedMessage as string
    */
    CryptoJS_Aes_OpenSSL_Encrypt(requestObj: JSON): string {
        try {
            const plain_text = JSON.stringify(requestObj);
            const salt: string = CryptoJS.lib.WordArray.random(256);
            const iv: string = CryptoJS.lib.WordArray.random(16);
            // for more random entropy can use : https://github.com/wwwtyro/cryptico/blob/master/random.js
            // instead CryptoJS random() or another js PRNG
            const key: CryptoJS.WordArray = CryptoJS.PBKDF2(this.encryptionPassPhrase, salt,
                { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });
            const encryptedContent: CryptoJS.WordArray = CryptoJS.AES.encrypt(plain_text, key, { iv: iv });
            const data: OpenSSLCommTransactionInterface = {
                ciphertext: CryptoJS.enc.Base64.stringify(encryptedContent.ciphertext),
                salt: CryptoJS.enc.Hex.stringify(salt),
                iv: CryptoJS.enc.Hex.stringify(iv)
            };
            return JSON.stringify(data);
        } catch (error) {
            this.errorHandler.handleError(error);
        }
    }
    /**
    * The method should be used for CryptoJS: javascript encrypt -> PHP7.2+ openssl decrypt combination
    * This method helps decrypt the message received from the server
    * @param encrypted_response: OpenSSLCommTransactionInterface
    * @returns decryptedMessage as string
    */
    CryptoJS_Aes_OpenSSL_Decrypt(encrypted_response: OpenSSLCommTransactionInterface): any {
        let decryptedResponse = null;
        try {

            const encrypted: string = encrypted_response.ciphertext;
            const salt: string = CryptoJS.enc.Hex.parse(encrypted_response.salt);
            const iv: string = CryptoJS.enc.Hex.parse(encrypted_response.iv);

            if (encrypted && salt && iv) {
                const key: CryptoJS.WordArray = CryptoJS.PBKDF2(this.decryptionPassPhrase, salt,
                    { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });
                const decrypted: CryptoJS.DecryptedMessage = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });
                console.log('decrypted response >>> ' + decrypted.toString(CryptoJS.enc.Utf8));
                decryptedResponse = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
            } else {

                decryptedResponse = null;
                console.error('invalid decrypted response');
            }

        } catch (error) {
            this.errorHandler.handleError(error);
        } finally {
            return decryptedResponse;
        }
    }
    /**
    * The method should be used in conjuction with mcrypt_decrypt methods available in php5 and less
    * This method helps encrypt the message sent to the server
    * @param requestObj: object
    */
    getMcrypt_EncryptedMessage(requestObj: object): string {
        try {
            const key = CryptoJS.PBKDF2(this.requestEncryptionKey, CryptoJS.enc.Hex.parse('salt-for-encryption'), {
                keySize: 128 / 32,
                iterations: 10000
            });
            const encryptedRequest: CryptoJS.WordArray = CryptoJS.AES.encrypt(JSON.stringify(requestObj), key,
                { iv: this.requestKeyIv });
            const cipher: any = encryptedRequest.ciphertext; // cipher's type is supposed to be CryptoJS.WordArray.init
            const cipherText = cipher.toString(CryptoJS.enc.Base64);
            return cipherText;
        } catch (error) {
            this.errorHandler.handleError(error);
        }
    }
    /**
    * The method should be used in conjuction with mcrypt_decrypt methods available in php5 and less
    * The method helps decrypt the encrypted message sent by the server
    * @param encryptedMessage: string
    */
    getMcrypt_DecryptedMessage(encryptedMessage: string): JSON {
        try {
            const key = CryptoJS.PBKDF2('key-phrase-for-decription', CryptoJS.enc.Hex.parse('salt-for-decryption'), {
                keySize: 128 / 32,
                iterations: 10000
            });
            const decryptedResponse: CryptoJS.DecryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, key,
                { iv: CryptoJS.enc.Hex.parse('decryption-keyiv') });
            const decryptedResponsePlainMessageText = decryptedResponse.toString(CryptoJS.enc.Utf8);
            const decryptedMessage = JSON.parse(decryptedResponsePlainMessageText);
            return decryptedMessage;
        } catch (error) {
            this.errorHandler.handleError(error);
        }
    }

    //just for client side decruption
    getMcrypt_DecryptedMessage_clientOnly(encryptedMessage: string): JSON {
        try {
            const key = CryptoJS.PBKDF2('key-phrase-for-decription', CryptoJS.enc.Hex.parse('salt-for-encryption'), {
                keySize: 128 / 32,
                iterations: 10000
            });
            const decryptedResponse: CryptoJS.DecryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, key,
                { iv: CryptoJS.enc.Hex.parse(this.requestKeyIv) });
            const decryptedResponsePlainMessageText = decryptedResponse.toString(CryptoJS.enc.Utf8);
            const decryptedMessage = JSON.parse(decryptedResponsePlainMessageText);
            return decryptedMessage;
        } catch (error) {
            this.errorHandler.handleError(error);
        }
    }
}
