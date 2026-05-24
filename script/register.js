const API_URL = "../api/login.json";

const registerForm = document.getElementById("registerForm");

function showToast(message, success = true) {
  const toast = document.createElement("div");

  toast.className = `
    fixed top-5 right-5 px-4 py-3 rounded-lg text-white shadow-lg z-50
    transition-all duration-300
    ${success ? "bg-green-500" : "bg-red-500"}
  `;

  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !email || !password) {
    showToast("Semua data wajib diisi", false);
    return;
  }

  try {
    // ambil semua user
    const res = await fetch(API_URL);
    const users = await res.json();

    // cek email
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      showToast("Email sudah digunakan", false);
      return;
    }

    // Simpan user baru (karena fetch POST ke JSON lokal biasanya tidak bisa ditulis dari browser)
    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    registeredUsers.push({ username, email, password });
    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(registeredUsers)
    );

    showToast("Register berhasil");

    setTimeout(() => {
      // bisa langsung masuk ke home
      window.location.href = "home.html";
    }, 1500);
  } catch (error) {
    console.error("Register Error:", error);
    showToast("Terjadi error saat register", false);
  }

});

// ======================
// SHOW PASSWORD (REGISTER)
// ======================
const togglePassword = document.getElementById("toggle-password");

if (togglePassword) {
  togglePassword.addEventListener("click", () => {
    const passwordInput = document.getElementById("password");
    if (!passwordInput) return;

    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
  });
}


