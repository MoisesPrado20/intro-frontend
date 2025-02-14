export function ProfileTitle() {
  const $styles = document.querySelector<HTMLStyleElement>("#dynamic-styles")!;
  $styles.innerHTML += /*css*/ `
    .profile-title {
      color: var(--slate-800);
      text-transform: uppercase;
      border-bottom: 2px solid var(--slate-400);
      padding-bottom: 1rem;
    }
  `;
  const $title = document.createElement("h1");
  $title.textContent = "ADchat";
  $title.classList.add("profile-title","text-center");

  return $title;
}