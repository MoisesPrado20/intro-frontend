type StateUpdater<T> = (newValue: T | ((prevState: T) => T)) => void;

/* 
* - 'listerners' Array que almacena funciones de escucha que se ejecutarán cuando el estado cambie.

* - 'proxy' Proxy que intercepta las operaciones de obtención (get) y establecimiento (set) en el objeto 'state'.
*   - 'get':  Intercepta las operaciones de obtención de propiedades. Si la propiedad solicitada es value, 
*     devuelve el valor actual del estado.
*   - 'set': Intercepta las operaciones de establecimiento de propiedades. Si la propiedad establecida es value,
*     actualiza el valor del estado y ejecuta todas las funciones de escucha en listeners.
*/

export function useState<T>(
  initialValue: T
): [{value: T}, StateUpdater<T>, (listener: () => void) => void] {
  const state = { value: initialValue };
  const listeners: (() => void)[] = [];

  const proxy = new Proxy(state, {
    get(target, prop) {
      if (prop === "value") {
        return target.value;
      }
      return undefined;
    },
    set(target, prop, value) {
      if (prop === "value") {
        target.value = value;
        listeners.forEach((listener) => listener());
        return true;
      }
      return false;
    },
  });

  const setState: StateUpdater<T> = (newValue) => {
    const value =
      typeof newValue === "function"
        ? (newValue as (prevState: T) => T)(proxy.value)
        : newValue;

    // Si el nuevo valor es diferente del valor actual, se actualiza el estado a través del proxy, 
    // lo que desencadena la ejecución de las funciones de escucha.
    if (value !== proxy.value) {
      proxy.value = value;
    }
  };

  // Función que acepta una función de escucha (listener) y la agrega al array listeners. Esta función se 
  // ejecutará cada vez que el estado cambie.
  const subscribe = (listener: () => void) => {
    listeners.push(listener);
  };

  return [proxy, setState, subscribe];
}