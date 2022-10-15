import {
  e,
  tr,
  td,
  months,
  categories,
  getId,
  setUserData,
  getUserData,
} from "./util";

const records = getUserData();

let isEditModeOn = false;
let currentId = null;

const tbody = document.querySelector("tbody");
const form = document.getElementById("new-expense");
const dateInput = form.querySelector('[name="date"]');

form.addEventListener("submit", onSubmit);

tbody.addEventListener("click", onButtonsClick);

function onButtonsClick(event) {
  if (event.target.tagName == "BUTTON") {
    const row = event.target.parentElement.parentElement;

    if (event.target.classList.contains("edit-btn")) {
      const nameInput = form.querySelector('[name="name"]');
      const categoryElement = form.querySelector("select");
      const amountInput = form.querySelector('[name="amount"]');

      const record = records.get(row.id);

      isEditModeOn = true;
      currentId = record.id;

      dateInput.value = record.date;
      nameInput.value = record.name;
      categoryElement.value = record.category;
      amountInput.value = record.amount;
    } else if (event.target.classList.contains("delete-btn")) {
      row.remove();
      records.delete(row.id);
      setUserData(records);
    }
  }
}

initialDataLoading();

function initialDataLoading() {
  const data = [...records.values()].map((x) => createRow(x, x.id));

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

  const id = currentId ? currentId : getId();
  if (isEditModeOn) {
    // handle edit
    document.getElementById(id).remove();
    records.delete(id);
  }
  const row = createRow(data, id);

  const record = {
    id,
    ...data,
  };

  records.set(id, record);
  setUserData(records);

  form.reset();
  dateInput.value = data.date;

  tbody.appendChild(row);

  isEditModeOn = false;
  currentId = null;
}

function createRow({ date, name, category, amount }, id) {
  const dateValue = new Date(date);

  const row = tr(
    td(`${dateValue.getDate()}.${months[dateValue.getMonth()]}`),
    td(name),
    td(categories[category]),
    td(e("span", { className: "currency" }, amount)),
    td(
      e("button", { className: "edit-btn" }, "Edit"),
      e("button", { className: "delete-btn" }, "Delete")
    )
  );

  row.id = id;

  return row;
}
