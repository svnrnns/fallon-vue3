function isObject(obj) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}

function isJSON(str) {
  try {
    const obj = JSON.parse(str);
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
  } catch (error) {
    return false;
  }
}

function parseIfJSON(item) {
  return isJSON(item) ? JSON.parse(item) : item;
}

function isReactive(object) {
  if (typeof obj === "object" && obj !== null) {
    return !!obj["__v_raw"];
  }
}

export { isObject, isJSON, parseIfJSON, isReactive };
