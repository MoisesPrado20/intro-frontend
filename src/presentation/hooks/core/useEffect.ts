type CleanupFn = () => void;
type EffectFn = () => void | CleanupFn;

/*
* - 'effects':  Array que almacena todas las funciones de efecto.
* - 'cleanups': Array que almacena todas las funciones de limpieza.
* - 'dependencies': Array que almacena todas las dependencias de cada efecto.
*/ 
const effects: EffectFn[] = [];
const cleanups: CleanupFn[] = [];
const dependencies: any[][] = [];

export function useEffect(effect: EffectFn, deps?: any[]) {
  const index = effects.length;

  // Comprobamos si las dependencias han cambiado
  const hasChanged = () => {
    // Si no hay dependencias, siempre ejecuta el efecto.
    if (!deps) return true;
    const prevDeps = dependencies[index];
    // Si hay dependencias, compara las dependencias actuales (deps) con las dependencias anteriores (prevDeps).
    return !prevDeps || !deps.every((dep, i) => dep === prevDeps[i]);
  };


  // Si es la primera vez o las dependencias cambiaron, ejecutamos el efecto
  if (hasChanged()) {
    // Ejecuta la función de limpieza del efecto anterior (si existe).
    const cleanup = effects[index] ? effects[index]() : undefined;
    if (cleanup && typeof cleanup === "function") cleanup();

    effects[index] = effect;
    dependencies[index] = deps || [];

    // Ejecutar el efecto después de la renderización
    setTimeout(() => {
      const cleanup = effect();
      if (cleanup && typeof cleanup === "function") {
        cleanups[index] = cleanup;
      }
    }, 0);
  }
}

// Función para ejecutar manualmente las limpiezas
export function runCleanups() {
  cleanups.forEach((cleanup) => cleanup && cleanup());
}
