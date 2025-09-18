console.log("calculator JS loaded")


// Get display
const display = document.getElementById("display");

// Get all buttons
const buttons = document.querySelectorAll("button");

// Loop through buttons
buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains ("clear")) {
      // Clear display
      display.value = "";
    } else if (button.textContent==="=") {
      try {
        // Calculate the expression
        display.value = eval(display.value);
      } catch {
        display.value = "Error";
      }
    } else {
      // Add button text to display
      display.value += button.textContent;
    }
  });
});