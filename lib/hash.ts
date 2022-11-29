import crypto from "crypto";

export type Hash = {
  message: string;
  signed_at: string;
};

const ALGORITHM = "aes-256-cbc";

export function getCipherKey(password: string) {
  return crypto.createHash("sha256").update(password).digest();
}

export function encrypt(data: any, password: string) {
  try {
    const iv = crypto.randomBytes(16);
    const key = getCipherKey(password);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    const encrypted = Buffer.concat([
      cipher.update(JSON.stringify(data)),
      cipher.final(),
    ]);
    return iv.toString("hex").concat(encrypted.toString("hex"));
  } catch {
    return null;
  }
}

export function decrypt(data: string, password: string) {
  try {
    if (!data || !password) return null;
    const iv = Buffer.from(data.substring(0, 32), "hex");
    const key = getCipherKey(password);
    const encrypted = Buffer.from(data.substring(32), "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
    return JSON.parse(decrypted.toString()) as Hash;
  } catch (e) {
    console.log(e);
    return null;
  }
}
