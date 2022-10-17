export function e(type, attributes, ...content) {
  const element = document.createElement(type);

  for (const key in attributes) {
    if (key.startsWith("on")) {
      element.addEventListener(key.slice(2), attributes[key]);
    } else {
      element[key] = attributes[key];
    }
  }

  for (const item of content) {
    element.append(item);
  }

  return element;
}

export function getId() {
  return Math.random().toString(16).substring(2, 9);
}
export const tr = e.bind(null, "tr", {});
export const td = e.bind(null, "td", {});

export function getData(key) {
  const records = JSON.parse(localStorage.getItem(key));
  const result = new Map();

  for (const item of records) {
    result.set(item.id, item);
  }

  return result;
}

export function setData(key, records) {
  localStorage.setItem(key, JSON.stringify([...records.values()]));
}

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const categories = {
  0: "Other",
  1: "Utilities",
  2: "Groceries",
  3: "Entertainment",
  4: "Transport",
};

export const mockdata = {
  d5689c3: {
    id: "d5689c3",
    date: "2022-06-04",
    name: "Electricity",
    category: "1",
    amount: 100,
  },
  "2d7aa7a": {
    id: "2d7aa7a",
    date: "2022-06-04",
    name: "Water",
    category: "1",
    amount: 60,
  },
  "6e1004d": {
    id: "6e1004d",
    date: "2022-06-03",
    name: "Car fuel",
    category: "4",
    amount: 35,
  },
  "8fdfcc1": {
    id: "8fdfcc1",
    date: "2022-06-01",
    name: "Weekly Shopping",
    category: "2",
    amount: 75,
  },
};

export function getBarSize(number, max, multiplier) {
  return (number / max) * multiplier;
}
