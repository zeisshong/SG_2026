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
