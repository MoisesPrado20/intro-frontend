import { Formatter } from "../../../config/helpers";
import { useState } from "../../hooks/core/useState";

type AvatarStyles = {
  width?: string;
  height?: string;
};

interface AvatarProps {
  urlImg: string;
  hasStatus?: boolean;
  fallback?: string;
  avatarStyles?: AvatarStyles;
}

export function Avatar({
  urlImg,
  hasStatus = false,
  fallback,
  avatarStyles = { width: "76px", height: "76px" },
}: AvatarProps) {
  const $styles = document.querySelector<HTMLStyleElement>("#dynamic-styles")!;
  const { width, height } = avatarStyles;

  $styles.innerHTML += /*css*/ `
    .avatar {
      position: relative;
      width: ${width};
      height: ${height};
      border-radius: 50%;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-initials {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      background-color: var(--second-color);
      color: var(--white-color);
    }

    .avatar-status {
      position: absolute;
      bottom: .8rem;
      right: .8rem;
      width: 15%;
      height: 15%;
      border-radius: 50%;
      border: medium solid var(--white-color);
      background-color: var(--emerald-500);
    }
  `;

  const [hasError, setHasError, subscribe] = useState<boolean>(false);

  const $avatarContainer = document.createElement("div");
  $avatarContainer.classList.add("avatar");

  const $avatarStatus = document.createElement("div");
  $avatarStatus.classList.add("avatar-status");
  

  const render = () => {
    $avatarContainer.innerHTML = "";

    if (hasError.value) {
      const fallbackInitials = Formatter.getInitials(fallback!);

      const $initialsDiv = document.createElement("div");
      $initialsDiv.textContent = fallbackInitials;
      $initialsDiv.classList.add("avatar-initials");

      $avatarContainer.appendChild($initialsDiv);
    }

    const $avatar = document.createElement("img");
    $avatar.src = urlImg;
    $avatar.alt = fallback || "Avatar";

    $avatar.onerror = () => {
      setHasError(true);
    };

    $avatarContainer.appendChild($avatar);
    hasStatus && $avatarContainer.appendChild($avatarStatus);
  };

  subscribe(render);
  render();

  return $avatarContainer;
}
