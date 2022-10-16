import { getData } from "./util";

const breakdown = getBreakdownData();

function getBreakdownData() {
  const records = getData("records");
  const result = {};

  for (const item of records.values()) {
    let category = item.category;

    if (!result.hasOwnProperty(category)) {
      result[category] = 0;
    }

    result[category] += Number(item.amount);
  }

  return result;
}
