import { BryanPage, DiegoPage, HomePage, JonatanPage, JustinPage, LautaroPage, MiguelPage } from "../pages";

export function Router() {
  const $main = document.querySelector<HTMLDivElement>("#main")!;
  $main.classList.add("container","full-screen");

  const { hash } = location;

  $main.innerHTML = "";

  if (!hash || hash === "#/") {
    $main.appendChild(HomePage());
  }

  if (hash === "#/bryan") {
   $main.appendChild(BryanPage());
  }

  if (hash === "#/lautaro") {
    $main.appendChild(LautaroPage());
  }

  if(hash === "#/justin"){
    $main.appendChild(JustinPage());
  }

  if(hash === "#/diego"){
    $main.appendChild(DiegoPage());
  }

  if (hash === "#/jonatan") {
    $main.appendChild(JonatanPage());
  }

  if (hash === "#/miguel") {
    $main.appendChild(MiguelPage());
  }
}
