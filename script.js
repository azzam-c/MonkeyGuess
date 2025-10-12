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

    output.textContent = "Monkey typing...";
    monkeyGif.style.display = "block";

    simulateTyping(password, output, monkeyGif);
  });
});

function simulateTyping(target, output, monkeyGif) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let attempt = "";
  let count = 0;

  const interval = setInterval(() => {
    attempt = "";
    for (let i = 0; i < target.length; i++) {
      attempt += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    count++;
    output.textContent = `Monkey typed: ${attempt} (Attempt ${count})`;

    if (attempt === target) {
      clearInterval(interval);
      monkeyGif.style.display = "none";
      output.textContent = `🎉 The monkey guessed your password '${target}' in ${count} attempts!`;
    }
  }, 100);
}
