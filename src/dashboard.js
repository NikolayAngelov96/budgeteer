import { getData, e, categories } from "./util";

const breakdown = getBreakdownData();
const breakdownContainer = document.querySelector(".container");

displayBreakdownData();

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

function displayBreakdownData() {
  for (const key in breakdown) {
    const bar = e("span", { className: "bar" });
    bar.style.width = `${breakdown[key]}px`;
    const element = e(
      "div",
      { className: "cat-row" },
      e("span", { className: "row label" }, categories[key]),
      e("span", { className: "row value" }, breakdown[key]),
      e("div", { className: "bar-area" }, bar)
    );

    breakdownContainer.appendChild(element);
  }
}
