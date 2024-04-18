var h = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
};
var s = (t, e, r) => (h(t, e, "read from private field"), r ? r.call(t) : e.get(t)), g = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, p = (t, e, r, n) => (h(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r);
import { ref as m, watch as y } from "vue";
class i extends Error {
  constructor(e) {
    super(e), this.name = "FallonClassError";
  }
}
class c extends Error {
  constructor(e) {
    super(e), this.name = "FallonStorageError";
  }
}
function d(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t);
}
function S(t) {
  try {
    const e = JSON.parse(t);
    return typeof e == "object" && e !== null && !Array.isArray(e);
  } catch {
    return !1;
  }
}
function u(t) {
  return S(t) ? JSON.parse(t) : t;
}
var o;
class v {
  constructor(e) {
    g(this, o, void 0);
    e && this.setNamespace(e);
  }
  /**
   * Retrieves the namespace linked to this Fallon instance.
   * @returns {string} The namespace.
   */
  getNamespace() {
    return s(this, o);
  }
  /**
   * Updates the namespace for this Fallon instance.
   * @param {string} namespace - The namespace.
   * @throws {FallonClassError} Throws an error if the param is left empty.
   * @throws {FallonClassError} Throws an error if the param is not of type string.
   */
  setNamespace(e) {
    if (!e)
      throw new i("Namespace variable not provided");
    if (typeof e != "string")
      throw new i("Namespace variable must be of type string");
    p(this, o, e);
  }
  /**
   * Checks whether a key exists or not in the local storage.
   * @param {*} key - The key to check if exists
   * @returns True if exists, false if not
   */
  exists(e) {
    const r = typeof s(this, o) < "u" ? s(this, o) + e : e;
    return localStorage.getItem(r) !== null;
  }
  /**
   * Retrieves the value linked to the given key from the local storage.
   * @param {*} key - The key to look for.
   * @param {boolean} reactive - Indicates whether the function is going to act vue-reactive or not.
   * @throws {FallonStorageError} Throws an error if the key does not exist in the storage.
   * @returns The value. Can be a ref( ) object if reactivity is enabled. If the value is a dictionary-like object, it will be deserialized.
   */
  get(e, r = !1) {
    const n = typeof s(this, o) < "u" ? s(this, o) + e : e, a = localStorage.getItem(n);
    if (a === null)
      throw new c(
        "The key " + n + " does not exists in the local storage"
      );
    if (!r)
      return u(a);
    const l = m(u(a));
    return setInterval(() => {
      const f = localStorage.getItem(n);
      f != l.value && (l.value = u(f));
    }, 100), l;
  }
  /**
   * Sets a value to a key in the local storage. Serializes the data if the value is a dictionary-like object.
   * @param {*} key - The key.
   * @param {*} value - The value.
   * @throws {FallonStorageError} Throws an error if the key is not provided.
   */
  set(e, r) {
    if (!e)
      throw new c("Key value not provided");
    const n = typeof s(this, o) < "u" ? s(this, o) + e : e, a = d(r) ? JSON.stringify(r) : r;
    localStorage.setItem(n, a);
  }
  /**
   * Links a reactive object to a local storage key, so whenever the object updates, the storage value does as well.
   * @param {*} key - The key.
   * @param {*} reactiveObject - A Vue reactive object (ref/computed)
   * @throws {FallonStorageError} Throws an error if the key is not provided.
   * @throws {FallonClassError} Throws an error if the reactiveObject parameter is not a Vue reactive object.
   */
  bind(e, r) {
    if (!e)
      throw new c("Key value not provided");
    if (r == null && typeof r != "object")
      throw new i(
        "Variable must be a Vue reactive object (ref/computed)"
      );
    const n = () => {
      const a = typeof s(this, o) < "u" ? s(this, o) + e : e, l = d(r.value) ? JSON.stringify(r.value) : r.value;
      localStorage.setItem(a, l);
    };
    y(r, () => {
      n();
    });
  }
  /**
   * Removes a key and its value from the local storage.
   * @param {*} key - The key.
   */
  delete(e) {
    localStorage.removeItem(e);
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
o = new WeakMap();
export {
  v as default
};
