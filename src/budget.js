import { e, tr, td, months } from "./util";

const budget = new Map();

const tbody = document.querySelector("tbody");
const form = document.getElementById("new-budget");

form.addEventListener("submit", onSubmit);

let isEditModeOn = false;

function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const data = Object.fromEntries(formData);

  // handle if data == "";
  const row = createRow(data);

  let id = data.month;

  const record = {
    id,
    ...data,
  };
  budget.set(id, record);

  console.log(budget);

  form.reset();
  tbody.appendChild(row);
}

function createRow({ month, income, budget }) {
  let [monthAsStr, yearAsStr] = month.split("-");

  monthAsStr = monthAsStr.startsWith("0")
    ? Number(monthAsStr.slice(1, 2) - 1)
    : monthAsStr;

  const row = tr(
    td(`${months[monthAsStr]}.${yearAsStr}`),
    td(e("span", { className: "currency" }, income)),
    td(e("span", { className: "currency" }, budget)),
    td(e("button", {}, "Edit"), e("button", {}, "Delete"))
  );

  return row;
}
