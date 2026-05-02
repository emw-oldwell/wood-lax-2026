// Wood Lacrosse 2026 — phone-first dashboard rendering

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// --- Helpers ---
function fmtDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return { weekday, month, day: d, iso, date };
}

function fmtDateTime(iso) {
  if (!iso) return "—";
  const dt = new Date(iso);
  return dt.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    + " · " + dt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function dayOfWeek(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}
function isWeekend(iso) {
  const dow = dayOfWeek(iso);
  return dow === 0 || dow === 6;
}

function badge(label, kind) {
  return `<span class="badge badge-${kind}">${label}</span>`;
}
function girlsBadge(g) {
  if (g === "Both") return badge("Both", "both");
  if (g === "Rachel") return badge("Rachel solo", "rachel");
  if (g === "Kate") return badge("Kate solo", "kate");
  return "";
}
function lodgingColor(key) { return DATA.lodgingColors[key] || DATA.lodgingColors.EMPTY; }
function lodgingLabel(key) { return DATA.lodgingLabels[key] || ""; }

// --- Tabs ---
function setupTabs() {
  $$(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".tab").forEach(b => b.classList.toggle("active", b === btn));
      const target = btn.dataset.target;
      $$(".panel").forEach(p => p.classList.toggle("active", p.id === target));
      // Smooth scroll only when switching tabs (don't fight a fresh load)
      const tabsEl = document.querySelector(".tabs");
      const y = tabsEl ? tabsEl.getBoundingClientRect().top + window.scrollY - 8 : 0;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
}

// --- Upcoming ---
function renderUpcoming() {
  const today = new Date(); today.setHours(0,0,0,0);
  const upcoming = DATA.events
    .map(e => ({ ...e, _d: new Date(e.date + "T00:00:00") }))
    .filter(e => e._d >= today)
    .sort((a, b) => a._d - b._d)
    .slice(0, 5);
  const showList = upcoming.length ? upcoming : DATA.events.slice(0, 5);
  const isPastSeason = upcoming.length === 0;

  const container = $("#upcoming-list");
  container.innerHTML = (isPastSeason ? `<div class="hint" style="margin-bottom:12px">Season's wrapped — showing first 5 events as reference.</div>` : "")
    + showList.map(eventCard).join("");

  const stats = computeStats();
  $("#stats").innerHTML = `
    <div class="stat-card"><div class="stat-num">${stats.total}</div><div class="stat-label">Tournament days</div></div>
    <div class="stat-card"><div class="stat-num">${stats.both}</div><div class="stat-label">Both girls</div></div>
    <div class="stat-card"><div class="stat-num">${stats.rachel}</div><div class="stat-label">Rachel solo</div></div>
    <div class="stat-card"><div class="stat-num">${stats.lodgings}</div><div class="stat-label">Lodging stops</div></div>
  `;
}

function eventCard(e) {
  const d = fmtDate(e.date);
  const weekendCls = isWeekend(e.date) ? "weekend" : "";
  const lodgeName = lodgingLabel(e.lodgingKey) || "";
  const lodgeColor = lodgingColor(e.lodgingKey);
  const venueLink = e.venueAddress ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.venueAddress)}">${e.venue}</a>` : e.venue;

  return `
  <div class="card">
    <div class="corner-stripe" style="background: ${lodgeColor}"></div>
    <div class="card-header">
      <span class="card-date ${weekendCls}">${d.weekday}, ${d.month} ${d.day}</span>
      <span>${girlsBadge(e.girls)}${e.isHHH ? badge("HHH", "hhh") : ""}</span>
    </div>
    <div class="card-title">${e.name}</div>
    <div class="card-meta">📍 ${venueLink}</div>
    <div class="card-meta">🚗 ${e.driveFromLodging} <span style="color:#999">from ${lodgeName}</span></div>
    ${e.note ? `<div class="note">${e.note}</div>` : ""}
  </div>`;
}

function computeStats() {
  const total = DATA.events.length;
  const both = DATA.events.filter(e => e.girls === "Both").length;
  const rachel = DATA.events.filter(e => e.girls === "Rachel").length;
  const kate = DATA.events.filter(e => e.girls === "Kate").length;
  const lodgings = DATA.lodging.filter(l => !l.isFlight).length;
  return { total, both, rachel, kate, lodgings };
}

