import { Profile } from "../components/profile";

export function HomePage() {
  const $containerHome = document.createElement("section");

  const $mainChatContainer = document.createElement("section");

  const $chatsContainer = document.createElement("div");
  $chatsContainer.textContent = "Chats";


  $mainChatContainer.appendChild(Profile());
  $mainChatContainer.appendChild($chatsContainer);

  $containerHome.appendChild($mainChatContainer);

  return $containerHome;
}