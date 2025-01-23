document.addEventListener("DOMContentLoaded", () => {
  const glitchText = document.querySelector(".glitch-text");

  // Helper to check if glitchText exists
  const isValidElement = (element) => {
    if (!element) {
      console.error("Error: .glitch-text element not found.");
      return false;
    }
    return true;
  };

  // Helper to create a span element
  const createSpan = (text, className) => {
    const span = document.createElement("span");
    span.textContent = text;
    if (className) span.classList.add(className);
    return span;
  };

  // Add spans for glitch effect
  const createGlitchEffect = (container, text) => {
    container.innerHTML = ""; // Clear existing content
    container.appendChild(createSpan(text, "before")); // Before span
    container.appendChild(document.createTextNode(text)); // Main text node
    container.appendChild(createSpan(text, "after")); // After span
    container.classList.add("active"); // Activate glitch animation
  };

  // Typing animation
  const runTypingAnimation = async (container, targetText) => {
    let currentText = ">";
    const baseText = createSpan("", "base");
    container.appendChild(baseText);

    const randomChar = () =>
      String.fromCharCode(Math.floor(Math.random() * (126 - 32) + 32));

    for (let i = 1; i < targetText.length; i++) {
      let randomLetter = randomChar();

      while (randomLetter !== targetText[i]) {
        baseText.textContent = currentText + randomLetter;
        randomLetter = randomChar();
        await delay(37.5); // Typing speed
      }

      currentText += targetText[i];
      baseText.textContent = currentText;
      await delay(75); // Delay between letters
    }

    createGlitchEffect(container, currentText);
  };

  // Helper for delays
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Main execution
  const init = () => {
    if (!isValidElement(glitchText)) return;

    const targetText = ">alexwilson.info";
    if (window.location.pathname === "/") {
      runTypingAnimation(glitchText, targetText);
    } else {
      createGlitchEffect(glitchText, targetText);
    }
  };

  init();
});
