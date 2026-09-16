const express = require("express");
const path = require("path");
const fs = require("fs");
const { searchCatalog } = require("./lib/search");

const app = express();
const PORT = process.env.PORT || 3000;

const catalog = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "catalog.json"), "utf8")
);

// Serve the static client so `npm start` runs the whole vertical slice.
app.use(express.static(path.join(__dirname, "..", "client")));

app.get("/api/search", (req, res) => {
  const query = req.query.q || "";
  const results = searchCatalog(catalog, query);
  res.json({ query, count: results.length, results });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
