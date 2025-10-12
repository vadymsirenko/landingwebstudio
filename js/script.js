// // Burger menu
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const body = document.getElementById("top");

const LANGUAGE_STORAGE_KEY = "landingwebstudio-lang";
const SUPPORTED_LANGS = ["pl", "uk"];
const DEFAULT_LANG = "pl";
const DOCUMENT_TITLES = {
  pl: "LandingWebStudio - cyfrowe doświadczenia, które konwertują",
  uk: "LandingWebStudio - цифрові враження, що приводять до конверсій",
};

const translationNodes = document.querySelectorAll("[data-i18n-pl]");

const applyLanguage = (requestedLang) => {
  const language = SUPPORTED_LANGS.includes(requestedLang) ? requestedLang : DEFAULT_LANG;

  translationNodes.forEach((node) => {
    const attr = node.dataset.i18nAttr || "text";
    const targetValue = language === "uk" ? node.dataset.i18nUk : node.dataset.i18nPl;
    if (typeof targetValue === "undefined") {
      return;
    }

    if (attr === "text") {
      node.textContent = targetValue;
    } else if (attr === "html") {
      node.innerHTML = targetValue;
    } else {
      node.setAttribute(attr, targetValue);
    }
  });

  document.documentElement.lang = language === "uk" ? "uk" : "pl";
  body?.setAttribute("data-active-lang", language);

  document.querySelectorAll("[data-lang-switcher]").forEach((btn) => {
    const isActive = btn.dataset.langSwitcher === language;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  const nextTitle = DOCUMENT_TITLES[language] ?? DOCUMENT_TITLES[DEFAULT_LANG];
  if (nextTitle) {
    document.title = nextTitle;
  }

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    /* no-op */
  }
};

const resolveInitialLanguage = () => {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) {
      return stored;
    }
  } catch (error) {
    /* ignore stored language errors */
  }

  const browserLanguage = (navigator.language || navigator.userLanguage || "").toLowerCase();
  if (browserLanguage.startsWith("uk")) {
    return "uk";
  }

  return DEFAULT_LANG;
};

applyLanguage(resolveInitialLanguage());

document.querySelectorAll("[data-lang-switcher]").forEach((button) => {
  button.addEventListener("click", () => {
    const targetLanguage = button.dataset.langSwitcher;
    if (!targetLanguage) {
      return;
    }

    applyLanguage(targetLanguage);

    if (nav?.classList.contains("open")) {
      nav.classList.remove("open");
      burger?.classList.remove("active");
      body?.classList.remove("lock");
      burger?.setAttribute("aria-expanded", "false");
    }
  });
});
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
const reviewsContainer = document.querySelector(".reviewsSwiper");
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

const reviewsSwiper = new Swiper(".reviewsSwiper", {
  direction: "horizontal",
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
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
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
