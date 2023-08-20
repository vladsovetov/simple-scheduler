// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { behaviorsRepo } from "@/repo/behaviors-repo";
import { Behavior } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Behavior>
) {
  res.status(200).json(behaviorsRepo.create(JSON.parse(req.body)));
}
