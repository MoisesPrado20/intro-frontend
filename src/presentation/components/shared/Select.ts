type SelectOption = {
  value: string;
  label: string;
};

interface InputProps {
  options: SelectOption[];
  selectTitle?: string;
  icon?: string;
  selectedIcon?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  className?: string | string[];
  style?: Partial<CSSStyleDeclaration>;
  optionClassName?: string | string[];
  optionStyle?: Partial<CSSStyleDeclaration>;
}

export function Select({
  options,
  selectTitle,
  icon,
  selectedIcon = "check",
  defaultValue,
  onChange,
  className,
  style,
  optionClassName,
  optionStyle,
}: InputProps) {
  const $styles = document.querySelector<HTMLStyleElement>("#dynamic-styles")!;
  $styles.innerHTML += /*css*/ `
    .select-container{
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 60%;
    }

    .select {
      padding: .8rem 1rem;
      font-size: 1.2rem;
      outline: none;
      width: 100%;
      border: none;
      text-transform: capitalize;
      font-weight: 700;
      cursor: pointer;
    }

    .select-options {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: var(--white-color);
      border: 2px solid var(--slate-200);
      display: none;
      z-index: 10;
    }

    .select-options-title {
      font-size: 1.1rem;
      font-weight: bold;
      color: var(--slate-900);
      padding: 0.8rem 1rem;
      text-transform: capitalize;
      user-select: none;
    }

    .select-option{
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 1rem;
      font-size: 1.1rem;
      color: var(--slate-700);
      cursor: pointer;
      transition: background 0.2s ease-in-out;
      text-transform: capitalize;
    }

    .select-option:hover {
      background-color: var(--slate-100);
      color: var(--slate-900);
    }

    .select-container.active .select-options {
      display: block;
    }

    .select-icon{
      position: absolute;
      right: 0.8rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      font-size: 1.5rem;
    }

    .selected-icon {
      font-size: 1.2rem;
      color: var(--slate-700);
      visibility: hidden;
    }

    .select-option.selected .selected-icon {
      visibility: visible;
    }
  `;

  const $selectContainer = document.createElement("div");
  $selectContainer.classList.add("select-container");
  if (className) {
    const customClasses = Array.isArray(className) ? className : [className];
    $selectContainer.classList.add(...customClasses);
  }

  const $select = document.createElement("div");
  $select.classList.add("select");
  $select.textContent = selectTitle || "Seleccionar";

  if (style) Object.assign($select.style, style);

  const $optionsContainer = document.createElement("div");
  $optionsContainer.classList.add("select-options");

  if (selectTitle) {
    const $title = document.createElement("div");
    $title.classList.add("select-options-title");
    $title.textContent = selectTitle;
    $optionsContainer.appendChild($title);
  }

  let selectedOption: HTMLElement | null = null;

  const $selectFragment = document.createDocumentFragment();
  options.forEach(({ value, label }) => {
    const $option = document.createElement("div");
    $option.classList.add("select-option");
    $option.dataset.value = value;

    if (optionClassName) {
      const customOptionClasses = Array.isArray(optionClassName)
        ? optionClassName
        : [optionClassName];
      $option.classList.add(...customOptionClasses);
    }

    if (optionStyle) Object.assign($option.style, optionStyle);

    const $icon = document.createElement("i");
    $icon.classList.add("bx", `bx-${selectedIcon}`, "selected-icon");

    const $text = document.createElement("span");
    $text.textContent = label;

    $option.appendChild($icon);
    $option.appendChild($text);
    if (defaultValue && value === defaultValue) {
      $option.classList.add("selected");
      selectedOption = $option;
      $select.textContent = label;
    }

    $option.addEventListener("click", () => {
      if (selectedOption) selectedOption.classList.remove("selected");

      $option.classList.add("selected");
      selectedOption = $option;

      $select.textContent = label;
      onChange(value);
      $selectContainer.classList.remove("active");
    });

    $selectFragment.appendChild($option);
  });
  $optionsContainer.appendChild($selectFragment);

  $select.addEventListener("click", () => {
    $selectContainer.classList.toggle("active");
  });

  $selectContainer.appendChild($select);
  $selectContainer.appendChild($optionsContainer);

  if (icon) {
    const $icon = document.createElement("i");
    $icon.classList.add("bx", `bx-${icon}`, "select-icon");

    $selectContainer.appendChild($icon);
  }

  return $selectContainer;
}
