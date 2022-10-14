const form = document.getElementById("new-expense");

form.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const data = Object.fromEntries(formData);

  console.log(data);
}
