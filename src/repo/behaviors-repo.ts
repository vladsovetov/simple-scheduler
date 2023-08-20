import { Behavior } from "@/types";
import { formatDate } from "@/utils/utils";

const fs = require("fs");

export const behaviorsRepo = {
  getAll: () => getBehaviors(),
  getById,
  getByDate,
  create,
  update,
  remove,
};

function create(data: Omit<Behavior, "id" | "created" | "updated">) {
  const behaviors = getBehaviors();
  const maxId = behaviors.length ? Math.max(...behaviors.map((x) => x.id)) : 0;
  const newBehavior = {
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    ...data,
    id: maxId + 1,
  };

  behaviors.push(newBehavior);
  saveBehaviors(behaviors);
  return newBehavior;
}

function update(id: Behavior["id"], data: Partial<Omit<Behavior, "id">>) {
  const behaviors = getBehaviors();
  const itemIndex = behaviors.findIndex((x) => x.id === id);
  const item = behaviors[itemIndex];

  if (item) {
    const updatedBehavior: Behavior = {
      ...item,
      ...data,
      updated: new Date().toISOString(),
    };

    behaviors[itemIndex] = updatedBehavior;
    saveBehaviors(behaviors);
    return updatedBehavior;
  }
}

function remove(id: Behavior["id"]) {
  const behaviors = getBehaviors();
  const itemIndex = behaviors.findIndex((x) => x.id === id);

  if (itemIndex > -1) {
    behaviors.splice(itemIndex, 1);
    saveBehaviors(behaviors);
  }
}

function getByDate(dateStr: string) {
  const behaviors = getBehaviors();
  const date = new Date(dateStr);
  return behaviors.filter((item) => {
    const createdDate = new Date(item.created);
    return formatDate(date) === formatDate(createdDate);
  });
}

function getById(id: Behavior["id"]) {
  const behaviors = getBehaviors();
  const item = behaviors.find((item) => item.id === id);
  return item ? item : {};
}

function saveBehaviors(behaviors: Behavior[]) {
  fs.writeFileSync("./data/behaviors.json", JSON.stringify(behaviors, null, 4));
}
function getBehaviors(): Behavior[] {
  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
  }
  if (!fs.existsSync("./data/behaviors.json")) {
    fs.writeFileSync("./data/behaviors.json", "[]");
  }
  return JSON.parse(fs.readFileSync("./data/behaviors.json", "utf8"));
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
