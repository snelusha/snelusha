// import { Low, JSONFileAdapter } from "@lib/jsondb";
import { Low } from "@lib/low";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = new Low("db.json");
  console.log(await db.read());
  await db.write({ goodbye: false });
  console.log(await db.read());
  const data = await db.read();
  res.status(200).json(data);
}
