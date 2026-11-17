export function createRouter({ root, routes, fallback = "/" }) {
  function getPath() {
    return (window.location.hash.replace(/^#/, "").split("?")[0]) || fallback;
  }

  function navigate(path) {
    window.location.hash = path;
  }

  function render() {
    const path = getPath();
    const page = routes[path] || routes[fallback];
    root.innerHTML = "";
    const frame = document.createElement("main");
    frame.className = "app-frame";
    frame.innerHTML = page();
    root.appendChild(frame);
  }

  function start() {
    window.addEventListener("hashchange", render);
    if (!window.location.hash) window.location.hash = fallback;
    else render();
  }

  return { start, navigate, render };
}
