// script.js
function submitForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  for (const [name, value] of formData) {
    console.log(name, value);
  }
  document.getElementById("myForm").reset();
}

document.getElementById("myForm").addEventListener("submit", submitForm);
