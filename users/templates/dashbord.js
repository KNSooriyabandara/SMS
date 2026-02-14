if (!localStorage.getItem("access_token")) {
  window.location.href = "login.html";
}
// Flatpickr init
flatpickr("#birthday", { dateFormat: "Y-m-d" });
flatpickr("#dateFilter", { dateFormat: "Y-m-d" });

// Sidebar toggle
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
  overlay.classList.toggle("hidden");
});

overlay.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

// Student registration form
const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const regnoInput = document.getElementById("regNo");
const birthdayInput = document.getElementById("birthday");
const tableBody = document.getElementById("studentTable");

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

  // Create new row
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td class="py-2 px-4">${nameInput.value}</td>
    <td class="py-2 px-4">${emailInput.value}</td>
    <td class="py-2 px-4">${regnoInput.value}</td>
    <td class="py-2 px-4">${birthdayInput.value}</td>
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

// Swiper init
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: { el: ".swiper-pagination", clickable: true },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

// Logout button
document.getElementById("logoutBtn").addEventListener("click", function() {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out and redirected to login.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, logout"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      Swal.fire({
        title: "Logged out!",
        text: "Redirecting to login...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        window.location.href = "login.html";
      });
    }
  });
});