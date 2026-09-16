const test = require("node:test");
const assert = require("node:assert");
const { searchCatalog } = require("../server/lib/search");

const catalog = [
  { id: 1, title: "James", author: "Percival Everett", format: "Book" },
  { id: 2, title: "The Library Book", author: "Susan Orlean", format: "Book" },
  { id: 3, title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", format: "Book" },
];

test("returns empty array for empty query", () => {
  assert.deepStrictEqual(searchCatalog(catalog, ""), []);
});

test("returns empty array for whitespace-only query", () => {
  assert.deepStrictEqual(searchCatalog(catalog, "   "), []);
});

test("matches by title, case-insensitive", () => {
  const results = searchCatalog(catalog, "library");
  assert.strictEqual(results.length, 1);
  assert.strictEqual(results[0].title, "The Library Book");
});

test("matches by author, case-insensitive", () => {
  const results = searchCatalog(catalog, "EVERETT");
  assert.strictEqual(results.length, 1);
  assert.strictEqual(results[0].id, 1);
});

test("matches a substring within a longer title", () => {
  const results = searchCatalog(catalog, "book");
  assert.strictEqual(results.length, 1);
  assert.strictEqual(results[0].title, "The Library Book");
});

test("returns multiple matches when several items share a term", () => {
  const results = searchCatalog(catalog, "e");
  assert.ok(results.length > 1);
});

test("returns no matches for an unrelated query", () => {
  const results = searchCatalog(catalog, "nonexistent title xyz");
  assert.deepStrictEqual(results, []);
});
