document.addEventListener("DOMContentLoaded", () => {
  // === DOM elements ===
  const startButton = document.getElementById("startButton");
  const passwordInput = document.getElementById("passwordInput");
  const output = document.getElementById("output");
  const monkeyGif = document.getElementById("monkeyGif");

  console.log("script.js loaded successfully ✅");

  // === Character set ===
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // === Monkey typing simulation ===
  function startSimulation() {
    const target = passwordInput.value;
    if (!target) {
      output.textContent = "Please enter a password first!";
      return;
    }

    output.textContent = "🐒 Monkey started typing...";
    let attempt = "";
    let iterations = 0;

    // Show the monkey GIF (optional)
    if (monkeyGif) {
      monkeyGif.style.display = "block";
    }

    // Monkey typing loop
    const interval = setInterval(() => {
      attempt = "";
      for (let i = 0; i < target.length; i++) {
        attempt += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      iterations++;
      output.textContent = `Attempt #${iterations}: ${attempt}`;

      if (attempt === target) {
        clearInterval(interval);
        output.textContent = `🎉 Monkey typed your password after ${iterations.toLocaleString()} attempts!`;

        if (monkeyGif) {
          monkeyGif.style.display = "none";
        }
      }
    }, 50);
  }

  // === Connect button to function ===
  startButton.addEventListener("click", startSimulation);
});
