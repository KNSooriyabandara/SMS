document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();

      // Save JWT tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      // store rolls
      if (data.is_staff) {
        localStorage.setItem("is_staff", data.is_staff);
      }
      if (data.is_superuser) {
        localStorage.setItem("is_superuser", data.is_superuser);
      }

      Swal.fire("Success", "Login successful!", "success").then(() => {
        window.location.href = "/user/dashboard";
      });
    } else {
      Swal.fire("Error", "Invalid credentials", "error");
    }
  } catch (err) {
    Swal.fire("Error", "Server not reachable", "error");
  }
});
