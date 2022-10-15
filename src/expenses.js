import {
  e,
  tr,
  td,
  months,
  categories,
  mockdata,
  getId,
  setUserData,
  getUserData,
} from "./util";

const records = getUserData();

let isEditModeOn = false;
let currentId = null;

const tbody = document.querySelector("tbody");
const form = document.getElementById("new-expense");

form.addEventListener("submit", onSubmit);

initialDataLoading();

function initialDataLoading() {
  const data = [...records.values()].map((x) => createRow(x));

  tbody.replaceChildren(...data);
}

function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const data = Object.fromEntries(formData);

  for (const key in data) {
    if (data[key] == "") {
      // works one error at a time
      let errorMessage = `${key} is required field`;
      const errorElement = document.getElementById("error-message");
      const inputElement = document.querySelector(`[name=${key}]`);

      errorElement.textContent = errorMessage;
      inputElement.style.border = "2px solid red";

      setTimeout(() => {
        errorElement.textContent = "";
        inputElement.style.border = "";
      }, 5000);

      return;
    }
  }
  console.log(data);

  if (isEditModeOn) {
    // handle edit
  }

  const row = createRow(data);

  const id = currentId ? currentId : getId();

  const record = {
    id,
    ...data,
  };

  records.set(id, record);
  setUserData(records);

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
