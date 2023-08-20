import { Pill } from "@/types";

const fs = require("fs");

export const pillsRepo = {
  getAll: () => getPills(),
  getById,
  getByDate,
  create,
  update,
  remove,
};

function create(data: Omit<Pill, "id" | "created" | "updated">) {
  const pills = getPills();
  const maxId = pills.length ? Math.max(...pills.map((x) => x.id)) : 0;
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
  const pillIndex = pills.findIndex((x) => x.id === id);
  const pill = pills[pillIndex];

  if (pill) {
    let updatedPill: Pill = {
      ...pill,
      ...data,
      updated: new Date().toISOString(),
    };
    if (pill.quantity === data.quantity) {
      updatedPill = {
        ...pill,
        ...data,
        startDate: pill.startDate, // do not update start date
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
      // only if there is any duration
      if (data.duration) {
        pills.push(
          create({
            ...pill,
            ...data,
          })
        );
      }
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

function getById(id: Pill["id"]) {
  const pills = getPills();
  const pill = pills.find((pill) => pill.id === id);
  if (!pill) return {};
  const similarPills = pills.filter(
    (currPill) => getMatchPercentage(pill.name, currPill.name) > 0.5
  );
  return {
    pill,
    similarPills,
  };
}

function savePills(pills: Pill[]) {
  fs.writeFileSync("./data/pills.json", JSON.stringify(pills, null, 4));
}
function getPills(): Pill[] {
  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
  }
  if (!fs.existsSync("./data/pills.json")) {
    fs.writeFileSync("./data/pills.json", "[]");
  }
  return JSON.parse(fs.readFileSync("./data/pills.json", "utf8"));
}

// compare 2 names and get match in percentage
function getMatchPercentage(name1: string, name2: string) {
  const name1Arr = name1.split("");
  const name2Arr = name2.split("");
  let matchedCharsNumbers = 0;
  for (const name1Char of name1Arr) {
    for (const name2Char of name2Arr) {
      if (name1Char === name2Char) {
        matchedCharsNumbers += 1;
        break;
      }
    }
  }
  return matchedCharsNumbers / name1Arr.length;
}
