interface InputProps {
  type: "text" | "search" | "number";
  name?: string;
  value?: string;
  placeholder: string;
  icon?: string;
  onChange: (e: Event) => void;
  onEnter?: (e: KeyboardEvent) => void;
  className?: string | string[];
  style?: Partial<CSSStyleDeclaration>;
}

export function Input({
  type,
  name,
  value,
  placeholder,
  icon,
  onChange,
  onEnter,
  className,
  style,
}: InputProps) {
  const $styles = document.querySelector<HTMLStyleElement>("#dynamic-styles")!;
  $styles.innerHTML += /*css*/ `
      .input-container{
        position: relative;
        display: inline-flex;
        align-items: center;
        width: 100%;
        border: 2px solid var(--slate-200);
      }

      .input {
        padding: 1rem;
        font-size: 1rem;
        outline: none;
        color: var(--slate-800);
        width: 100%;
        border: none;
      }

      .input::placeholder {
        color: var(--slate-400);
      }

      .input-icon{
        position: absolute;
        right: .5rem;
        color: var(--slate-400);
        font-size: 1.5rem;
        cursor: pointer;
      }
  `;

  const $inputContainer = document.createElement("div");
  $inputContainer.classList.add("input-container");

  const $input = document.createElement("input");
  $input.type = type;
  $input.name = name || "";
  $input.value = value || "";
  $input.placeholder = placeholder;

  $input.addEventListener("input", onChange);
  $input.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter" && onEnter) onEnter(e);
  });

  $input.classList.add("input");
  if (className) {
    const customClasses =  Array.isArray(className) ? className : [className];

    $inputContainer.classList.add(...customClasses);
    $input.classList.add(...customClasses);
  }
  if (style) Object.assign($input.style, style);

  $inputContainer.appendChild($input);

  if (icon) {
    const $icon = document.createElement("i");
    $icon.classList.add("bx", `bx-${icon}`, "input-icon");

    $inputContainer.appendChild($icon);
  }

  return $inputContainer;
}
