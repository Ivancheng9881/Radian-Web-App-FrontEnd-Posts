import crypto from "crypto";

const GroupKeyConfig = {
  algorithm: "aes256",
  inputEncoding: "utf8",
  outputEncoding: "hex",
  ivlength: 16,
};


const generateCipherKey = (signedMessage) => {
  let key = signedMessage.slice(2, 2 + 32);
  return key;
};

const generateCipherIv = (signedMessage) => {
  let iv = signedMessage.slice(34, 34 + 16);
  return iv;
};

const generateGroupKey = (key, iv) => {
  let cipher = crypto.createCipheriv(
    GroupKeyConfig,
    Buffer.from(key),
    Buffer.from(iv)
  );
  return cipher;
};

const groupEncryptUtils = {
  generateCipherKey,
  generateCipherIv,
  generateGroupKey,
};

export default groupEncryptUtils;