// --- Calendar ---
function renderCalendar() {
  $("#calendar-june").innerHTML = monthCalendar(2026, 5, "June 2026");
  $("#calendar-july").innerHTML = monthCalendar(2026, 6, "July 2026");
  const items = Object.keys(DATA.lodgingLabels).map(key => `
    <div class="legend-item" style="background:${DATA.lodgingColors[key]}">${DATA.lodgingLabels[key]}</div>
  `).join("");
  $("#calendar-legend").innerHTML = items;
}

function monthCalendar(year, monthIdx, title) {
  const first = new Date(year, monthIdx, 1);
  const last = new Date(year, monthIdx + 1, 0);
  const daysInMonth = last.getDate();
  const firstDow = first.getDay();
  const labels = ["S","M","T","W","T","F","S"];

  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push({ empty: true });
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(monthIdx + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ day: d, iso });
  }
  while (cells.length % 7 !== 0) cells.push({ empty: true });

  const headHtml = labels.map((l, i) => `<div class="cal-head ${i === 0 || i === 6 ? "weekend" : ""}">${l}</div>`).join("");
  const cellsHtml = cells.map(cellHtml).join("");

  return `<h3>${title}</h3><div class="cal-grid">${headHtml}${cellsHtml}</div>`;
}

function cellHtml(cell) {
  if (cell.empty) return `<div class="cal-cell empty"></div>`;
  const lodgingKey = DATA.lodgingByDate[cell.iso];
  const fill = lodgingKey ? DATA.lodgingColors[lodgingKey] : "#fff";
  const lodgeText = lodgingKey ? `<div class="cal-lodging">@ ${DATA.lodgingLabels[lodgingKey]}</div>` : "";
  const evs = DATA.events.filter(e => e.date === cell.iso);
  const evsHtml = evs.map(e => `<div class="cal-event">▪ ${shortenEvent(e.name)}</div>`).join("");
  let specialHtml = "";
  if (cell.iso === "2026-06-27") specialHtml = `<div class="cal-special">✈ Fly to Charleston</div>`;
  const isPractice = DATA.practices.includes(cell.iso);
  const isSkipped = DATA.practicesSkipped.includes(cell.iso);
  const practiceHtml = isPractice
    ? `<div class="cal-practice ${isSkipped ? "skipped" : ""}">${isSkipped ? "HHH practice (skip)" : "HHH practice 6 PM"}</div>`
    : "";
  const wknd = isWeekend(cell.iso) ? "weekend" : "";
  return `<div class="cal-cell" style="background:${fill}">
    <div class="cal-day ${wknd}">${cell.day}</div>
    ${evsHtml}${specialHtml}${practiceHtml}${lodgeText}
  </div>`;
}

function shortenEvent(name) {
  return name
    .replace("Philly's Phinest Showcase – ", "Phinest ")
    .replace("BIC – Wilmington ", "BIC ")
    .replace("HHH Philly Classic", "Philly Classic")
    .replace("Jr. Open – Iron Peak ", "Jr. Open ")
    .replace("HHH – Lax for the Cure ", "Lax 4 Cure ")
    .replace("Nilly – Downingtown ", "Nilly ")
    .replace("HHH G8 Tournament ", "G8 ")
    .replace("Rachel – Goaliesmith HS Recruiting ", "Goaliesmith ")
    .replace("HHH – Maryland Cup", "Maryland Cup")
    .replace("Committed Games – ", "Committed Games ")
    .replace("AM Select – Delaware ", "AM Select ");
}

// --- Lodging ---
function renderLodging() {
  $("#lodging-list").innerHTML = DATA.lodging.map(lodgingCard).join("");
}

