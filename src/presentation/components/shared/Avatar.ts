
interface AvatarProps { 
  urlImg: string;
  fallback?: string;
}

export function Avatar({ urlImg, fallback }: AvatarProps) {
  const $styles = document.querySelector<HTMLStyleElement>("#dynamic-styles")!;
  $styles.innerHTML += /*css*/ `
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
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
  `;

  const $avatarContainer = document.createElement("div");
  $avatarContainer.classList.add("avatar");

  const $avatar = document.createElement("img");
  $avatar.src = urlImg;
  $avatar.alt = fallback || "Avatar";

  $avatar.onerror = () => {
    $avatarContainer.innerHTML = '';
    const initials = fallback ? fallback.split(' ').map(name => name[0]).join('').toLocaleUpperCase() : "A";
    const $initialsDiv = document.createElement("div");
    $initialsDiv.textContent = initials;
    $initialsDiv.classList.add("avatar-initials");
    $avatarContainer.appendChild($initialsDiv);
  };

  $avatarContainer.appendChild($avatar);

  return $avatarContainer;
}