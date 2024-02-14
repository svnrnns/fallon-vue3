class FallonClassError extends Error {
  constructor(message) {
    super(message);
    this.name = "FallonClassError";
  }
}

class FallonStorageError extends Error {
  constructor(message) {
    super(message);
    this.name = "FallonStorageError";
  }
}

export { FallonClassError, FallonStorageError };
