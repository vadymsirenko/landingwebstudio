const optionStack = document.getElementById("optionStack");
const questionTitle = document.getElementById("question-title");
const stepLabel = document.getElementById("stepLabel");
const progressFill = document.querySelector(".progress-fill");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const summaryList = document.getElementById("summaryList");
const summaryEmpty = document.getElementById("summaryEmpty");

const fallbackQuestions = [
  {
    id: 1,
    text: "Яка головна мета сайту?",
    options: [
      {
        text: "Продаж товарів чи послуг онлайн",
        hint: "Створення інтернет-магазину або системи замовлень",
      },
      {
        text: "Залучення нових клієнтів та заявок",
        hint: "Лендінг, що мотивує залишити контактні дані",
      },
      {
        text: "Інформаційний ресурс або блог",
        hint: "Публікація аналітики, статей і експертного контенту",
      },
      {
        text: "Платформа для навчання чи спільноти",
        hint: "Освітні курси та взаємодія з учасниками",
      },
    ],
  },
  {
    id: 2,
    text: "Які основні дії має виконати користувач на сайті?",
    options: [
      {
        text: "Оформити замовлення або купити",
        hint: "Каталог, корзина, онлайн-оплата",
      },
      {
        text: "Записатися на консультацію",
        hint: "Форми заявок, календар, квіз",
      },
      {
        text: "Переглянути портфоліо чи кейси",
        hint: "Галереї, відгуки, відео",
      },
      {
        text: "Вивчати навчальні матеріали",
        hint: "Уроки, тести, спільнота",
      },
    ],
  },
  {
    id: 3,
    text: "Яка тональність та стиль дизайну вам ближче?",
    options: [
      {
        text: "Футуристичний та технологічний",
        hint: "Градієнти, неон, скляні ефекти",
      },
      {
        text: "Мінімалістичний та спокійний",
        hint: "Чисті блоки, багато повітря",
      },
      {
        text: "Яскравий та динамічний",
        hint: "Контрастні кольори, рух",
      },
      {
        text: "Корпоративний та стриманий",
        hint: "Лаконічна типографіка, елементи брендбуку",
      },
    ],
  },
];

let questionsData = [];
let currentStep = 0;
const answers = new Map();

function sanitizeText(value) {
  return (value ?? "").toString().replace(/\s+/g, " ").trim();
}

