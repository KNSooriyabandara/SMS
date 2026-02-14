document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const payload = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  };

  try {
    // Call Django JWT login endpoint
    const response = await fetch("/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.status === 200) {
      // Save tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      Swal.fire("Success", "Login successful!", "success").then(() => {
        window.location.href = "dashboard.html";
      });
    } else {
      Swal.fire("Error", data.detail || "Invalid credentials", "error");
    }
  } catch (err) {
    Swal.fire("Error", "Something went wrong", "error");
    console.error(err);
  }
});