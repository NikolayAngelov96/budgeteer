import { e, tr, td, months, categories } from "./util";

const tbody = document.querySelector("tbody");
const form = document.getElementById("new-expense");

form.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const data = Object.fromEntries(formData);

  for (const key in data) {
    if (data[key] == "") {
      // add error message
      return;
    }
  }
  console.log(data);

  const row = createRow(data);
  tbody.appendChild(row);
}

function createRow({ date, name, category, amount }) {
  const dateValue = new Date(date);

  const row = tr(
    td(`${dateValue.getDate()}.${months[dateValue.getMonth()]}`),
    td(name),
    td(categories[category]),
    td(e("span", { className: "currency" }, amount)),
    td(e("button", {}, "Edit"), e("button", {}, "Delete"))
  );

  return row;
}
