export function Logo() {  
  const $styles = document.querySelector<HTMLStyleElement>("#dynamic-styles")!;
  $styles.innerHTML += /*css*/`
  .logo {
    display: flex;
    gap: 1rem;
  }
  `;

  const $logo = document.createElement("div");
  $logo.classList.add("logo");

  const $logoTS = document.createElement("img");
  $logoTS.src = `typescript.svg`;
  $logoTS.alt = "Logo TypeScript";
  $logoTS.classList.add("pr-6");

  const $logoVite = document.createElement("img");
  $logoVite.src = `vite.svg`;
  $logoVite.alt = "Logo Vite";

  $logo.appendChild($logoTS);
  $logo.appendChild($logoVite);

  return $logo;
}