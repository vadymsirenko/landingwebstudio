// // Burger menu
// const burger = document.getElementById("burger");
// const nav = document.getElementById("nav");
// const body = document.getElementById("top");
// const aboutHeader = document.getElementById("header-about");
// const phoneHeader = document.getElementById("header-phone");
// const contactsHeader = document.getElementById("header-contacts");
// const sslCert = document.getElementById("ssl-cert");

// burger?.addEventListener("click", () => {
//   burger.classList.toggle("active");
//   body.classList.toggle("lock");
//   aboutHeader.classList.toggle("hide");
//   phoneHeader.classList.toggle("hide");
//   sslCert.classList.toggle("hide");
//   contactsHeader.classList.toggle("show");
//   const open = nav.classList.toggle("open");
//   burger.setAttribute("aria-expanded", open ? "true" : "false");
// });
// // Close menu on link click (mobile)
// nav?.querySelectorAll("a").forEach((a) =>
//   a.addEventListener("click", () => {
//     if (nav.classList.contains("open")) {
//       nav.classList.remove("open");
//       burger.classList.remove("active");
//       body.classList.remove("lock");
//       aboutHeader.classList.remove("hide");
//       phoneHeader.classList.remove("hide");
//       sslCert.classList.remove("hide");
//       contactsHeader.classList.remove("show");
//       burger.setAttribute("aria-expanded", "false");
//     }
//   })
// );

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
// // Year
// document.getElementById("y").textContent = new Date().getFullYear();



// Swiper
const swiper = new Swiper(".swiper", {
  // Optional parameters
  spaceBetween: 30,
  centeredSlides: true,
  // effect: "fade",
  centeredSlides: true,
  loop: true,
  // navigation: false,
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
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
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