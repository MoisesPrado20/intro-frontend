export class Formatter {
  static getInitials(text: string): string {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  }

  static normalizeText(text: string): string {
     return text
       .normalize("NFD")
       .replace(/[\u0300-\u036f]/g, "")
       .toLocaleLowerCase();
  }
}
