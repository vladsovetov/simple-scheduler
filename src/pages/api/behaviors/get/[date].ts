// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { behaviorsRepo } from "@/repo/behaviors-repo";
import { Behavior } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Behavior[]>
) {
  const { date } = req.query;
  res.status(200).json(behaviorsRepo.getByDate(String(date)));
}
