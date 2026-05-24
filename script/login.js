let users = [];

// ======================
// FETCH USER
// ======================

async function getUsers() {

  try {

    const response =
      await fetch("../api/login.json");

    users =
      await response.json();

  }

  catch (error) {

    console.log(
      "Gagal mengambil data",
      error
    );

  }

}

getUsers();

// ======================
// ELEMENT
// ======================

const form =
  document.getElementById("loginForm");

const emailInput =
  document.getElementById("email");

const passwordInput =
  document.getElementById("password");

// ======================
// TOAST
// ======================

function showToast(message, type) {

  const toast =
    document.getElementById("toast");

  const content =
    document.getElementById("toast-content");

  content.innerText = message;

  // RESET
  content.classList.remove(
    "bg-red-500",
    "bg-green-500"
  );

  // TYPE
  if (type === "success") {

    content.classList.add(
      "bg-green-500"
    );

  }

  else {

    content.classList.add(
      "bg-red-500"
    );

  }

  // SHOW
  toast.classList.remove(
    "translate-x-[150%]"
  );

  // HIDE
  setTimeout(() => {

    toast.classList.add(
      "translate-x-[150%]"
    );

  }, 2000);

}

// ======================
// LOGIN
// ======================

form.addEventListener("submit", function (e) {

  e.preventDefault();

  const email =
    emailInput.value.trim();

  const password =
    passwordInput.value.trim();

  // VALIDASI
  if (email === "" && password === "") {

    showToast(
      "Email dan Password wajib diisi!",
      "error"
    );

    return;

  }

  if (email === "") {

    showToast(
      "Email wajib diisi!",
      "error"
    );

    return;

  }

  if (password === "") {

    showToast(
      "Password wajib diisi!",
      "error"
    );

    return;

  }

  // CEK USER
  const user =
    users.find((item) => {

      return (

        item.email.toLowerCase() ===
        email.toLowerCase() &&

        item.password === password

      );

    });

  // BERHASIL
  if (user) {

    showToast(
      "Login berhasil!",
      "success"
    );

    // gabungkan user dari register (localStorage) dengan data login.json
    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );
    const mergedUsers = users.concat(registeredUsers);

    const matchedUser = mergedUsers.find((item) => {
      return (
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
      );
    });

    if (matchedUser) {
      localStorage.setItem(
        "loginUser",
        JSON.stringify(matchedUser)
      );
    } else {
      // fallback: tetap pakai `user` yang sebelumnya terambil dari login.json saja
      localStorage.setItem(
        "loginUser",
        JSON.stringify(user)
      );
    }


    emailInput.value = "";

    passwordInput.value = "";

    setTimeout(() => {

      window.location.href =
        "home.html";

    }, 1500);

  }

  // GAGAL
  else {

    showToast(
      "Email atau Password salah!",
      "error"
    );

  }

});

// ======================
// SHOW PASSWORD
// ======================

const togglePassword =
  document.getElementById(
    "toggle-password"
  );

togglePassword.addEventListener(
  "click",

  () => {

    const password =
      document.getElementById(
        "password"
      );

    if (
      password.type === "password"
    ) {

      password.type = "text";

    }

    else {

      password.type = "password";

    }

  }

);

const rememberMe = document.getElementById("rememberMe");
const email = document.getElementById("email");

window.addEventListener("DOMContentLoaded", () => {
  const savedEmail = localStorage.getItem("rememberedEmail");

  if (savedEmail) {
    email.value = savedEmail;
    rememberMe.checked = true;
  }
});

async function login() {
  if (rememberMe.checked) {
    localStorage.setItem("rememberedEmail", email.value);
  } else {
    localStorage.removeItem("rememberedEmail");
  }

  // fetch API login kamu
}