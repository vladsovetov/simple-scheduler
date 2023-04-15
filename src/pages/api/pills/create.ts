// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pillsRepo } from "@/repo/pills-repo";
import { Pill } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pill>
) {
  res.status(200).json(pillsRepo.create(JSON.parse(req.body)));
}
