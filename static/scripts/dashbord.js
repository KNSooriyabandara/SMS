// Redirect to login if no token
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
const tableBody = document.getElementById("studentTable");

// fetch
async function loadStudents() {
  const token = localStorage.getItem("access_token");

  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/student/all", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      const students = await response.json();
      tableBody.innerHTML = ""; // clear old rows

      students.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="py-2 px-4">${student.username}</td>
          <td class="py-2 px-4">${student.email}</td>
          <td class="py-2 px-4">${student.registration_number}</td>
          <td class="py-2 px-4">${student.created_at ? student.created_at.split("T")[0] : ""}</td>
        `;
        tableBody.appendChild(row);
      });
      //total student count update
      document.getElementById("totalStudentsCard").innerText = students.length;

      // New registrations today
      const today = new Date().toISOString().split("T")[0];
      const newToday = students.filter(s => s.created_at && s.created_at.startsWith(today)).length;
      document.getElementById("newRegistrationsCard").innerText = newToday;

    } else {
      Swal.fire("Error", "Failed to load students", "error");
    }
  } catch (err) {
    Swal.fire("Error", "Server not reachable", "error");
  }
}

// Call loadStudents when page loads
document.addEventListener("DOMContentLoaded", loadStudents);

// Handle student registration form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!nameInput.value || !emailInput.value || !regnoInput.value) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "All fields are required!"
    });
    return;
  }

  const token = localStorage.getItem("access_token");

  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/student/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: nameInput.value,
        email: emailInput.value,
        registration_number: regnoInput.value,
        
      })
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Student Registered!",
        text: `${nameInput.value} has been added successfully.`
      });
      form.reset();
      loadStudents(); // refresh table from backend
    } else {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to register student." });
    }
  } catch (err) {
    Swal.fire({ icon: "error", title: "Error", text: "Server not reachable." });
  }
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
document.getElementById("logoutBtn").addEventListener("click", async function() {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out and redirected to login.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, logout"
  }).then(async (result) => {
    if (result.isConfirmed) {
      const refreshToken = localStorage.getItem("refresh_token");
      const accessToken = localStorage.getItem("access_token");

      try {
        const response = await fetch("http://127.0.0.1:8000/api/logout/", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ refresh: refreshToken })
        });

        if (response.ok) {
          // Clear tokens locally
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");

          Swal.fire({
            title: "Logged out!",
            text: "Redirecting to login...",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            window.location.href = "/user/login";
          });
        } else {
          Swal.fire("Error", "Logout failed on server", "error");
        }
      } catch (err) {
        Swal.fire("Error", "Server not reachable", "error");
      }
    }
  });
});