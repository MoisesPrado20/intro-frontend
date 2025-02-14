import { useProfile, useUserStatuses } from "../../hooks/user";

import { Avatar, Input, Select } from "../shared";
import { ProfileTitle } from "./ProfileTitle";

import { StatusProfile } from "../../../domain/entities";

export function Profile() {
  const $styles = document.querySelector<HTMLStyleElement>("#dynamic-styles")!;
  $styles.innerHTML += /*css*/ `
    .profile{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
    }


    .profile-select-status{
      border-radius: 5px;
      background-color: var(--emerald-300);
      color: var(--emerald-700);
    }

    .profile-user-name{
      font-size: 2rem;
      color: var(--slate-800);
    }

     .profile-input-search{
      border-radius: 5px;
      background-color: var(--slate-200);
    }
  `;

  const { profile, subscribeProfile } = useProfile();
  const { userStatuses, subscribeUserStatuses } = useUserStatuses();

  const $profileContainer = document.createElement("div");

  $profileContainer.appendChild(ProfileTitle());

  const $profile = document.createElement("section");
  $profile.classList.add("profile");
  $profileContainer.appendChild($profile);

  const render = () => {
    $profile.innerHTML = "";

    $profile.appendChild(
      Avatar({
        urlImg: profile.value.avatar,
        hasStatus: StatusProfile.ONLINE === profile.value.status,
        fallback: `${profile.value.firstName} ${profile.value.lastName}`,
        avatarStyles: { width: "190px", height: "190px" },
      })
    );

    $profile.appendChild(
      Select({
        className: "profile-select-status",
        defaultValue: String(profile.value.statusId),
        selectTitle: "estado usuario",
        options: userStatuses.value.map((status) => ({
          value: status.id,
          label: status.name,
        })),
        onChange: (value) => {
          console.log(value);
        },
        icon: "chevron-down",
      })
    );

    const $userName = document.createElement("h1");
    $userName.textContent = `${profile.value.firstName} ${profile.value.lastName}`;
    $userName.classList.add("profile-user-name");
    $profile.appendChild($userName);

    $profile.appendChild(
      Input({
        className: "profile-input-search",
        type: "text",
        onChange: (e) => {
          console.log(e);
        },
        placeholder: "Busca un chat",
        icon: "search",
      })
    );
  };

  subscribeProfile(render);
  subscribeUserStatuses(render);

  return $profileContainer;
}
