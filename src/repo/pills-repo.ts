import { Pill } from "@/types";

const fs = require("fs");

export const pillsRepo = {
  getAll: () => getPills(),
  getById: (id: number) =>
    getPills().find((pill) => pill.id.toString() === id.toString()),
  getByDate: (date: string) =>
    getPills().filter((pill) => pill.startDate === date),
  create,
  update,
};

function create(data: Omit<Pill, "id" | "created" | "updated">) {
  const pills = getPills();
  const newPill = {
    id: pills.length ? pills.length + 1 : 1,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    ...data,
  };

  pills.push(newPill);
  savePills(pills);
  return newPill;
}

function update(id: Pill["id"], data: Partial<Omit<Pill, "id">>) {
  const pills = getPills();
  const pillIndex = pills.findIndex((x) => x.id === id);
  const pill = pills[pillIndex];

  if (pill) {
    const updatedPill = {
      ...pill,
      ...data,
      updated: new Date().toISOString(),
    };
    pills[pillIndex] = updatedPill;
    savePills(pills);
  }
}

function savePills(pills: Pill[]) {
  fs.writeFileSync("./data/pills.json", JSON.stringify(pills, null, 4));
}
function getPills(): Pill[] {
  if (!fs.existsSync("./data/pills.json")) {
    fs.mkdirSync("./data");
    fs.writeFileSync("./data/pills.json", "[]");
  }
  return JSON.parse(fs.readFileSync("./data/pills.json", "utf8"));
}
