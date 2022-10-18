import { e, tr, td, months, getData, setData } from "./util";

// should sort them
const budget = getData("budget");

const tbody = document.querySelector("tbody");
const form = document.getElementById("new-budget");

form.addEventListener("submit", onSubmit);

tbody.addEventListener("click", onButtonsClick);

let isEditModeOn = false;
let currentId = null;

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
      const monthInput = form.querySelector('[name="month"]');
      const incomeInput = form.querySelector('[name="income"]');
      const budgetInput = form.querySelector('[name="budget"]');

      const record = budget.get(row.id);

      isEditModeOn = true;
      currentId = record.id;

      monthInput.value = record.month;
      incomeInput.value = record.income;
      budgetInput.value = record.budget;
    } else if (event.target.classList.contains("delete-btn")) {
      row.remove();
      budget.delete(row.id);
      setData("budget", budget);
    }
  }
}

initialDataLoading();

function initialDataLoading() {
  const data = [...budget.values()].map((x) => createRow(x, x.id));

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
      const errorElement = e(
        "span",
        { className: "error-message" },
        errorMessage
      );

      const inputElement = document.querySelector(`[name=${key}]`);

      inputElement.parentElement.appendChild(errorElement);

      errorElement.textContent = errorMessage;
      inputElement.style.border = "2px solid red";

      setTimeout(() => {
        errorElement.textContent = "";
        inputElement.style.border = "";
      }, 5000);

      return;
    }
  }

  let id = currentId ? currentId : data.month;

  if (isEditModeOn) {
    document.getElementById(id).remove();
    budget.delete(id);
  }

  const row = createRow(data, id);

  const record = {
    id,
    ...data,
  };
  budget.set(id, record);
  setData("budget", budget);

  form.reset();
  tbody.appendChild(row);

  isEditModeOn = false;
  currentId = null;
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
    td(
      e("button", { className: "edit-btn" }, "Edit"),
      e("button", { className: "delete-btn" }, "Delete")
    )
  );

  row.id = id;

  return row;
}
