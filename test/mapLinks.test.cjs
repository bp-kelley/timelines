const test = require("node:test");
const assert = require("node:assert");

test("fills the pathfinder map link template", async () => {
  const { buildMapLinkUrl, PATHFINDER_MAP_LINK_URL } = await import("../src/utils/mapLinks.js");
  assert.strictEqual(buildMapLinkUrl(PATHFINDER_MAP_LINK_URL, 35, -7), "https://map.pathfinderwiki.com/#location=8/35/-7");
  assert.strictEqual(buildMapLinkUrl(PATHFINDER_MAP_LINK_URL, "35.12345678", 190, 4.5), "https://map.pathfinderwiki.com/#location=4.5/35.123457/-170");
});

test("returns null without a usable template or coordinates", async () => {
  const { buildMapLinkUrl, PATHFINDER_MAP_LINK_URL } = await import("../src/utils/mapLinks.js");
  assert.strictEqual(buildMapLinkUrl("", 1, 2), null);
  assert.strictEqual(buildMapLinkUrl(undefined, 1, 2), null);
  assert.strictEqual(buildMapLinkUrl("javascript:alert({lat})", 1, 2), null);
  assert.strictEqual(buildMapLinkUrl(PATHFINDER_MAP_LINK_URL, null, 2), null);
  assert.strictEqual(buildMapLinkUrl(PATHFINDER_MAP_LINK_URL, 1, ""), null);
  assert.strictEqual(buildMapLinkUrl(PATHFINDER_MAP_LINK_URL, "abc", 2), null);
});
