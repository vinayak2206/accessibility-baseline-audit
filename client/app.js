const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsList = document.getElementById("results");
const resultCount = document.getElementById("result-count");

async function runSearch(query) {
  if (!query.trim()) {
    resultsList.innerHTML = "";
    resultCount.textContent = "";
    return;
  }

  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();

  resultsList.innerHTML = "";
  data.results.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} — ${item.author} (${item.format})`;
    resultsList.appendChild(li);
  });

  // Announced via aria-live in the HTML, not by moving focus —
  // keeps keyboard/screen-reader users in place while still informed.
  resultCount.textContent = `${data.count} result${data.count === 1 ? "" : "s"} found for "${data.query}"`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  runSearch(input.value);
});
