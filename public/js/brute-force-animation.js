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
    container.style.minHeight = "250px"; // Prevents height collapse
    container.innerHTML = ""; // Clear existing content
  
    // Create the before and after spans
    const beforeSpan = createSpan(text, "before");
    const afterSpan = createSpan(text, "after");
  
    // Append spans for glitch effect
    container.appendChild(beforeSpan);
    container.appendChild(document.createTextNode(text)); // Main visible text
    container.appendChild(afterSpan);
  
    container.classList.add("active"); // Activate glitch animation
  };

  const generateHash = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const setupClickToggle = async (container, text) => {
    const hash = await generateHash(text); // Generate hash once
    let isHashVisible = false;
  
    container.addEventListener("click", (event) => {
      console.log("SHA-256 Hash:", hash); // Log hash to console
  
      if (window.location.pathname !== "/") {
        event.preventDefault(); // Prevent any unwanted changes
        window.location.href = "/"; // Redirect to root
        return;
      }
  
      // Only toggle display if already on the root page
      isHashVisible = !isHashVisible;
      const displayText = isHashVisible ? hash : text;
      createGlitchEffect(container, displayText);
    });
  };
  
  const runTypingAnimation = async (container, targetText) => {
    let currentText = "$";
    const baseText = createSpan("", "base");
    container.appendChild(baseText);

    // Initialize character pools for each position
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
          break; // Correct character guessed
        }

        pool.splice(randomIndex, 1); // Remove incorrect character from pool
        await delay(1); // Typing speed
      }

      currentText += targetChar;
      baseText.textContent = currentText; // Update current text
      await delay(1); // Delay between letters
    }

    createGlitchEffect(container, currentText);
    setupClickToggle(container, currentText); // Enable click toggling
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const init = () => {
    if (!isValidElement(glitchText)) return;

    const targetText = "$alexwilson.info";
    if (window.location.pathname === "/") {
      runTypingAnimation(glitchText, targetText);
    } else {
      createGlitchEffect(glitchText, targetText);
      setupClickToggle(glitchText, targetText); // Enable click toggling
    }
  };

  init();
});
