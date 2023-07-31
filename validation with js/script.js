// Declare semesterInput variable outside the functions
let semesterInput;

function updateDateTime() {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  let startDate, endDate;

  const currentYear = new Date().getFullYear();
  switch (semesterInput) {
    case "1":
      startDate = new Date(currentYear, 7, 1); // August 1
      endDate = new Date(currentYear, 11, 31); // December 31
      break;
    case "2":
      startDate = new Date(currentYear, 0, 1); // January 1
      endDate = new Date(currentYear, 4, 31); // May 31
      break;
    case "Summer":
      startDate = new Date(currentYear, 5, 1); // June 1
      endDate = new Date(currentYear, 6, 31); // July 31
      break;
    default:
      // Default case
      startDate = "";
      endDate = "";
      break;
  }

  // Function to format the date as DD/MM/YYYY (Y as Buddhist era)
  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear(); // Use Gregorian year
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${(year - 543).toString()}`;
  }

  startDateInput.value = formatDate(startDate);
  endDateInput.value = formatDate(endDate);

  startDateInput.setAttribute("min", formatDate(startDate));
  startDateInput.setAttribute("max", formatDate(endDate));
  endDateInput.setAttribute("min", formatDate(startDate));
  endDateInput.setAttribute("max", formatDate(endDate));
}

function validateForm() {
  // Validate Firstname and Lastname
  const fullnameInput = document.getElementById("fullname").value;
  const names = fullnameInput.trim().split(" ");
  if (event && event.type === "submit") {
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
  }

  return true;
}

function submitForm(event) {
  event.preventDefault();
  // Update semesterInput based on user selection
  semesterInput = document.getElementById("semester").value;

  // Perform Start/End Date validation here based on Semester
  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (semesterInput) {
    const currentYear = new Date().getFullYear();

    if (semesterInput === "1") {
      const academicStartDate = new Date(currentYear, 7, 1); // August 1
      const academicEndDate = new Date(currentYear, 11, 31); // December 31
      if (startDate < academicStartDate || endDate > academicEndDate) {
        alert("Invalid Start/End Date for selected Semester 1.");
        return;
      }
    } else if (semesterInput === "2") {
      const academicStartDate = new Date(currentYear, 0, 1); // January 1
      const academicEndDate = new Date(currentYear, 4, 31); // May 31
      if (startDate < academicStartDate || endDate > academicEndDate) {
        alert("Invalid Start/End Date for selected Semester 2.");
        return;
      }
    } else if (semesterInput === "Summer") {
      const academicStartDate = new Date(currentYear, 5, 1); // June 1
      const academicEndDate = new Date(currentYear, 6, 31); // July 31
      if (startDate < academicStartDate || endDate > academicEndDate) {
        alert("Invalid Start/End Date for selected Summer Semester.");
        return;
      }
    }
  }

  if (validateForm()) {
    updateDateTime(); // Update Start Date/Time and End Date/Time based on Semester
    const formData = new FormData(event.target);
    for (const [name, value] of formData) {
      console.log(name, value);
    }
    document.getElementById("myForm").reset();
  }
}

document.getElementById("myForm").addEventListener("submit", submitForm);
document.getElementById("semester").addEventListener("change", validateForm);
