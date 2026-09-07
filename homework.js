const tasks = [
  { subject: "Matematik", title: "Repetera inför avstämningen", description: "Arbeta med checklistan och repetitionsuppgifterna. Markera det som behöver tränas mer.", minutes: "15–20 min", color: "#f4c95d" },
  { subject: "Spanska", title: "Förbered veckans ord", description: "Gå igenom de nya orden. Missat material finns i Classroom med kod zhqrvdmg.", minutes: "10 min", color: "#e58d76" },
  { subject: "Engelska", title: "Words to describe English", description: "Börja öva glosorna i korta pass inför fredagen den 18 september.", minutes: "10 min", color: "#77a8bd" }
];

const taskGrid = document.querySelector("#taskGrid");
const saved = JSON.parse(localStorage.getItem("homework-6f-done") || "{}");

tasks.forEach((task, index) => {
  const card = document.createElement("article");
  card.className = `task${saved[index] ? " is-done" : ""}`;
  card.style.setProperty("--accent", task.color);
  card.innerHTML = `<div class="task-top"><span class="subject">${task.subject}</span><span class="minutes">${task.minutes}</span></div><h3>${task.title}</h3><p>${task.description}</p><button class="done-button" type="button" aria-pressed="${Boolean(saved[index])}">${saved[index] ? "Klar ✓" : "Markera som klar"}</button>`;
  const button = card.querySelector("button");
  button.addEventListener("click", () => {
    saved[index] = !saved[index];
    localStorage.setItem("homework-6f-done", JSON.stringify(saved));
    card.classList.toggle("is-done", saved[index]);
    button.textContent = saved[index] ? "Klar ✓" : "Markera som klar";
    button.setAttribute("aria-pressed", String(saved[index]));
  });
  taskGrid.appendChild(card);
});

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
