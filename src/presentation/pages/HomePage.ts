import { Avatar } from "../components/shared/Avatar";

export function HomePage(){
  const $containerHome = document.createElement("section");

  $containerHome.innerHTML = /*html*/`
    <h1>Home</h1>
  `;

  $containerHome.appendChild(Avatar({
    urlImg: "/avatar.pg",
    fallback: "Hola mundo",
  }));


  return $containerHome;
}