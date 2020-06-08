const crypto = require('crypto')
const path = require('path')
const fs = require('fs')
const { writeFileSync } = require('fs')
const { generateKeyPairSync } = require('crypto');
//this function will generate the keys and save it
function generateKeys() {
    return new Promise((resolve, reject) => {
        const { privateKey, publicKey } = generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: '',
            },
        })

        fs.writeFile(path.resolve(__dirname, `private.pem`), privateKey, (err, data) => {
            if (err) return reject(err);
            fs.writeFile(path.resolve(__dirname, `public.pem`), publicKey, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            });
        });
    });
    // writeFileSync('./private.pem', privateKey);
    // writeFileSync('./public.pem', publicKey);
};


/**
 * @param {To encrypt the message} 
 */
function encrypt(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey)
    const publicKey = fs.readFileSync(absolutePath, 'utf8')
    const buffer = Buffer.from(toEncrypt, 'utf8')
    const encrypted = crypto.publicEncrypt(publicKey, buffer)
    return encrypted.toString('base64')
}

/**
 * @param {To Decrypt the message} toDecrypt
 * @param {*} relativeOrAbsolutePathtoPrivateKey 
 */
function decrypt(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    const absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey)
    const privateKey = fs.readFileSync(absolutePath, 'utf8')
    const buffer = Buffer.from(toDecrypt, 'base64')
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey.toString(),
            passphrase: '',
        },
        buffer,
    )
    return decrypted.toString('utf8')
}

module.exports = {
    encrypt, decrypt, generateKeys
}


// const enc = encrypt('hello', `public.pem`)
// console.log('enc', enc)

// const dec = decrypt(enc, `private.pem`)
// console.log('dec', dec)
