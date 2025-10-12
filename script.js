document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const startButton = document.getElementById("startButton");
  const resetButton = document.getElementById("resetButton");
  const passwordInput = document.getElementById("passwordInput");
  const attemptOutput = document.getElementById("attemptOutput");
  const theoreticalOutput = document.getElementById("theoreticalOutput");
  const strengthOutput = document.getElementById("strengthOutput");
  const monkeyGif = document.getElementById("monkeyGif");

  let interval = null;
  let timeout = null;

  // Format expected time to readable string with decimals for seconds
  function formatTheoreticalTime(totalSeconds) {
    let remaining = totalSeconds;

    const years = Math.floor(remaining / (3600 * 24 * 365));
    remaining %= 3600 * 24 * 365;

    const months = Math.floor(remaining / (3600 * 24 * 30));
    remaining %= 3600 * 24 * 30;

    const weeks = Math.floor(remaining / (3600 * 24 * 7));
    remaining %= 3600 * 24 * 7;

    const days = Math.floor(remaining / (3600 * 24));
    remaining %= 3600 * 24;

    const hours = Math.floor(remaining / 3600);
    remaining %= 3600;

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining.toFixed
