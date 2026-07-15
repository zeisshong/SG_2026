(function () {
  const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  function activateTab(id) {
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
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tab));
  });

  const initial = window.location.hash.replace("#", "");
  if (initial && document.getElementById(initial)) {
    activateTab(initial);
  }
})();

(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;

  function syncHeader() {
    header.classList.toggle("is-compact", window.scrollY > 96);
  }

  window.addEventListener("scroll", syncHeader, { passive: true });
  syncHeader();
})();

(function () {
  const password = "SG2026";
  const storageKey = "sg2026_roster_unlocked";
  const lock = document.querySelector("[data-lock]");
  const form = document.querySelector("[data-lock-form]");
  const input = form ? form.querySelector(".lock-input") : null;
  const error = form ? form.querySelector(".lock-error") : null;
  const protectedContent = document.querySelector("[data-protected]");

  if (!lock || !form || !input || !protectedContent) return;

  function unlock() {
    lock.hidden = true;
    protectedContent.hidden = false;
    sessionStorage.setItem(storageKey, "1");
  }

  if (sessionStorage.getItem(storageKey) === "1") {
    unlock();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.trim() === password) {
      unlock();
      return;
    }

    if (error) error.classList.add("active");
    input.select();
  });
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
