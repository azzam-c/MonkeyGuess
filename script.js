document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const resetButton = document.getElementById("resetButton");
  const passwordInput = document.getElementById("passwordInput");
  const output = document.getElementById("output");
  const monkeyGif = document.getElementById("monkeyGif");

  let interval = null; // store interval ID globally

  function startSimulation() {
    const password = passwordInput.value.trim();
    if (!password) {
      output.textContent = "Please enter a password first!";
      return;
    }

    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const guessesPerSecond = 1000;

    // Theoretical time
    const expectedAttempts = Math.pow(charset.length, password.length);
    const expectedSeconds = expectedAttempts / guessesPerSecond;

    let remaining = expectedSeconds;
    const years = Math.floor(remaining / (3600*24*365));
    remaining %= 3600*24*365;
    const months = Math.floor(remaining / (3600*24*30));
    remaining %= 3600*24*30;
    const weeks = Math.floor(remaining / (3600*24*7));
    remaining %= 3600*24*7;
    const days = Math.floor(remaining / (3600*24));

    const theoreticalText = `(Theoretical time: ${years} years, ${months} months, ${weeks} weeks, ${days} days)`;

    // Disable start, show GIF
    startButton.disabled = true;
    monkeyGif.style.display = "block";
    output.textContent = `🐒 Monkey started typing...\n${theoreticalText}`;

    let attempt = "";
    let count = 0;

    interval = setInterval(() => {
      attempt = "";
      for (let i = 0; i < password.length; i++) {
        attempt += charset.charAt(Math.floor(Math.random() * charset.length));
      }

      count++;
      output.textContent = `Attempt #${count}: ${attempt}\n${theoreticalText}`;

      if (attempt === password) {
        clearInterval(interval);
        interval = null;
        output.textContent = `🎉 The monkey guessed your password '${password}' after ${count.toLocaleString()} attempts!\n${theoreticalText}`;
        monkeyGif.style.display = "none";
        startButton.disabled = false; // re-enable Start
      }
    }, 50);
  }

  // Start button
  startButton.addEventListener("click", startSimulation);

  // Enter key
  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") startSimulation();
  });

  // Reset button
  resetButton.addEventListener("click", () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    passwordInput.value = "";
    output.textContent = "";
    monkeyGif.style.display = "none";
    startButton.disabled = false;
    passwordInput.focus(); // put cursor back in input
  });
});
