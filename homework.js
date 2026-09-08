const tasks = [
  { id: "math-review", subject: "Matematik", title: "Repetera inför avstämningen", description: "Arbeta med checklistan och repetitionsuppgifterna. Markera det som behöver tränas mer.", minutes: "15–20 min", color: "#f4c95d" },
  { id: "english-words", subject: "Engelska", title: "Words to describe English", description: "Börja öva glosorna i korta pass inför fredagen den 18 september.", minutes: "10 min", color: "#77a8bd" }
];

const languageTasks = {
  spanska: { id: "spanish-words", subject: "Spanska", title: "Förbered veckans ord", description: "Gå igenom de nya orden. Missat material finns i Classroom med kod zhqrvdmg.", minutes: "10 min", color: "#e58d76", icon: "🇪🇸", note: "Nya ord delas ut. Missat material finns i Classroom, kod <b>zhqrvdmg</b>." },
  franska: { id: "french-plan", subject: "Franska", title: "Kontrollera språkplaneringen", description: "Se den separata planeringen för franska och träna på veckans aktuella uppgift.", minutes: "10 min", color: "#8f9fc9", icon: "🇫🇷", note: "Kontrollera den separata planeringen för franska för veckans ord och uppgifter." },
  tyska: { id: "german-plan", subject: "Tyska", title: "Kontrollera språkplaneringen", description: "Se den separata planeringen för tyska och träna på veckans aktuella uppgift.", minutes: "10 min", color: "#cf9a5b", icon: "🇩🇪", note: "Kontrollera den separata planeringen för tyska för veckans ord och uppgifter." }
};

const taskGrid = document.querySelector("#taskGrid");
const saved = JSON.parse(localStorage.getItem("homework-6f-done") || "{}");
const languageSelect = document.querySelector("#languageSelect");
const selectedLanguage = localStorage.getItem("homework-6f-language") || "spanska";
languageSelect.value = selectedLanguage;

function createTaskCard(task) {
  const card = document.createElement("article");
  card.className = `task${saved[task.id] ? " is-done" : ""}`;
  card.style.setProperty("--accent", task.color);
  card.innerHTML = `<div class="task-top"><span class="subject">${task.subject}</span><span class="minutes">${task.minutes}</span></div><h3>${task.title}</h3><p>${task.description}</p><button class="done-button" type="button" aria-pressed="${Boolean(saved[task.id])}">${saved[task.id] ? "Klar ✓" : "Markera som klar"}</button>`;
  const button = card.querySelector("button");
  button.addEventListener("click", () => {
    saved[task.id] = !saved[task.id];
    localStorage.setItem("homework-6f-done", JSON.stringify(saved));
    card.classList.toggle("is-done", saved[task.id]);
    button.textContent = saved[task.id] ? "Klar ✓" : "Markera som klar";
    button.setAttribute("aria-pressed", String(saved[task.id]));
  });
  taskGrid.appendChild(card);
}

function renderTasks(language) {
  taskGrid.replaceChildren();
  [tasks[0], languageTasks[language], tasks[1]].forEach(createTaskCard);
  const languageTask = languageTasks[language];
  document.querySelector("#languageNote").innerHTML = `<span>${languageTask.icon}</span><div><strong>${languageTask.subject}</strong><p>${languageTask.note}</p></div>`;
}

languageSelect.addEventListener("change", () => {
  localStorage.setItem("homework-6f-language", languageSelect.value);
  renderTasks(languageSelect.value);
});

renderTasks(selectedLanguage);

function getIsoWeek(date) {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const weekday = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - weekday);
  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
  return Math.ceil((((utcDate - yearStart) / 86400000) + 1) / 7);
}

const today = new Date();
const formattedDate = new Intl.DateTimeFormat("sv-SE", {
  weekday: "long",
  day: "numeric",
  month: "long"
}).format(today);
document.querySelector("#todayLabel").textContent = `Klass 6F · Vecka ${getIsoWeek(today)} · ${formattedDate}`;
