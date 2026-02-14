document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Hardcoded super user credentials
  const SUPER_USER = { username: "admin", password: "1234" };

  if (username === SUPER_USER.username && password === SUPER_USER.password) {
    // Simulate tokens for testing
    localStorage.setItem("access_token", "dummy_access_token");
    localStorage.setItem("refresh_token", "dummy_refresh_token");

    Swal.fire("Success", "Login successful!", "success").then(() => {
      window.location.href = "dashbord.html";
    });
  } else {
    Swal.fire("Error", "Invalid credentials", "error");
  }
});
