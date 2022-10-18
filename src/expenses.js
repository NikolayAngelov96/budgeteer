import {
  e,
  tr,
  td,
  months,
  categories,
  getId,
  setData,
  getData,
  toast,
} from "./util";

// should sort them
const records = getData("records");

let isEditModeOn = false;
let currentId = null;

const tbody = document.querySelector("tbody");
const form = document.getElementById("new-expense");
const dateInput = form.querySelector('[name="date"]');

form.addEventListener("submit", onSubmit);

tbody.addEventListener("click", onButtonsClick);

document
  .querySelector('.centered [type="button"]')
  .addEventListener("click", () => {
    form.reset();
    isEditModeOn = false;
    currentId = null;
  });

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
      if (confirm("Are you sure ?")) {
        row.remove();
        records.delete(row.id);
        setData("records", records);
        toast("success", "Successfully deleted.");
      }
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
      // const errorElement = document.getElementById("error-message");
      const errorElement = e(
        "span",
        { className: "error-message" },
        errorMessage
      );

      const inputElement = document.querySelector(`[name=${key}]`);

      inputElement.parentElement.appendChild(errorElement);

      inputElement.style.border = "2px solid red";

      setTimeout(() => {
        errorElement.remove();
        inputElement.style.border = "";
      }, 5000);

      return;
    }
  }

  const id = currentId ? currentId : getId();
  if (isEditModeOn) {
    document.getElementById(id).remove();
    records.delete(id);
  }
  const row = createRow(data, id);

  const record = {
    id,
    ...data,
  };

  records.set(id, record);
  setData("records", records);

  form.reset();
  dateInput.value = data.date;

  tbody.appendChild(row);

  toast("success", `Successfully added ${record.name} to expenses.`);

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
