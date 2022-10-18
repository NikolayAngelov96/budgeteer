import { e, getData, months, tr, categories, td } from "./util";

const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const tfoot = document.querySelector("tfoot");

const records = getData("records");

let currentPage = 1;
let pageSize = 3;

displayData(currentPage);

document.getElementById("next-btn").addEventListener("click", () => {
  thead.replaceChildren();
  tbody.replaceChildren();
  tfoot.replaceChildren();
  displayData(++currentPage);
});

document.getElementById("prev-btn").addEventListener("click", () => {
  thead.replaceChildren();
  tbody.replaceChildren();
  tfoot.replaceChildren();
  displayData(--currentPage);
});

function getCategoryData(page) {
  const data = [...records.values()];
  const result = {};

  let offset = pageSize * (page - 1);

  for (let i = 0; i < 3; i++) {
    result[i + offset] = [];
  }

  for (const item of data) {
    const date = new Date(item.date);

    let currentMonth = date.getMonth();

    if (result.hasOwnProperty(currentMonth)) {
      result[currentMonth].push(item);
    }
  }

  return result;
}

function displayData(page) {
  const data = getCategoryData(page);

  getHeaderElements(data);

  displayTableDataElements();
}

function getHeaderElements(data) {
  const row = tr(e("th", {}, "Category"));

  for (const key in data) {
    const el = e("th", {}, months[key]);

    row.appendChild(el);
  }

  const total = e("th", {}, "Total");

  row.appendChild(total);

  thead.replaceChildren(row);
}

function displayTableDataElements() {
  const data = getData("records");
  const result = {};
  // 1-2-3 : page 1
  // 4-5-6 : page 2
  // 7-8-9 : page 3

  // page * pageSize - pageSize
  // pageSize * (page - 1) - pagination formula;

  let offset = pageSize * (currentPage - 1);

  for (const category in categories) {
    result[category] = {};

    for (let i = 0; i < 3; i++) {
      result[category][i + offset] = 0;
    }
  }

  let values = [...data.values()].map((x) => ({
    month: new Date(x.date).getMonth(),
    amount: x.amount,
    category: x.category,
  }));

  for (const item of values) {
    if (item.month >= offset && item.month < offset + pageSize) {
      result[item.category][item.month] += Number(item.amount);
    }
  }

  let monthsTotalSum = {};
  for (const category in result) {
    let row = tr(e("th", {}, categories[category]));

    let categoryTotalSum = 0;

    for (const month in result[category]) {
      const el = td(
        e("span", { className: "currency" }, result[category][month])
      );

      categoryTotalSum += result[category][month];

      if (!monthsTotalSum.hasOwnProperty(month)) {
        monthsTotalSum[month] = 0;
      }
      monthsTotalSum[month] += result[category][month];
      row.appendChild(el);
    }
    const totalElement = e(
      "th",
      {},
      e("span", { className: "currency" }, categoryTotalSum)
    );

    row.appendChild(totalElement);

    tbody.appendChild(row);
  }

  displayTotalSum(monthsTotalSum);
  displayBudgetOverruns(monthsTotalSum);
  displaySavings();
}

function displayTotalSum(monthsTotalSum) {
  const row = e("tr", { className: "total" }, e("th", {}, "Total Spent"));

  for (const month in monthsTotalSum) {
    const el = td(e("span", { className: "currency" }, monthsTotalSum[month]));

    row.appendChild(el);
  }

  const total = Object.values(monthsTotalSum).reduce((acc, c) => acc + c, 0);

  const totalElement = e("th", {}, e("span", { className: "currency" }, total));

  row.appendChild(totalElement);

  tfoot.appendChild(row);
}

function displayBudgetOverruns(monthsTotalSum) {
  const budget = getData("budget");

  let monthsOverruns = {};

  let offset = pageSize * (currentPage - 1);

  for (let i = 0; i < 3; i++) {
    monthsOverruns[i + offset] = 0;
  }

  for (const item of [...budget.values()]) {
    let month = Number(item.month.slice(0, 2) - 1);

    if (monthsOverruns.hasOwnProperty(month)) {
      monthsOverruns[month] = monthsTotalSum[month] - item.budget;
      if (monthsOverruns[month] < 0) {
        monthsOverruns[month] = 0;
      }
    }
  }

  const row = e("tr", { className: "overrun" }, e("th", {}, "Budget Overruns"));

  for (const month in monthsOverruns) {
    const el = td(e("span", { className: "currency" }, monthsOverruns[month]));
    row.appendChild(el);
  }

  const total = Object.values(monthsOverruns).reduce((acc, c) => acc + c, 0);

  const totalElement = e("th", {}, e("span", { className: "currency" }, total));

  row.appendChild(totalElement);

  tfoot.appendChild(row);
}

function displaySavings() {
  const budget = getData("budget");

  const savingsPerMonth = {};

  let offset = pageSize * (currentPage - 1);

  for (let i = 0; i < 3; i++) {
    savingsPerMonth[i + offset] = 0;
  }

  for (const item of [...budget.values()]) {
    let month = Number(item.month.slice(0, 2) - 1);

    if (savingsPerMonth.hasOwnProperty(month)) {
      savingsPerMonth[month] = item.income - item.budget;
    }
  }

  const row = e("tr", { className: "savings" }, e("th", {}, "Savings"));

  for (const month in savingsPerMonth) {
    const el = td(e("span", { className: "currency" }, savingsPerMonth[month]));
    row.appendChild(el);
  }

  const total = Object.values(savingsPerMonth).reduce((acc, c) => acc + c, 0);

  const totalElement = e("th", {}, e("span", { className: "currency" }, total));

  row.appendChild(totalElement);

  tfoot.appendChild(row);
}
