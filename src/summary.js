import { e, getData, months, tr, categories, td } from "./util";

const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");

const records = getData("records");

let currentPage = 1;

displayData();

function getCategoryData() {
  const data = records.values();
  const result = {};

  for (const item of data) {
    const date = new Date(item.date);

    let currentMonth = date.getMonth();

    if (currentMonth < 3) {
      if (!result.hasOwnProperty(currentMonth)) {
        result[currentMonth] = [];
      }

      result[currentMonth].push(item);
    }
  }

  return result;
}

function displayData() {
  const data = getCategoryData();

  const headerRow = getHeaderElements(data);

  const breakdownEl = getBreakdownElements(data);

  thead.replaceChildren(headerRow);
}

function getHeaderElements(data) {
  const row = tr(e("th", {}, "Category"));

  for (const key in data) {
    const el = e("th", {}, months[key]);

    row.appendChild(el);
  }

  const total = e("th", {}, "Total");

  row.appendChild(total);

  return row;
}

function getBreakdownElements(data) {
  const result = {
    1: {},
    3: {},
    2: {},
    4: {},
    0: {},
  };

  let arr = [];

  for (const key in data) {
    const d = data[key].map((x) => {
      const date = new Date(x.date);

      return {
        month: date.getMonth(),
        amount: x.amount,
        category: x.category,
      };
    });

    arr = arr.concat(d);
  }

  for (const item of arr) {
    if (!result.hasOwnProperty(item.category)) {
      result[item.category] = {};
    }

    if (!result[item.category].hasOwnProperty(item.month)) {
      result[item.category][item.month] = 0;
    }

    result[item.category][item.month] += Number(item.amount);
  }

  for (const category in result) {
    let row = tr(e("th", {}, categories[category]));

    if (Object.keys(result[category]) == 0) {
      for (let i = 0; i < 4; i++) {
        const el = td(e("span", { className: "currency" }, 0));
        row.appendChild(el);
      }
    } else {
      for (const key in result[category]) {
        const el = td(
          e("span", { className: "currency" }, result[category][key] || 0)
        );

        row.appendChild(el);
      }
    }

    tbody.appendChild(row);
  }
}
