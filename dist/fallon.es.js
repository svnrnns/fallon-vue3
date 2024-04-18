var f = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
};
var s = (t, e, r) => (f(t, e, "read from private field"), r ? r.call(t) : e.get(t)), h = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, g = (t, e, r, o) => (f(t, e, "write to private field"), o ? o.call(t, r) : e.set(t, r), r);
import { ref as d, watch as m } from "vue";
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
function p(t) {
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
var a;
class N {
  constructor(e) {
    h(this, a, void 0);
    e && this.setNamespace(e);
  }
  /**
   * Retrieves the namespace linked to this Fallon instance.
   * @returns {string} The namespace.
   */
  getNamespace() {
    return s(this, a);
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
    g(this, a, e);
  }
  /**
   * Retrieves the value linked to the given key from the local storage.
   * @param {*} key - The key to look for.
   * @param {boolean} reactive - Indicates whether the function is going to act vue-reactive or not.
   * @throws {FallonStorageError} Throws an error if the key does not exist in the storage.
   * @returns The value. Can be a ref( ) object if reactivity is enabled. If the value is a dictionary-like object, it will be deserialized.
   */
  get(e, r = !1) {
    const o = localStorage.getItem(e);
    if (o === null)
      throw new c(
        "The key does not exists in the local storage"
      );
    if (!r)
      return u(o);
    const n = d(u(o));
    return setInterval(() => {
      const l = localStorage.getItem(e);
      l != n.value && (n.value = u(l));
    }, 100), n;
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
    const o = typeof s(this, a) < "u" ? s(this, a) + e : e, n = p(r) ? JSON.stringify(r) : r;
    localStorage.setItem(o, n);
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
    const o = () => {
      const n = typeof s(this, a) < "u" ? s(this, a) + e : e, l = p(r.value) ? JSON.stringify(r.value) : r.value;
      localStorage.setItem(n, l);
    };
    m(r, () => {
      o();
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
a = new WeakMap();
export {
  N as default
};
