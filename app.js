import * as engine from "./engine.js";
import * as utils from "./utils.js";
import * as tags from "./tags.js";

const updateStateOutput = () => {
  tags.stateOutput.innerHTML = "";
  const entries = engine.getAllEntries();
  if (entries.length === 0)
    tags.stateOutput.innerHTML = "<p>No variables found.</p>";
  else
    entries.forEach(([key, value]) => {
      const li = document.createElement("li");
      li.textContent = `${key}: ${value}`;
      tags.stateOutput.appendChild(li);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  tags.createBtn.addEventListener("click", () => {
    const key = tags.keyInput.value;
    const value = tags.valueInput.value;
    if (key && value) {
      engine.createVariable(key, value);
      updateStateOutput();
    } else utils.log("error", "Key and value must be provided.");
  });

  tags.updateBtn.addEventListener("click", () => {
    const key = tags.keyInput.value;
    const value = tags.valueInput.value;
    if (key && value) {
      engine.updateVariable(key, value);
      updateStateOutput();
    } else utils.log("error", "Key and value must be provided.");
  });

  tags.deleteBtn.addEventListener("click", () => {
    const key = tags.keyInput.value;
    if (key) {
      engine.deleteVariable(key);
      updateStateOutput();
    } else utils.log("error", "Key must be provided.");
  });

  tags.clearBtn.addEventListener("click", () => {
    engine.clearAllVars();
    updateStateOutput();
  });

  updateStateOutput();
});
