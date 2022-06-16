const menu = document.querySelector(".menu"),
  iconMenu = document.querySelector(".icon"),
  btnToTop = document.querySelector(".btn-to-top");

document.addEventListener("click", (e) => {
  if (e.target === iconMenu) {
    menu.classList.toggle("menu-is-active");
  }

  if (e.target.matches(".arrow-to-top")) {
    window.scrollTo(0, 0);
  }
});

window.addEventListener("resize", () => {
  menu.classList.remove("menu-is-active");
});

window.addEventListener("scroll", () => {
  if (window.scrollY) {
    menu.classList.remove("menu-is-active");
  }

  /*  if (window.scrollY > 300) {
    console.log(window.scrollY);
    btnToTop.classList.add("btn-to-top-active");
  } else {
    btnToTop.classList.remove("btn-to-top-active");
  } */
});

//swiper

const swiper = new Swiper(".swiper", {
  //breakpoint

  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    991: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
  autoplay: {
    delay: 1500,
  },

  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

/*validate form */
const validateForm = () => {
  const inputs = document.querySelectorAll(".form [required]"),
    form = document.querySelector(".form");
  inputs.forEach((input) => {
    let span = document.createElement("span");
    span.id = input.name;
    span.textContent = input.title;
    span.classList.add("form-error", "none");
    input.after(span);
    console.log(span);
  });

  document.addEventListener("keyup", (e) => {
    if (e.target.matches(".form [required]")) {
      let input = e.target,
        pattern = input.pattern || input.dataset.pattern;
      console.log("aprete");

      if (pattern && input.value !== "") {
        let regexp = new RegExp(pattern);
        return !regexp.test(input.value)
          ? document.getElementById(input.name).classList.add("is-active")
          : document.getElementById(input.name).classList.remove("is-active");
      }
      if (!pattern) {
        return input.value === ""
          ? document.getElementById(input.name).classList.add("is-active")
          : document.getElementById(input.name).classList.remove("is-active");
      }
    }
  });
  document.addEventListener("submit", (e) => {
    e.preventDefault();
    const loader = document.querySelector(".contact-form-loader"),
      response = document.querySelector(".contact-form-response");
    loader.classList.remove("none");

    fetch("https://formsubmit.co/ajax/leo7mendoza7@gmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        loader.classList.add("none");
        response.classList.remove("none");
        response.innerHTML = `<p><b>${json.message}</b></p>`;
        form.reset();
      })
      .catch((err) => {
        let message =
          err.statusText ||
          `ah ocurrido un error al enviar, intente nuevamente`;
        response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
      })
      .finally(
        setTimeout(() => {
          response.classList.add("none");
        }, 3000)
      );
  });
};

validateForm();
