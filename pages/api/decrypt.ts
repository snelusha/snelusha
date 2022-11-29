import { decrypt } from "@lib/hash";

import type { NextApiRequest, NextApiResponse } from "next";

const SHARED_SECRET = process.env.SHARED_SECRET;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data } = req.body;
  const decrypted = decrypt(data, SHARED_SECRET as string);
  if (!decrypted)
    return res
      .status(400)
      .json({ status: false, error: "decrypt/invalid-content" });
  res
    .status(200)
    .json({
      status: true,
      message: decrypted.message,
      signed_at: decrypted.signed_at,
    });
}
