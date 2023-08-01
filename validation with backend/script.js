function validateForm() {
  // Validate Firstname and Lastname
  const fullnameInput = document.getElementById("fullname").value;
  const names = fullnameInput.trim().split(" ");
  if (names.length !== 2) {
    alert("Please enter both your Firstname and Lastname.");
    return false;
  }

  // Validate Student ID
  const studentIDInput = document.getElementById("studentID").value;
  const studentIDPattern = /^\d{10}$/;
  if (!studentIDPattern.test(studentIDInput)) {
    alert("Please enter a 10-digit Student ID.");
    return false;
  }

  // Validate University Email
  const emailInput = document.getElementById("email").value;
  const emailPattern = /^.+@dome\.tu\.ac\.th$/;
  if (!emailPattern.test(emailInput)) {
    alert("Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.");
    return false;
  }

  return true;
}

function submitForm(event) {
  event.preventDefault();
  if (validateForm()) {
    const startDateInput = document.getElementById("startDate").value;
    const endDateInput = document.getElementById("endDate").value;
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);

    if (endDate <= startDate) {
      alert("End datetime should be after the start datetime.");
      return;
    }
    
    const formData = new FormData(event.target);
    for (const [name, value] of formData) {
      console.log(name, value);
    }
    document.getElementById("myForm").reset();
  }
}

document.getElementById("myForm").addEventListener("submit", submitForm);
