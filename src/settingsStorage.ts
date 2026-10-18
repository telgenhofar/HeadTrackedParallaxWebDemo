const KEY = "parallax-settings";

const fields = document.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
  "#calibration-modal input, #calibration-modal select",
);

function load(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

function save() {
  try {
    const values = Object.fromEntries([...fields].map((field) => [field.id, field.value]));
    localStorage.setItem(KEY, JSON.stringify(values));
  } catch {}
}

const saved = load();
for (const field of fields) {
  if (field.id in saved) {
    field.value = saved[field.id];
  }
  field.addEventListener("input", save);
  field.addEventListener("change", save);
}
