import { encrypt } from "@lib/hash";

import type { NextApiRequest, NextApiResponse } from "next";

const ENCRYPT_SECRET = process.env.ENCRYPT_SECRET;
const SHARED_SECRET = process.env.SHARED_SECRET;

type Encrypt = {
  secret: string;
  message: string;
  signed_at: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret, message, signed_at } = req.body as Encrypt;
  if (secret !== ENCRYPT_SECRET)
    return res
      .status(401)
      .json({ status: false, error: "encrypt/unauthorized" });
  if (!message || !signed_at)
    res.status(401).json({ status: false, error: "encrypt/invalid-content" });
  const encrypted = encrypt({ message, signed_at }, SHARED_SECRET as string);
  if (!encrypted)
    res.status(400).json({ status: false, error: "encrypt/invalid-content" });
  res.status(200).json({ status: true, encrypted_data: encrypted });
}
