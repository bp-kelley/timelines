export const PATHFINDER_MAP_LINK_URL = "https://map.pathfinderwiki.com/#location={zoom}/{lat}/{lng}";
const MAP_LINK_ZOOM = 8;

const roundCoord = (v) => Math.round(v * 1e6) / 1e6;
const normalizeLng = (lng) => ((((lng + 180) % 360) + 360) % 360) - 180;

// fills an "open in map" url template, or null when the template or coords are missing
export function buildMapLinkUrl(template, lat, lng, zoom = MAP_LINK_ZOOM) {
  const t = typeof template === "string" ? template.trim() : "";
  if (!/^https?:\/\//i.test(t)) return null;
  if (lat == null || lng == null || lat === "" || lng === "") return null;
  const la = Number(lat), ln = Number(lng);
  if (!Number.isFinite(la) || !Number.isFinite(ln)) return null;
  return t.replaceAll("{lat}", String(roundCoord(la))).replaceAll("{lng}", String(roundCoord(normalizeLng(ln)))).replaceAll("{zoom}", String(zoom));
}