function isCorrupted(text) {
  return /dY|D[\'?"\\]|�/.test(text);
}

function normalizeData(raw = []) {
  return raw
    .map((item, index) => {
      const questionText = sanitizeText(item.text ?? item.question ?? "");
      const options = Array.isArray(item.options)
        ? item.options
            .map((opt) => {
              const main = sanitizeText(opt.text ?? opt.title ?? "");
              const hint = sanitizeText(opt.hint ?? opt.description ?? "");
              return main ? { text: main, hint } : null;
            })
            .filter(Boolean)
        : [];
      return options.length
        ? {
            id: item.id ?? index + 1,
            text: questionText || `Питання ${item.id ?? index + 1}`,
            options,
          }
        : null;
    })
    .filter(Boolean);
}

function getIcon(index) {
  const icons = [
    '<svg viewBox="0 0 24 24"><path d="M4 7.5a3.5 3.5 0 1 1 7 0v9a1.5 1.5 0 0 1-3 0v-5.25a.75.75 0 0 0-1.5 0V18a3 3 0 1 0 6 0V7.5a5 5 0 1 0-10 0v7a.75.75 0 0 0 1.5 0z" /><path d="M16.25 6a.75.75 0 0 1 .75-.75h1a3.5 3.5 0 0 1 0 7h-.5a.75.75 0 0 0-.75.75V14a.75.75 0 0 0 1.5 0v-.506A5 5 0 0 0 20 6.25a5 5 0 0 0-5-5h-1a.75.75 0 0 0 0 1.5h1a3.5 3.5 0 0 1 3.5 3.5v.25a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1-.75-.75z" /></svg>',
    '<svg viewBox="0 0 24 24"><path d="M4 3.75A.75.75 0 0 1 4.75 3h14.5a.75.75 0 0 1 .75.75V18a.75.75 0 0 1-1.5 0V8.56l-5.72 5.72a.75.75 0 0 1-1.06 0L6 9.81V18a.75.75 0 0 1-1.5 0z" /><path d="M9.53 6.47a.75.75 0 0 1 1.06 0l2.91 2.91a.75.75 0 1 1-1.06 1.06L10 8.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06z" /></svg>',
    '<svg viewBox="0 0 24 24"><path d="M5.25 3A2.25 2.25 0 0 0 3 5.25v13.5A2.25 2.25 0 0 0 5.25 21h9.5A2.25 2.25 0 0 0 17 18.75V5.25A2.25 2.25 0 0 0 14.75 3zM4.5 5.25c0-.414.336-.75.75-.75h9.5c.414 0 .75.336.75.75V18h-11z" /><path d="M19.5 6.5a.75.75 0 0 0 0 1.5 1 1 0 0 1 1 1v10.25a.75.75 0 0 1-1.5 0V13a.5.5 0 0 0-1 0v6.25a2.25 2.25 0 0 0 4.5 0V9a2.5 2.5 0 0 0-3-2.449z" /><path d="M7.75 7.5h4.5a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0 0 1.5zM7.75 11h4.5a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0 0 1.5zM7.75 14.5h2.5a.75.75 0 0 0 0-1.5h-2.5a.75.75 0 0 0 0 1.5z" /></svg>',
    '<svg viewBox="0 0 24 24"><path d="M3 7.25A2.25 2.25 0 0 1 5.25 5h13.5A2.25 2.25 0 0 1 21 7.25v9.5A2.25 2.25 0 0 1 18.75 19H5.25A2.25 2.25 0 0 1 3 16.75zM5.25 6.5c-.414 0-.75.336-.75.75v6.086l4.05-3.375a3 3 0 0 1 3.9 0l4.05 3.375V7.25c0-.414-.336-.75-.75-.75z" /><path d="M5 20.25a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H5.75a.75.75 0 0 1-.75-.75z" /></svg>',
  ];
  return icons[index % icons.length];
}

function renderQuestion() {
  const question = questionsData[currentStep];
  if (!question) {
    questionTitle.textContent = "Дані не знайдено";
    optionStack.innerHTML = '<p class="summary-empty">Спробуйте пізніше.</p>';
    nextBtn.disabled = true;
    backBtn.disabled = true;
    return;
  }

  questionTitle.textContent = `${currentStep + 1}. ${question.text}`;
  optionStack.innerHTML = "";

  question.options.forEach((option, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "option-card";
    card.dataset.value = option.text;
    card.dataset.hint = option.hint ?? "";
    const hintMarkup = option.hint ? `<span>${option.hint}</span>` : "";
    card.innerHTML = `
          <span class="option-icon" aria-hidden="true">
           <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9.75 16.25 6.5 13a.75.75 0 1 0-1 1.06l3.75 3.75a.75.75 0 0 0 1.06 0L20.5 7.56a.75.75 0 0 0-1.06-1.06z" />
          </svg>
          </span>
          <span class="option-label">
            ${option.text}
            ${hintMarkup}
          </span>
        `;

    const saved = answers.get(question.id);
    if (saved && saved.value === option.text) {
      card.classList.add("selected");
    }

    card.addEventListener("click", () =>
      handleOptionSelect(question, option, card)
    );
    optionStack.appendChild(card);
  });
}

function handleOptionSelect(question, option, card) {
  optionStack
    .querySelectorAll(".option-card")
    .forEach((item) => item.classList.remove("selected"));
  card.classList.add("selected");
  answers.set(question.id, {
    question: question.text,
    value: option.text,
    hint: option.hint ?? "",
  });
  renderSummary();
  updateButtons();
}

function renderSummary() {
  summaryList.innerHTML = "";
  if (answers.size === 0) {
    summaryEmpty.hidden = false;
    return;
  }

  summaryEmpty.hidden = true;
  const sorted = Array.from(answers.entries()).sort((a, b) => a[0] - b[0]);
  sorted.forEach(([id, item]) => {
    const pill = document.createElement("div");
    pill.className = "summary-pill";
    pill.setAttribute("role", "listitem");
    pill.innerHTML = `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9.75 16.25 6.5 13a.75.75 0 1 0-1 1.06l3.75 3.75a.75.75 0 0 0 1.06 0L20.5 7.56a.75.75 0 0 0-1.06-1.06z" />
          </svg>
          <div>
            <strong>${id}. ${item.question}</strong>
            <span>${item.value}${item.hint ? ` — ${item.hint}` : ""}</span>
          </div>
        `;
    summaryList.appendChild(pill);
  });
}

function updateProgress() {
  const total = questionsData.length || 1;
  const current = Math.min(currentStep + 1, total);
  stepLabel.textContent = `Крок ${current} з ${total}`;
  const width = (current / total) * 100;
  progressFill.style.width = `${width}%`;
}

function updateButtons() {
  backBtn.disabled = currentStep === 0;
  const question = questionsData[currentStep];
  const hasAnswer = question ? answers.has(question.id) : false;
  nextBtn.textContent =
    currentStep === questionsData.length - 1 ? "Завершити" : "Далі";
  nextBtn.disabled = !hasAnswer;
}

function handleBack() {
  if (currentStep === 0) return;
  currentStep -= 1;
  renderQuestion();
  updateButtons();
  updateProgress();
}

function handleNext() {
  const isLast = currentStep === questionsData.length - 1;
  const question = questionsData[currentStep];
  if (!question || !answers.has(question.id)) return;

  if (isLast) {
    const summary = Array.from(answers.values())
      .map((item) => `${item.question}: ${item.value}`)
      .join("\n");
    alert(`Дякуємо!\n\n${summary}`);
    return;
  }

  currentStep += 1;
  renderQuestion();
  updateButtons();
  updateProgress();
}

async function loadQuestions() {
  try {
    const response = await fetch("data/questions.json", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Статус ${response.status}`);
    }
    const data = await response.json();
    const normalized = normalizeData(data);
    if (!normalized.length || isCorrupted(normalized[0].text)) {
      throw new Error("Неможливо прочитати дані");
    }
    questionsData = normalized;
  } catch (error) {
    console.warn(
      "Не вдалося завантажити questions.json, використовую запасні питання.",
      error
    );
    questionsData = fallbackQuestions;
  }

  currentStep = 0;
  answers.clear();
  renderQuestion();
  renderSummary();
  updateButtons();
  updateProgress();
}

backBtn.addEventListener("click", handleBack);
nextBtn.addEventListener("click", handleNext);

loadQuestions();
