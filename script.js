document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const passwordInput = document.getElementById("passwordInput");
  const output = document.getElementById("output");
  const monkeyGif = document.getElementById("monkeyGif");

  startButton.addEventListener("click", () => {
    const password = passwordInput.value.trim();
    if (password === "") {
      output.textContent = "Please enter a password first!";
      return;
    }

    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const guessesPerSecond = 1000; // you can adjust

    // Calculate theoretical expected time
    const expectedAttempts = Math.pow(charset.length, password.length);
    const expectedSeconds = expectedAttempts / guessesPerSecond;

    let remaining = expectedSeconds;

    // Convert seconds to years, months, weeks, days
    const years = Math.floor(remaining / (3600*24*365));
    remaining %= 3600*24*365;
    const months = Math.floor(remaining / (3600*24*30));
    remaining %= 3600*24*30;
    const weeks = Math.floor(remaining / (3600*24*7));
    remaining %= 3600*24*7;
    const days = Math.floor(remaining / (3600*24));

    const theoreticalText = `(Theoretical time: ${years} years, ${months} months, ${weeks} weeks, ${days} days)`;

    output.textContent = `🐒 Monkey started typing...\n${theoreticalText}`;
    monkeyGif.style.display = "block";

    // Actual monkey typing simulation
    let attempt = "";
    let count = 0;

    const interval = setInterval(() => {
      attempt = "";
      for (let i = 0; i < password.length; i++) {
        attempt += charset.charAt(Math.floor(Math.random() * charset.length));
      }

      count++;
      output.textContent = `Attempt #${count}: ${attempt}\n${theoreticalText}`;

      if (attempt === password) {
        clearInterval(interval);
        output.textContent = `🎉 The monkey guessed your password '${password}' after ${count.toLocaleString()} attempts!\n${theoreticalText}`;
        monkeyGif.style.display = "none";
      }
    }, 50); // you can adjust speed here
  });
});
