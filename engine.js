import { state } from "./state.js";
import { keyCheck, variableCheck, log } from "./utils.js";

const saveStateToLocalStorage = () =>
  localStorage.setItem("appState", JSON.stringify(state));

const logEvent = (action, key) => log("info", `Action: ${action}, Key: ${key}`);

export const createVariable = (key, value = null) => {
  try {
    if (!keyCheck(key)) return;
    if (!variableCheck(key, false)) return;
    state[key] = value;
    logEvent("create", key);
    saveStateToLocalStorage();
  } catch (error) {
    log("error", `Error creating variable: ${error.message}`);
  }
};

export const deleteVariable = (key) => {
  try {
    if (!keyCheck(key)) return;
    if (!variableCheck(key, true)) return;
    delete state[key];
    logEvent("delete", key);
    saveStateToLocalStorage();
  } catch (error) {
    log("error", `Error deleting variable: ${error.message}`);
  }
};

export const updateVariable = (key, value) => {
  try {
    if (!keyCheck(key)) return;
    if (!variableCheck(key, true)) return;
    state[key] = value;
    logEvent("update", key);
    saveStateToLocalStorage();
  } catch (error) {
    log("error", `Error updating variable: ${error.message}`);
  }
};

export const getVariable = (key) => {
  try {
    if (!keyCheck(key)) return;
    if (!variableCheck(key, true)) return;
    return state[key];
  } catch (error) {
    log("error", `Error getting variable: ${error.message}`);
  }
};

export const getAllKeys = () => Object.keys(state);

export const getAllValues = () => Object.values(state);

export const getAllEntries = () => Object.entries(state);

export const clearAllVars = () => {
  for (const key in state) {
    if (Object.hasOwnProperty.call(state, key)) {
      delete state[key];
    }
  }
  localStorage.removeItem("appState");
};
