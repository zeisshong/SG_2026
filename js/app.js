(function () {
  const rosterPassword = "SG2026";
  const storageKey = "sg2026_roster_unlocked";
  const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
  const panels = Array.from(document.querySelectorAll(".panel"));
  const dialog = document.querySelector("[data-password-dialog]");
  const form = document.querySelector("[data-lock-form]");
  const input = form ? form.querySelector(".lock-input") : null;
  const error = form ? form.querySelector(".lock-error") : null;
  const closeButton = document.querySelector("[data-dialog-close]");
  const protectedContent = document.querySelector("[data-protected]");

  function isRosterUnlocked() {
    return sessionStorage.getItem(storageKey) === "1";
  }

  function markRosterUnlocked() {
    sessionStorage.setItem(storageKey, "1");
    if (protectedContent) protectedContent.hidden = false;
  }

  function openPasswordDialog() {
    if (!dialog || !input) return;
    if (error) error.classList.remove("active");
    input.value = "";
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    setTimeout(() => input.focus(), 30);
  }

  function closePasswordDialog() {
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  function activateTab(id) {
    if (id === "assignments" && !isRosterUnlocked()) {
      openPasswordDialog();
      return;
    }

    if (id === "assignments") {
      markRosterUnlocked();
    }

    tabButtons.forEach((button) => {
      const active = button.dataset.tab === id;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });

    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === id);
    });

    if (history.replaceState) {
      history.replaceState(null, "", "#" + id);
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tab));
  });

  if (form && input) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (input.value.trim() === rosterPassword) {
        markRosterUnlocked();
        closePasswordDialog();
        activateTab("assignments");
        return;
      }

      if (error) error.classList.add("active");
      input.select();
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", closePasswordDialog);
  }

  if (dialog) {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closePasswordDialog();
    });
  }

  if (isRosterUnlocked()) {
    markRosterUnlocked();
  }

  const initial = window.location.hash.replace("#", "");
  if (initial && document.getElementById(initial)) {
    activateTab(initial);
  }
})();

(function () {
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");
  const compactHero = document.querySelector(".compact-hero");
  const root = document.documentElement;
  if (!header) return;
  let compact = false;

  function syncHeaderOffset() {
    root.style.setProperty("--header-offset", header.offsetHeight + "px");
  }

  function applyHeaderState() {
    header.classList.toggle("is-compact", compact);
    if (hero) hero.hidden = compact;
    if (compactHero) compactHero.hidden = !compact;
    requestAnimationFrame(syncHeaderOffset);
  }

  function syncHeader() {
    const next = window.scrollY > 8;
    if (next !== compact) {
      compact = next;
      applyHeaderState();
    }
  }

  window.addEventListener("resize", syncHeaderOffset);
  window.addEventListener("scroll", syncHeader, { passive: true });
  applyHeaderState();
  syncHeader();
  window.addEventListener("load", syncHeaderOffset);
})();

(function () {
  const buttons = Array.from(document.querySelectorAll(".subtab"));
  const panels = Array.from(document.querySelectorAll(".assignment-panel"));

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.assignment;
      buttons.forEach((item) => item.classList.toggle("active", item === button));
      panels.forEach((panel) => panel.classList.toggle("active", panel.id === id));
    });
  });
})();
