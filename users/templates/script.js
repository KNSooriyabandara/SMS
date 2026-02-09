document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const regnoInput = document.getElementById("regno");
  const tableBody = document.querySelector("tbody");

  


  form.addEventListener("submit", (e) => {
    e.preventDefault();

   
    if (!nameInput.value || !emailInput.value || !regnoInput.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!"
      });
      return;
    }
    const today = new Date().toISOString().split("T")[0];

    
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${nameInput.value}</td>
      <td>${emailInput.value}</td>
      <td>${regnoInput.value}</td>
      <td>${today}</td>

    `;
    tableBody.appendChild(newRow);

    
    Swal.fire({
      icon: "success",
      title: "Student Registered!",
      text: `${nameInput.value} has been added successfully.`
    });

    
    form.reset();
  });
});