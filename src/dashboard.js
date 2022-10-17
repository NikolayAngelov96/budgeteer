import { getData, e, categories } from "./util";

const breakdown = getBreakdownData();
const breakdownContainer = document.querySelector(".container");

const overviewNumbers = document.querySelector(".left-col");

// display overview bars properly

// find max; every value / max * 400;  horizontal bars

// for vertical bars: every value / sum of all values * 500?px

displayBreakdownData();
displayOverviewData();

function getOverviewData() {
  const spent = Object.values(breakdown).reduce((acc, c) => acc + c, 0);

  const budget = getData("budget");

  let budgetValue = 0;
  let totalIncome = 0;

  for (const item of [...budget.values()]) {
    budgetValue += Number(item.budget);
    totalIncome += Number(item.income);
  }

  let remaining = budgetValue - spent;

  let savings = totalIncome - budgetValue;

  return {
    Spent: spent,
    Remaining: remaining,
    Savings: savings,
  };
}

function displayOverviewData() {
  const overviewData = getOverviewData();

  for (const key in overviewData) {
    const element = e(
      "div",
      { className: "cat-row" },
      e("span", { className: "row label" }, key),
      e("span", { className: "row value" }, overviewData[key])
    );

    overviewNumbers.appendChild(element);
  }
}

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
