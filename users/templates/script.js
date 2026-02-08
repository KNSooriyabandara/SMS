document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const regnoInput = document.getElementById("regno");
  const regdateInput = document.getElementById("regdate");
  const tableBody = document.querySelector("tbody");

  // Initialize date picker (optional)
  if (regdateInput) {
    flatpickr(regdateInput, {
      dateFormat: "Y-m-d",
      defaultDate: new Date()
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validation
    if (!nameInput.value || !emailInput.value || !regnoInput.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!"
      });
      return;
    }
    const today = new Date().toISOString().split("T")[0];

    // Add new row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${nameInput.value}</td>
      <td>${emailInput.value}</td>
      <td>${regnoInput.value}</td>
      <td>${today}</td>

    `;
    tableBody.appendChild(newRow);

    // Success alert
    Swal.fire({
      icon: "success",
      title: "Student Registered!",
      text: `${nameInput.value} has been added successfully.`
    });

    // Reset form
    form.reset();
  });
});