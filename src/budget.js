import { e, tr, td, months, getUserData, setUserData } from "./util";

const budget = getUserData("budget");

const tbody = document.querySelector("tbody");
const form = document.getElementById("new-budget");

form.addEventListener("submit", onSubmit);

initialDataLoading();

function initialDataLoading() {
  const data = [...budget.values()].map((x) => createRow(x, x.id));

  tbody.replaceChildren(...data);
}

let isEditModeOn = false;

function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const data = Object.fromEntries(formData);

  // handle if data == "";
  let id = data.month;

  const row = createRow(data, id);

  const record = {
    id,
    ...data,
  };
  budget.set(id, record);
  setUserData("budget", budget);

  form.reset();
  tbody.appendChild(row);
}

function createRow({ month, income, budget }, id) {
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

  row.id = id;

  return row;
}
