// Conversion function generator
function getConverter(from, to) {
  const conversions = {
    kg_lb: x => x * 2.20462,
    lb_kg: x => x / 2.20462,
    km_mi: x => x * 0.621371,
    mi_km: x => x / 0.621371,
    c_f: x => (x * 9/5) + 32,
    f_c: x => (x - 32) * 5/9,
  };

  const key = `${from}_${to}`;
  const fn = conversions[key];

  if (!fn) throw new Error("Invalid conversion type.");

  return (input) => {
    if (Array.isArray(input)) return input.map(fn);
    return fn(input);
  };
}

// Convert units (attached to form submission)
function convertUnits(event, from, to) {
  event.preventDefault();

  const inputEl = event.target.querySelector("input");
  const resultEl = event.target.querySelector(".result");
  const input = inputEl.value.trim();

  const convert = getConverter(from, to);

  try {
    let values = input.includes(",")
      ? input.split(",").map(val => parseFloat(val.trim()))
      : parseFloat(input);

    if (Array.isArray(values) && values.some(isNaN)) throw "Invalid array input";
    if (!Array.isArray(values) && isNaN(values)) throw "Invalid single input";

    const result = convert(values);
    resultEl.textContent = Array.isArray(result)
      ? result.map(v => v.toFixed(2)).join(", ")
      : result.toFixed(2);
  } catch (err) {
    resultEl.textContent = "Invalid input. Please enter numbers only.";
    resultEl.classList.add("text-red-500");
  }
}

// Tab switching
function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(section => {
    section.classList.add("hidden");
  });
  document.getElementById(tabId).classList.remove("hidden");

  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.classList.remove("text-blue-600", "font-bold");
  });
  event.target.classList.add("text-blue-600", "font-bold");
}