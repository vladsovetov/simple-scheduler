import { Pill } from "@/types";

const fs = require("fs");

export const pillsRepo = {
  getAll: () => getPills(),
  getById: (id: number) =>
    getPills().find((pill) => pill.id.toString() === id.toString()),
  getByDate,
  create,
  update,
  remove,
};

function create(data: Omit<Pill, "id" | "created" | "updated">) {
  const pills = getPills();
  const maxId = Math.max(...pills.map((x) => x.id));
  const newPill = {
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    ...data,
    id: maxId + 1,
  };

  pills.push(newPill);
  savePills(pills);
  return newPill;
}

function update(id: Pill["id"], data: Partial<Omit<Pill, "id">>) {
  const pills = getPills();
  const pillIndex = pills.findIndex((x) => x.id === id) || 1;
  const pill = pills[pillIndex];

  if (pill) {
    let updatedPill: Pill = {
      ...pill,
      ...data,
      updated: new Date().toISOString(),
    };
    if (pill.startDate === data.startDate) {
      updatedPill = {
        ...pill,
        ...data,
        updated: new Date().toISOString(),
      };
    } else if (data.startDate) {
      // difference in days between dates
      const updatedPillDuration = Math.floor(
        (new Date(data.startDate).getTime() -
          new Date(pill.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      updatedPill = {
        ...pill,
        duration: updatedPillDuration,
        updated: new Date().toISOString(),
      };
      // create new pill preserve old attributes for previous pill
      pills.push(
        create({
          ...pill,
          ...data,
        })
      );
    }

    pills[pillIndex] = updatedPill;
    savePills(pills);
    return updatedPill;
  }
}

function remove(id: Pill["id"]) {
  const pills = getPills();
  const pillIndex = pills.findIndex((x) => x.id === id);

  if (pillIndex > -1) {
    pills.splice(pillIndex, 1);
    savePills(pills);
  }
}

function getByDate(dateStr: string) {
  const pills = getPills();
  const date = new Date(dateStr);
  return pills.filter((pill) => {
    const startDate = new Date(pill.startDate);
    const endDate = addDays(startDate, pill.duration);
    return date >= startDate && date < endDate;
  });
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
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
