const menuOptions = [
  {
    name: "Home",
    url: "#/",
  },
  {
    name: "Bryan",
    url: "#/bryan",
  },
  {
    name: "Lautaro",
    url: "#/lautaro",
  },
  {
    name: "Justin",
    url: "#/justin",
  },
  {
    name: "Diego",
    url: "#/diego",
  },
  {
    name: "Jonatan",
    url: "#/jonatan",
  },
  {
    name: "Miguel",
    url: "#/miguel",
  },
];

export function NavMenu() {
  const $styles = document.querySelector<HTMLStyleElement>("#dynamic-styles")!;
  $styles.innerHTML += /*css*/ `
    .nav-bar {
      display: flex;
      gap: 2rem;
      justify-content: center;
      align-items: center;
      padding: 1rem;
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
  $navMenu.classList.add("nav-bar")
  /* $navMenu.classList.add(
    "flex-1",
    "flex",
    "flex-col",
    "sm:flex-row",
    "gap-8",
    "sm:justify-center",
    "sm:items-center",
    "sm:backdrop-blur-sm",
    "sm:bg-white/20",
    "h-16",
    "min-h-full",
    "w-full",
    "px-8",
    "pt-8",
    "sm:pt-0"
  ); */

  let html = "";

  menuOptions.forEach((option, i) => {
    html += /*html*/`
      <a
        class="nav-bar flex gap-2 items-center h-full text-white text-lg uppercase border-b-4 sm:hover:border-b-4 border-b-transparent sm:hover:border-b-white transition-colors"
        href="${option.url}"
        >
        ${option.name}
      </a>
    `;
  });

  $navMenu.innerHTML = html;

  return $navMenu;
}
