import {
  BryanPage,
  DiegoPage,
  HomePage,
  JonatanPage,
  JustinPage,
  LautaroPage,
  MiguelPage,
} from "../pages";

export const chatRoute = [

];

export const mainRoutes = [
  {
    name: "Home",
    url: "#/",
    page: HomePage,
  },
  {
    name: "Bryan",
    url: "#/bryan",
    page: BryanPage,
  },
  {
    name: "Lautaro",
    url: "#/lautaro",
    page: LautaroPage,
  },
  {
    name: "Justin",
    url: "#/justin",
    page: JustinPage,
  },
  {
    name: "Diego",
    url: "#/diego",
    page: DiegoPage,
  },
  {
    name: "Jonatan",
    url: "#/jonatan",
    page: JonatanPage,
  },
  {
    name: "Miguel",
    url: "#/miguel",
    page: MiguelPage,
  },
  ...chatRoute,
];

export function Router() {
  const $main = document.querySelector<HTMLDivElement>("#main")!;
  $main.classList.add("container", "full-screen");

  const { hash } = location;

  $main.innerHTML = "";

  const page = mainRoutes.find((page) => page.url === hash);

  page ? $main.appendChild(page.page()) : $main.appendChild(HomePage());
}
