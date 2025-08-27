async function getActiveTab() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  return tab;
}

function getOriginFromUrl(urlStr) {
  const u = new URL(urlStr);
  if (u.protocol !== "http:" && u.protocol !== "https:") {
    throw new Error("Nur http(s)-Seiten werden unterstützt.");
  }
  return u.origin; // z.B. https://example.com
}

async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}

function flash(btn, text = "Kopiert!") {
  const prev = btn.getAttribute("data-prev") || btn.title || "";
  btn.setAttribute("data-prev", prev);
  const prevTitle = btn.title;
  btn.title = text;
  btn.setAttribute("aria-label", text);
  btn.disabled = true;
  setTimeout(() => {
    btn.title = prevTitle;
    btn.setAttribute("aria-label", prevTitle);
    btn.disabled = false;
  }, 900);
}



function setFrontendFavicon(tab, origin) {
  const img = document.getElementById("favicon-frontend");
  if (!img) return;

  // 1) Tab-Favicon, 2) Fallback: /favicon.ico
  let src = tab.favIconUrl || `${origin}/favicon.ico`;

  // Wenn nichts brauchbares da ist: verstecken
  if (!src || typeof src !== "string") {
    img.hidden = true;
    return;
  }

  // Versuchen zu laden; bei Fehler wieder ausblenden
  img.setAttribute("referrerpolicy", "no-referrer");
  img.onload = () => { img.hidden = false; };
  img.onerror = () => { img.hidden = true; };
  img.src = src;
}



async function init() {
  const error = document.getElementById("error");
  try {
    const tab = await getActiveTab();
    if (!tab || !tab.url) throw new Error("Keine aktive Seite gefunden.");

    const origin = getOriginFromUrl(tab.url);
    document.getElementById("origin").textContent = origin;

    // Favicon für „Frontend“ setzen
    setFrontendFavicon(tab, origin);    

    // Ziellinks
    const urls = {
      frontend: `${origin}`,
      contao: `${origin}/contao`,
      manager: `${origin}/contao-manager.phar.php`,
      extensions: `https://extensions.contao.org/`,
    };

    // Links anklickbar machen (Label verlinkt, öffnet im GLEICHEN Tab)
    const linkIds = ["frontend", "contao", "manager", "extensions"];
    linkIds.forEach((key) => {
      const a = document.getElementById(`link-${key}`);
      if (!a) return;
      a.addEventListener("click", async (ev) => {
        ev.preventDefault();
        const currentTab = await getActiveTab();
        await browser.tabs.update(currentTab.id, { url: urls[key] });
        window.close();
      });
    });

    // Button-Handling (Event Delegation)
    document.body.addEventListener("click", async (ev) => {
      const t = ev.target instanceof HTMLElement ? ev.target : null;
      if (!t) return;

      // Falls auf <img> im Button geklickt wurde, den Button selbst greifen
      const btn = t.closest("button");
      if (!btn) return;

      // Neuen Tab öffnen (Icon-Button mit extern-Symbol)
      const openKey = btn.getAttribute("data-open");
      if (openKey && urls[openKey]) {
        ev.preventDefault();
        await browser.tabs.create({ url: urls[openKey], active: true });
        return;
      }

      // Einzelnen Link kopieren (Icon-Button)
      const copyKey = btn.getAttribute("data-copy");
      if (copyKey && urls[copyKey]) {
        ev.preventDefault();
        await copyToClipboard(urls[copyKey]);
        flash(btn);
        return;
      }

      // Alle Links kopieren
      if (btn.id === "copy-all") {
        ev.preventDefault();
        const all = `${urls.frontend}\n${urls.contao}\n${urls.manager}\n${urls.extensions}`;
        await copyToClipboard(all);
        // Für den großen Button belassen wir den Text; kurzer visueller Hinweis:
        btn.textContent = "Kopiert!";
        setTimeout(() => (btn.textContent = "Alle Links in Zwischenablage kopieren"), 900);
        return;
      }
    });
  } catch (e) {
    error.style.display = "block";
    error.textContent = "Fehler: " + e.message;
  }
}

document.addEventListener("DOMContentLoaded", init);