function lodgingCard(L) {
  const fill = L.key ? lodgingColor(L.key) : "#FFE699";
  const checkInF = fmtDateTime(L.checkIn);
  const checkOutF = fmtDateTime(L.checkOut);
  const meta = [];
  if (L.address) meta.push(`📍 <a href="${L.mapsLink || ("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(L.address))}">${L.address}</a>`);
  if (L.hostPhone) meta.push(`📞 <a href="tel:${L.hostPhone.replace(/[^+\d]/g,'')}">${L.hostPhone}</a> <span style="color:#999">(host)</span>`);
  if (L.hotelPhone) meta.push(`📞 <a href="tel:${L.hotelPhone.replace(/[^+\d]/g,'')}">${L.hotelPhone}</a>`);
  if (L.conf) meta.push(`<span style="color:var(--hhh-purple);font-weight:700">Conf: ${L.conf}</span>`);
  if (L.roomType) meta.push(`🛏 ${L.roomType}`);
  if (L.rooms && L.rooms > 1) meta.push(`🛏 ${L.rooms} rooms`);
  if (L.wifi) meta.push(`📶 ${L.wifi}`);
  if (L.from && L.to) {
    meta.push(`✈ ${L.from} → ${L.to}`);
    if (L.tail) meta.push(`Aircraft: ${L.tail}`);
  }
  if (L.managePage) meta.push(`<a href="${L.managePage}" target="_blank" rel="noopener">Manage booking ↗</a>`);

  const nightsLabel = L.isFlight ? "Flight" : (L.nights === 1 ? "1 night" : `${L.nights} nights`);
  const labelBadge = L.isFlight ? badge("TODO Book", "todo") : (L.label ? `<span class="badge badge-folder">${L.label}</span>` : "");

  return `
  <div class="card">
    <div class="corner-stripe" style="background:${fill}"></div>
    <div class="card-header">
      <span class="card-date">${checkInF.split(" · ")[0]} → ${checkOutF.split(" · ")[0]}</span>
      <span>${labelBadge}</span>
    </div>
    <div class="card-title">${L.name}</div>
    <div class="card-meta" style="font-size:12px;color:#999">Check-in ${checkInF.split(" · ")[1] || ""} · Check-out ${checkOutF.split(" · ")[1] || ""} · ${nightsLabel}</div>
    ${meta.map(m => `<div class="card-meta">${m}</div>`).join("")}
    ${L.notes ? `<div class="note">${L.notes}</div>` : ""}
  </div>`;
}

// --- Tournaments ---
function renderTournaments() {
  $("#tournament-list").innerHTML = DATA.events.map(e => eventCard(e)).join("");
}

// --- Docs (auto-discovered from /docs/ via build.js → docs.json) ---
async function renderDocs() {
  const container = $("#doc-list");
  try {
    const res = await fetch("docs.json", { cache: "no-cache" });
    if (!res.ok) throw new Error("no docs.json yet");
    const data = await res.json();
    if (!data.totalDocs) {
      container.innerHTML = emptyDocsCard();
      return;
    }
    container.innerHTML = data.categories.map(cat => `
      <div class="doc-folder">
        <div class="doc-folder-name">${cat.name} <span style="color:#999;font-weight:500">· ${cat.items.length} file${cat.items.length === 1 ? '' : 's'}</span></div>
        ${cat.items.map(item => `
          <a class="doc-card" href="${item.file}" target="_blank" rel="noopener">
            <span class="doc-icon">${item.icon}</span>
            <span>
              <span class="doc-name">${item.name}</span>
              <span class="doc-meta">${item.ext.replace(".","").toUpperCase()} · ${item.size}</span>
            </span>
          </a>
        `).join("")}
      </div>
    `).join("");
  } catch (err) {
    container.innerHTML = emptyDocsCard();
  }
}

function emptyDocsCard() {
  return `
  <div class="card">
    <div class="card-title" style="color:#666">No documents yet</div>
    <div class="card-meta">Drop files into the <code>/docs/</code> folder of the GitHub repo. Use subfolders to group them:</div>
    <div class="card-meta">
      <code>/docs/Tournaments/philly-phinest-info.pdf</code><br/>
      <code>/docs/Hotels/chateau-confirmation.pdf</code><br/>
      <code>/docs/Forms/medical-release.pdf</code>
    </div>
    <div class="note">Files appear here automatically on the next deploy. Filenames become titles ("philly-phinest-info" → "Philly Phinest Info").</div>
  </div>`;
}

// --- Boot ---
document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  renderUpcoming();
  renderCalendar();
  renderLodging();
  renderTournaments();
  renderDocs();
  $("#lastUpdated").textContent = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
});
