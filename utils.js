import { state } from "./state.js";

export const log = (type, msg) => console[type](msg);
export const hop = (key) => state.hasOwnProperty(key);
export const dataExam = (type, data) => typeof data == type;

export const keyCheck = (key) => {
  if (!dataExam("string", key)) {
    log("error", "Key must be a string");
    return false;
  }
  return true;
};

export const variableCheck = (key, shouldExist = true) => {
  if (shouldExist && !hop(key)) {
    log("error", `Variable "${key}" does not exist`);
    return false;
  }
  if (!shouldExist && hop(key)) {
    log("error", `Variable "${key}" already exists`);
    return false;
  }
  return true;
};

export const valueCheck = (value) => {
  if (typeof value === "undefined" || value === null) {
    log("error", "Value cannot be undefined or null");
    return false;
  }
  return true;
};
