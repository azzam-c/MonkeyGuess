document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const resetButton = document.getElementById("resetButton");
  const passwordInput = document.getElementById("passwordInput");
  const attemptOutput = document.getElementById("attemptOutput");
  const theoreticalOutput = document.getElementById("theoreticalOutput");
  const strengthOutput = document.getElementById("strengthOutput");
  const monkeyGif = document.getElementById("monkeyGif");

  let interval = null;
  let timeout = null;

  function formatTheoreticalTime(totalSeconds) {
    let remaining = totalSeconds;

    const years = Math.floor(remaining / (3600*24*365));
    remaining %= 3600*24*365;

    const months = Math.floor(remaining / (3600*24*30));
    remaining %= 3600*24*30;

    const weeks = Math.floor(remaining / (3600*24*7));
    remaining %= 3600*24*7;

    const days = Math.floor(remaining / (3600*24));
    remaining %= 3600*24;

    const hours = Math.floor(remaining / 3600);
    remaining %= 3600;

    const minutes = Math.floor(remaining / 60);
    const seconds = (remaining % 60).toFixed(2);

    let parts = [];
    if (years) parts.push(`${years}y`);
    if (months) parts.push(`${months}m`);
    if (weeks) parts.push(`${weeks}w`);
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);

    return `(Theoretical time: ${parts.join(' ')})`;
  }

  function getPasswordStrength(totalSeconds) {
    if (totalSeconds < 3600) return "⚠️ Consider changing your password, it’s very weak!";
    if (totalSeconds < 3600*24*7*4) return "Medium strength";
    return "✅ Very strong!";
  }

  function startSimulation() {
    const password = passwordInput.value.trim();
    if (!password) {
      attemptOutput.textContent = "Please enter a password first!";
      return;
    }

    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const guessesPerSecond = 1000;

    const expectedAttempts = Math.pow(charset.length, password.length);
    const expectedSeconds = expectedAttempts / guessesPerSecond;

    theoreticalOutput.textContent = formatTheoreticalTime(expectedSeconds);
    strengthOutput.textContent = getPasswordStrength(expectedSeconds);

    startButton.disabled = true;
    monkeyGif.style.display = "block";

    let count = 0;

    interval = setInterval(() => {
      let attempt = "";
      for (let i = 0; i < password.length; i++) {
        attempt += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      count++;
      attemptOutput.textContent = `Attempt #${count}: ${attempt}`;
    }, 50);

    timeout = setTimeout(() => {
      clearInterval(interval);
      interval = null;
      attemptOutput.textContent = `Done! Password: '${password}'`;
      monkeyGif.style.display = "none";
      startButton.disabled = false;
    }, expectedSeconds * 1000);
  }

  startButton.addEventListener("click", startSimulation);

  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") startSimulation();
  });

  resetButton.addEventListener("click", () => {
    if (interval) clearInterval(interval);
    if (timeout) clearTimeout(timeout);
    interval = null;
    timeout = null;
    passwordInput.value = "";
    attemptOutput.textContent = "";
    theoreticalOutput.textContent = "";
    strengthOutput.textContent = "";
    monkeyGif.style.display = "none";
