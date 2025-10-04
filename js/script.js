// // Burger menu
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const body = document.getElementById("top");
// const aboutHeader = document.getElementById("header-about");
// const phoneHeader = document.getElementById("header-phone");
// const contactsHeader = document.getElementById("header-contacts");
// const sslCert = document.getElementById("ssl-cert");

burger?.addEventListener("click", () => {
  burger.classList.toggle("active");
  body.classList.toggle("lock");
//   aboutHeader.classList.toggle("hide");
//   phoneHeader.classList.toggle("hide");
//   sslCert.classList.toggle("hide");
//   contactsHeader.classList.toggle("show");
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});
// Close menu on link click (mobile)
nav?.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      burger.classList.remove("active");
      body.classList.remove("lock");
//       aboutHeader.classList.remove("hide");
//       phoneHeader.classList.remove("hide");
//       sslCert.classList.remove("hide");
//       contactsHeader.classList.remove("show");
      burger.setAttribute("aria-expanded", "false");
    }
  })
);

// // Smooth scroll
// document.querySelectorAll('a[href^="#"]').forEach((anchor) =>
//   anchor.addEventListener("click", function (e) {
//     const id = this.getAttribute("href");
//     if (id.length > 1) {
//       const el = document.querySelector(id);
//       if (el) {
//         e.preventDefault();
//         window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
//       }
//     }
//   })
// );


// Year
document.getElementById("y").textContent = new Date().getFullYear();

// Swiper
const reviewsContainer = document.querySelector(".verticalSwiper");
if (reviewsContainer) {
  reviewsContainer.querySelector(".swiper-pagination")?.remove();
  if (!reviewsContainer.querySelector(".reviews-swiper-button-next")) {
    const reviewsPrev = document.createElement("div");
    reviewsPrev.classList.add("swiper-button-prev", "reviews-swiper-button-prev");
    const reviewsNext = document.createElement("div");
    reviewsNext.classList.add("swiper-button-next", "reviews-swiper-button-next");
    reviewsContainer.append(reviewsPrev, reviewsNext);
  }
}

const heroSwiper = new Swiper(".mySwiper", {
  centeredSlides: true,
  loop: true,
  noSwipingClass: "swiper-slide",
  slidesPerView: "auto",
  spaceBetween: 15,
  speed: 2500,
  autoplay: {
    delay: 11000,
    disableOnInteraction: false,
    reverseDirection: false,
  },
  keyboard: {
    enabled: true,
  },
});

const verticalSwiper = new Swiper(".verticalSwiper", {
  direction: "vertical",
  loop: true,
  slidesPerView: 2,
  spaceBetween: 30,
  speed: 800,
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".reviews-swiper-button-next",
    prevEl: ".reviews-swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
});

// FAQ toggle
document.querySelectorAll(".works-description").forEach((item) => {
  item.addEventListener("click", () => {
    const p = item.querySelector("p");
    item.classList.toggle("active");
    p.style.display = p.style.display === "block" ? "none" : "block";
  });
});
