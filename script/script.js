fetch('../api/data.json')
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById('menu-container');

    data.menu.forEach(item => {

      const card = `
        <div class="bg-gray-100 rounded-2xl p-6 shadow-md 
                    hover:shadow-xl hover:-translate-y-1 transition duration-300 
                    relative text-center mb-15">

          <!-- IMAGE -->
          <img src="${item.image}" 
            class="w-[150px] h-[150px] object-cover mx-auto rounded-xl mb-8">

          <!-- TITLE -->
          <h3 class="font-semibold text-lg leading-snug">
            ${item.judul}
          </h3>

          <!-- PRICE -->
          <p class="text-base text-gray-700 mt-1 mb-4">
            ${item.price}
          </p>

          <!-- CART BUTTON -->
          <button class="absolute bottom-4 right-4 bg-orange-500 
                         w-10 h-10 rounded-full flex items-center justify-center 
                         hover:scale-110 active:scale-95 transition">

            <i data-feather="shopping-cart" class="w-5 h-5 text-white"></i>

          </button>

        </div>
      `;

      container.innerHTML += card;

    });

    feather.replace();

  })
  .catch(err => console.log(err));

  const form = document.querySelector("form");

  const notif =
    document.getElementById("notif-success");

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data =
      new FormData(form);

    // KIRIM FORM
    await fetch(form.action, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json"
      }
    });

    // TAMPILKAN NOTIF
    notif.classList.remove("hidden");

    // RESET INPUT
    form.reset();

    // AUTO HILANG
    setTimeout(() => {

      notif.classList.add("hidden");

    }, 3000);

  });