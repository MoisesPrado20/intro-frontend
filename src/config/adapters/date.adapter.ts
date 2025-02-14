export class DateAdapter {
  static formatDateTime(isoString: string): string {
    const date = new Date(isoString);
    const now = new Date();

    // Funciones de ayuda
    const isToday = (d: Date) => d.toDateString() === now.toDateString();
    const isYesterday = (d: Date) => {
      const y = new Date(now);
      y.setDate(y.getDate() - 1);
      return d.toDateString() === y.toDateString();
    };

    if (isToday(date)) {
      // Horario exacto desde la cadena original (HH:MM:SS)
      return isoString.slice(11, 19);
    }

    if (isYesterday(date)) {
      return "Ayer";
    }

    // De lo contrario, fecha local
    return date.toLocaleDateString("es-CL", { timeZone: "America/Santiago" });
  }
}
