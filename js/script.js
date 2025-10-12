// Burger menu
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const body = document.getElementById("top");

const LANGUAGE_STORAGE_KEY = "landingwebstudio-lang";
const SUPPORTED_LANGS = ["pl", "uk", "en"];
const DEFAULT_LANG = "pl";
const DOCUMENT_TITLES = {
  pl: "LandingWebStudio - cyfrowe doświadczenia, które konwertują",
  uk: "LandingWebStudio - цифрові враження, що приводять до конверсій",
  en: "LandingWebStudio - digital experiences that convert",
};

const DATASET_KEY_MAP = {
  pl: "i18nPl",
  uk: "i18nUk",
  en: "i18nEn",
};

const translationNodes = document.querySelectorAll(
  "[data-i18n-pl], [data-i18n-uk], [data-i18n-en]"
);

const langSwitcher = document.querySelector(".lang-switcher");
const langToggle = document.getElementById("lang-toggle");
const langOptionButtons = langSwitcher
  ? Array.from(langSwitcher.querySelectorAll("[data-lang-option]"))
  : [];

const LANG_LABELS = {
  pl: "PL",
  uk: "UA",
  en: "EN",
};

const updateLangSwitcher = (language) => {
  if (!langToggle) {
    return;
  }

  langToggle.textContent = LANG_LABELS[language] || language.toUpperCase();

  langOptionButtons.forEach((button) => {
    const optionLang = button.dataset.langOption;
    const isActive = optionLang === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
    if (isActive) {
      button.hidden = true;
      button.setAttribute("tabindex", "-1");
    } else {
      button.hidden = false;
      button.removeAttribute("tabindex");
    }
  });
};

const closeLangList = () => {
  if (!langSwitcher || !langToggle) {
    return;
  }
  langSwitcher.classList.remove("open");
  langToggle.setAttribute("aria-expanded", "false");
};

const openLangList = () => {
  if (!langSwitcher || !langToggle) {
    return;
  }
  langSwitcher.classList.add("open");
  langToggle.setAttribute("aria-expanded", "true");
  const focusableOption = langOptionButtons.find((btn) => !btn.hidden);
  focusableOption?.focus();
};

const applyLanguage = (requestedLang) => {
  const language = SUPPORTED_LANGS.includes(requestedLang) ? requestedLang : DEFAULT_LANG;

  translationNodes.forEach((node) => {
    const attr = node.dataset.i18nAttr || "text";
    const datasetKey = DATASET_KEY_MAP[language] || DATASET_KEY_MAP[DEFAULT_LANG];
    const fallbackKey = DATASET_KEY_MAP[DEFAULT_LANG];
    const targetValue =
      node.dataset[datasetKey] ??
      node.dataset[fallbackKey] ??
      (attr === "text" ? node.textContent : node.getAttribute(attr));

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

  document.documentElement.lang = language;
  body?.setAttribute("data-active-lang", language);
  updateLangSwitcher(language);
  closeLangList();

  const nextTitle = DOCUMENT_TITLES[language] ?? DOCUMENT_TITLES[DEFAULT_LANG];
  if (nextTitle) {
    document.title = nextTitle;
  }

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    /* ignore storage issues */
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
  if (browserLanguage.startsWith("en")) {
    return "en";
  }
  if (browserLanguage.startsWith("pl")) {
    return "pl";
  }

  return DEFAULT_LANG;
};

applyLanguage(resolveInitialLanguage());

langToggle?.addEventListener("click", () => {
  if (!langSwitcher) {
    return;
  }
  const isOpen = langSwitcher.classList.contains("open");
  if (isOpen) {
    closeLangList();
  } else {
    openLangList();
  }
});

langOptionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetLanguage = button.dataset.langOption;
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

    langToggle?.focus();
  });
});

document.addEventListener("click", (event) => {
  if (!langSwitcher || !langToggle) {
    return;
  }

  if (event.target === langToggle || langSwitcher.contains(event.target)) {
    return;
  }

  closeLangList();
});

langSwitcher?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLangList();
    langToggle?.focus();
  }
});

burger?.addEventListener("click", () => {
  burger.classList.toggle("active");
  body?.classList.toggle("lock");
  const open = nav?.classList.toggle("open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});

// Close menu on link click (mobile)
nav?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      burger?.classList.remove("active");
      body?.classList.remove("lock");
      burger?.setAttribute("aria-expanded", "false");
    }
  })
);

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
