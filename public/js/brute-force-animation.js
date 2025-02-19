document.addEventListener("DOMContentLoaded", () => {
  const glitchText = document.querySelector(".glitch-text");

  const isValidElement = (element) => {
    if (!element) {
      console.error("Error: .glitch-text element not found.");
      return false;
    }
    return true;
  };

  const createSpan = (text, className) => {
    const span = document.createElement("span");
    span.textContent = text;
    if (className) span.classList.add(className);
    return span;
  };

  const createGlitchEffect = (container, text) => {
    container.innerHTML = ""; // Clear existing content
  
    const beforeSpan = createSpan(text, "before");
    const afterSpan = createSpan(text, "after");
  
    container.appendChild(beforeSpan);
    container.appendChild(document.createTextNode(text));
    container.appendChild(afterSpan);
  
    container.classList.add("active");
  };

  const setupClickToggle = (container, text) => {
    let isSSHPrompt = false;

    container.addEventListener("click", (event) => {
      if (window.location.pathname !== "/") {
        event.preventDefault();
        window.location.href = "/";
        return;
      }

      isSSHPrompt = !isSSHPrompt;
      const displayText = isSSHPrompt
        ? ">>Cannot open '/root': PERSMISSION DENIED\n"
        : text;

      createGlitchEffect(container, displayText);

      // Log secret message to console on click after animation
      console.log("Can you find the .onion?");
    });
  };

  const runTypingAnimation = async (container, targetText) => {
    let currentText = "$";
    const baseText = createSpan("", "base");
    container.appendChild(baseText);

    const charPools = targetText.split("").map(() =>
      Array.from({ length: 126 - 32 }, (_, i) => String.fromCharCode(32 + i))
    );

    for (let i = 1; i < targetText.length; i++) {
      const targetChar = targetText[i];
      let pool = charPools[i];
      let randomLetter;

      while (true) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        randomLetter = pool[randomIndex];

        baseText.textContent = currentText + randomLetter;

        if (randomLetter === targetChar) {
          break;
        }

        pool.splice(randomIndex, 1);
        await delay(1);
      }

      currentText += targetChar;
      baseText.textContent = currentText;
      await delay(1);
    }

    createGlitchEffect(container, currentText);
    setupClickToggle(container, currentText);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const init = () => {
    if (!isValidElement(glitchText)) return;

    const targetText = "$alexwilson.info";
    if (window.location.pathname === "/") {
      runTypingAnimation(glitchText, targetText);
    } else {
      createGlitchEffect(glitchText, targetText);
      setupClickToggle(glitchText, targetText);
    }
  };

  init();
});
