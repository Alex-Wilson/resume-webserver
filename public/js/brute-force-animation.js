document.addEventListener("DOMContentLoaded", () => {
  const glitchText = document.querySelector(".glitch-text");

  // Create the base span for typing animation
  const baseText = document.createElement("span");
  baseText.classList.add("base");
  glitchText.appendChild(baseText);

  const targetText = ">alexwilson.info";
  let currentText = ">";

  const randomChar = () =>
    String.fromCharCode(Math.floor(Math.random() * (126 - 32) + 32));

  const typeText = async () => {
    for (let i = 1; i < targetText.length; i++) {
      let randomLetter = randomChar();

      while (randomLetter !== targetText[i]) {
        baseText.textContent = currentText + randomLetter; // Update base text only
        randomLetter = randomChar();
        await new Promise((resolve) => setTimeout(resolve, 15)); // Typing speed
      }

      currentText += targetText[i];
      baseText.textContent = currentText; // Append correct letter
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    // Replace the base text with glitch effect spans
    addGlitchSpans(currentText);
  };

  const addGlitchSpans = (finalText) => {
    // Clear existing content
    glitchText.innerHTML = "";

    // Create the before span
    const beforeSpan = document.createElement("span");
    beforeSpan.textContent = finalText;
    beforeSpan.classList.add("before");

    // Create the after span
    const afterSpan = document.createElement("span");
    afterSpan.textContent = finalText;
    afterSpan.classList.add("after");

    // Append spans for the glitch effect
    glitchText.appendChild(beforeSpan);
    glitchText.append(finalText); // Main visible text
    glitchText.appendChild(afterSpan);

    // Activate glitch animation
    glitchText.classList.add("active");
  };

  typeText(); // Start the typing animation once on page load
});
