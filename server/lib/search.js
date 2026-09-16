/**
 * Pure search/filter function with no HTTP or framework dependency,
 * so it can be unit tested directly (see tests/search.test.js) without
 * spinning up a server.
 *
 * @param {Array<{id:number,title:string,author:string,format:string}>} catalog
 * @param {string} query
 * @returns {Array} matching items, case-insensitive, matched on title or author
 */
function searchCatalog(catalog, query) {
  if (!query || !query.trim()) {
    return [];
  }
  const needle = query.trim().toLowerCase();
  return catalog.filter(
    (item) =>
      item.title.toLowerCase().includes(needle) ||
      item.author.toLowerCase().includes(needle)
  );
}

module.exports = { searchCatalog };
