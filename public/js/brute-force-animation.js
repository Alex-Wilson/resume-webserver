document.addEventListener("DOMContentLoaded", () => {
  const glitchText = document.querySelector(".glitch-text");

  if (!glitchText) {
    console.error("Error: .glitch-text element not found.");
    return;
  }

  const targetText = ">alexwilson.info";

  const createGlitchSpans = (text) => {
    // Clear existing content
    glitchText.innerHTML = "";

    // Create the before span
    const beforeSpan = document.createElement("span");
    beforeSpan.textContent = text;
    beforeSpan.classList.add("before");

    // Create the after span
    const afterSpan = document.createElement("span");
    afterSpan.textContent = text;
    afterSpan.classList.add("after");

    // Append spans for the glitch effect
    glitchText.appendChild(beforeSpan);
    glitchText.append(text); // Main visible text
    glitchText.appendChild(afterSpan);

    // Activate glitch animation
    glitchText.classList.add("active");
  };

  const typeText = async () => {
    let currentText = ">";
    const baseText = document.createElement("span");
    baseText.classList.add("base");
    glitchText.appendChild(baseText);

    const randomChar = () =>
      String.fromCharCode(Math.floor(Math.random() * (126 - 32) + 32));

    for (let i = 1; i < targetText.length; i++) {
      let randomLetter = randomChar();

      while (randomLetter !== targetText[i]) {
        baseText.textContent = currentText + randomLetter; // Update base text only
        randomLetter = randomChar();
        await new Promise((resolve) => setTimeout(resolve, 37.5)); // Typing speed
      }

      currentText += targetText[i];
      baseText.textContent = currentText; // Append correct letter
      await new Promise((resolve) => setTimeout(resolve, 75));
    }

    // Replace the base text with glitch effect spans
    createGlitchSpans(currentText);
  };

  // Check the current path
  if (window.location.pathname === "/") {
    // Homepage: Play the typing animation
    typeText();
  } else {
    // Other pages: Directly show glitch effect
    createGlitchSpans(targetText);
  }
});
