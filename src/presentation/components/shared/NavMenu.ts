import { mainRoutes } from "../../router";

export function NavMenu() {
  const $styles = document.querySelector<HTMLStyleElement>("#dynamic-styles")!;
  $styles.innerHTML += /*css*/ `
    .nav-bar {
      display: flex;
      gap: 2rem;
      justify-content: center;
      align-items: center;
      background-color: var(--second-color);
    }

    .nav-bar a {
      border-bottom: 4px solid transparent;
      color: var(--white-color);
      transition: border-bottom 0.3s;
    }

    .nav-bar a:hover {
      border-bottom: 4px solid white;
    }
  `;

  const $navMenu = document.createElement("nav");
  $navMenu.id = "navbar";
  $navMenu.classList.add("nav-bar");

  let html = "";

  mainRoutes.forEach((option) => {
    html += /*html*/ `
      <a
        class="nav-bar"
        href="${option.url}"
        >
        ${option.name}
      </a>
      
    `;
  });

  $navMenu.innerHTML = html;

  return $navMenu;
}
