// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const startButton = document.getElementById("startButton");
  const resetButton = document.getElementById("resetButton");
  const passwordInput = document.getElementById("passwordInput");
  const attemptOutput = document.getElementById("attemptOutput");
  const theoreticalOutput = document.getElementById("theoreticalOutput");
  const strengthOutput = document.getElementById("strengthOutput");
  const monkeyGif = document.getElementById("monkeyGif");

  // Timers
  let intervalId = null;
  let stopId = null;

  // Use printable ASCII as the monkey's keyboard
  const ASCII_PRINTABLE =
    ` !"` + `#$%&'()*+,-./0123456789:;<=>?@` +
    `ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`` +
    `abcdefghijklmnopqrstuvwxyz{|}~`;

  // ---- Helpers -------------------------------------------------------------

  function clearTimers() {
    if (intervalId) clearInterval(intervalId);
    if (stopId) clearTimeout(stopId);
    intervalId = null;
    stopId = null;
  }

  // Random guess of fixed length from the pool
  function randomGuess(len, pool = ASCII_PRINTABLE) {
    let s = "";
    const n = pool.length;
    for (let i = 0; i < len; i++) {
      s += pool[Math.floor(Math.random() * n)];
    }
    return s;
  }

  // Format a (possibly huge) combinations count as scientific notation
  function formatCombos(poolSize, length) {
    const log10 = length * Math.log10(poolSize);
    const exp = Math.floor(log10);
    const mantissa = Math.pow(10, log10 - exp);
    return `${mantissa.toFixed(2)} × 10^${exp}`;
  }

  // Human-friendly duration; keep seconds with 2 decimals
  function formatDuration(totalSeconds) {
    let remaining = Math.max(0, Number(totalSeconds) || 0);

    const years = Math.floor(remaining / (3600 * 24 * 365));
    remaining -= years * 3600 * 24 * 365;

    const months = Math.floor(remaining / (3600 * 24 * 30));
    remaining -= months * 3600 * 24 * 30;

    const weeks = Math.floor(remaining / (3600 * 24 * 7));
    remaining -= weeks * 3600 * 24 * 7;

    const days = Math.floor(remaining / (3600 * 24));
    remaining -= days * 3600 * 24;

    const hours = Math.floor(remaining / 3600);
    remaining -= hours * 3600;

    const minutes = Math.floor(remaining / 60);
    remaining -= minutes * 60;

    const seconds = remaining.toFixed(2);

    const parts = [];
    if (years) parts.push(`${years} year${years !== 1 ? "s" : ""}`);
    if (months) parts.push(`${months} month${months !== 1 ? "s" : ""}`);
    if (weeks) parts.push(`${weeks} week${weeks !== 1 ? "s" : ""}`);
    if (days) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
    if (hours) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
    if (minutes) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
    parts.push(`${seconds} seconds`);

    // Keep it readable (first 3 largest units + seconds)
    return parts.slice(0, 3).join(", ") + (parts.length > 3 ? ", ..." : "");
  }

  function classifyStrength(bits) {
    if (bits < 40) return "Strength: weak (aim for 60+ bits)";
    if (bits < 60) return "Strength: okay (try 10–12+ chars)";
    if (bits < 80) return "Strength: good";
    if (bits < 100) return "Strength: strong";
    return "Strength: excellent";
  }

  // Core math: pool^L possibilities; average attempts ~ (N + 1) / 2
  function computeStats(password) {
    const L = password.length;
    const poolSize = ASCII_PRINTABLE.length;

    // Entropy and combinations in log-space to avoid overflow
    const log2N = L * Math.log2(poolSize);
    const log10N = L * Math.log10(poolSize);

    // Expected attempts ~ N/2  => log2(N/2) = log2N - 1
    const guessesPerSecond = 5; // tweak if you like
    const expectedSeconds = Math.pow(2, Math.max(0, log2N - 1)) / guessesPerSecond;

    return {
      L,
      poolSize,
      log2N,
      log10N,
      expectedSeconds,
      guessesPerSecond
    };
  }

  // ---- UI actions ----------------------------------------------------------

  startButton.addEventListener("click", () => {
    clearTimers();

    const pwd = passwordInput.value || "";
    if (!pwd.length) {
      attemptOutput.textContent = "Please enter a password first.";
      theoreticalOutput.textContent = "";
      strengthOutput.textContent = "";
      return;
    }

    // Show the monkey!
    monkeyGif.style.display = "block";

    // Compute stats and print theoretical results
    const stats = computeStats(pwd);

    theoreticalOutput.textContent =
      `Characters on keyboard: ${stats.poolSize}\n` +
      `Password length: ${stats.L}\n` +
      `Combinations: ≈ ${formatCombos(stats.poolSize, stats.L)}\n` +
      `Entropy: ${stats.log2N.toFixed(1)} bits\n` +
      `Average time at ${stats.guessesPerSecond}/sec: ${formatDuration(stats.expectedSeconds)}`;

    strengthOutput.textContent = classifyStrength(stats.log2N);

    // Animate attempts (purely for fun)
    let attempts = 0;
    intervalId = setInterval(() => {
      attempts++;
      const guess = randomGuess(pwd.length);
      attemptOutput.textContent =
        `Attempt ${attempts.toLocaleString()}:\n${guess}`;
    }, 100);

    // Stop the animation after a few seconds (or keep going if you want)
    stopId = setTimeout(() => {
      clearTimers();
      attemptOutput.textContent +=
        `\n\n(We’ll be here a while… On average it would take ${formatDuration(stats.expectedSeconds)} to hit “${pwd}”.)`;
    }, 8000);
  });

  resetButton.addEventListener("click", () => {
    clearTimers();
    monkeyGif.style.display = "none";
    passwordInput.value = "";
    attemptOutput.textContent = "";
    theoreticalOutput.textContent = "";
    strengthOutput.textContent = "";
  });
});
