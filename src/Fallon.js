import { ref, watch } from "vue";
import { FallonClassError, FallonStorageError } from "./errors";
import { isObject, parseIfJSON } from "./utils";

/*
 * Fallon enhances the storage experiencie in Vue 3.
 */
class Fallon {
  #namespace;

  constructor(namespace) {
    if (namespace) {
      this.setNamespace(namespace);
    }
  }

  /**
   * Retrieves the namespace linked to this Fallon instance.
   * @returns {string} The namespace.
   */
  getNamespace() {
    return this.#namespace;
  }

  /**
   * Updates the namespace for this Fallon instance.
   * @param {string} namespace - The namespace.
   * @throws {FallonClassError} Throws an error if the param is left empty.
   * @throws {FallonClassError} Throws an error if the param is not of type string.
   */
  setNamespace(namespace) {
    if (!namespace) {
      throw new FallonClassError("Namespace variable not provided");
    }
    if (typeof namespace != "string") {
      throw new FallonClassError("Namespace variable must be of type string");
    }
    this.#namespace = namespace;
  }

  /**
   * Checks whether a key exists or not in the local storage.
   * @param {*} key - The key to check if exists
   * @returns True if exists, false if not
   */
  exists(key) {
    const nKey =
      typeof this.#namespace != "undefined" ? this.#namespace + key : key;

    const item = localStorage.getItem(nKey);

    if (item === null) return false;
    else return true;
  }
  /**
   * Retrieves the value linked to the given key from the local storage.
   * @param {*} key - The key to look for.
   * @param {boolean} reactive - Indicates whether the function is going to act vue-reactive or not.
   * @throws {FallonStorageError} Throws an error if the key does not exist in the storage.
   * @returns The value. Can be a ref( ) object if reactivity is enabled. If the value is a dictionary-like object, it will be deserialized.
   */
  get(key, reactive = false) {
    const nKey =
      typeof this.#namespace != "undefined" ? this.#namespace + key : key;

    const item = localStorage.getItem(nKey);

    if (item === null)
      throw new FallonStorageError(
        "The key " + nKey + " does not exists in the local storage"
      );

    if (!reactive) {
      return parseIfJSON(item);
    }

    const reactiveItem = ref(parseIfJSON(item));
    setInterval(() => {
      const checkingValue = localStorage.getItem(nKey);
      if (checkingValue != reactiveItem.value) {
        reactiveItem.value = parseIfJSON(checkingValue);
      }
    }, 100);
    return reactiveItem;
  }

  /**
   * Sets a value to a key in the local storage. Serializes the data if the value is a dictionary-like object.
   * @param {*} key - The key.
   * @param {*} value - The value.
   * @throws {FallonStorageError} Throws an error if the key is not provided.
   */
  set(key, value) {
    if (!key) {
      throw new FallonStorageError("Key value not provided");
    }
    const nKey =
      typeof this.#namespace != "undefined" ? this.#namespace + key : key;
    const nValue = isObject(value) ? JSON.stringify(value) : value;

    localStorage.setItem(nKey, nValue);
  }

  /**
   * Links a reactive object to a local storage key, so whenever the object updates, the storage value does as well.
   * @param {*} key - The key.
   * @param {*} reactiveObject - A Vue reactive object (ref/computed)
   * @throws {FallonStorageError} Throws an error if the key is not provided.
   * @throws {FallonClassError} Throws an error if the reactiveObject parameter is not a Vue reactive object.
   */
  bind(key, reactiveObject) {
    if (!key) {
      throw new FallonStorageError("Key value not provided");
    }
    if (reactiveObject == null && typeof reactiveObject != "object") {
      throw new FallonClassError(
        "Variable must be a Vue reactive object (ref/computed)"
      );
    }

    const writeData = () => {
      const nKey =
        typeof this.#namespace != "undefined" ? this.#namespace + key : key;
      const nValue = isObject(reactiveObject.value)
        ? JSON.stringify(reactiveObject.value)
        : reactiveObject.value;
      localStorage.setItem(nKey, nValue);
    };

    watch(reactiveObject, () => {
      writeData();
    });
  }

  /**
   * Removes a key and its value from the local storage.
   * @param {*} key - The key.
   */
  delete(key) {
    localStorage.removeItem(key);
  }

  /**
   * Dumps the entire local storage. Bye.
   */
  clear() {
    localStorage.clear();
  }

  /**
   * @returns The total length of the local storage.
   */
  length() {
    return localStorage.length;
  }
}

export default Fallon;
