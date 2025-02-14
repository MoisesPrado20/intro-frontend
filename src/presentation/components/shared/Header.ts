import { Logo } from "./Logo";
import { NavMenu } from "./NavMenu";

export function Header() {
  const $styles = document.querySelector<HTMLStyleElement>("#dynamic-styles")!;
  $styles.innerHTML += /*css*/ `
    .header {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      padding: 1rem 2rem;
      background-color: var(--second-color);
    }

    @media (min-width: 768px) {
      .header {
         flex-direction: row;
        justify-content: space-between;
      }
    }
  `;

  const $header = document.createElement("header");
  $header.classList.add("header");


  $header.appendChild(Logo());
  $header.appendChild(NavMenu());

  return $header;
}
