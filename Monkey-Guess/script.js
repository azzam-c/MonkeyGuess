<script>
window.addEventListener('DOMContentLoaded', () => {
  // Get references to elements
  const startBtn = document.getElementById('startBtn');
  const passwordInput = document.getElementById('passwordInput');
  const charsetSelect = document.getElementById('charsetSelect');
  const speedInput = document.getElementById('speedInput');
  const modeSelect = document.getElementById('modeSelect');
  const typingLabel = document.getElementById('typingLabel');
  const progressFill = document.getElementById('progressFill');
  const monkeyGif = document.getElementById('monkeyGif');

  // Return charset string based on user selection
  function getCharset(option) {
    switch(option) {
      case "lowercase": return "abcdefghijklmnopqrstuvwxyz";
      case "alphanumeric": return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      case "ascii":
        let chars = "";
        for(let i=32;i<=126;i++) chars += String.fromCharCode(i);
        return chars;
      default: return "abcdefghijklmnopqrstuvwxyz";
    }
  }

  // Generate random string
  function randomString(length, charset) {
    let s = "";
    for(let i=0;i<length;i++) {
      s += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return s;
  }

  // Format time in human readable form
  function humanReadableTime(seconds) {
    const years = Math.floor(seconds / (60*60*24*365));
    seconds %= (60*60*24*365);
    const days = Math.floor(seconds / (60*60*24));
    seconds %= (60*60*24);
    const hours = Math.floor(seconds / (60*60));
    seconds %= (60*60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    let str = "";
    if(years) str += years + " years ";
    if(days) str += days + " days ";
    if(hours) str += hours + " hrs ";
    if(minutes) str += minutes + " mins ";
    str += seconds + " secs";
    return str;
  }

  // Main simulation function
  function startSimulation() {
    const password = passwordInput.value;
    if(!password) { alert("Enter a password!"); return; }

    const charset = getCharset(charsetSelect.value);
    const speed = parseInt(speedInput.value) || 1000;
    const mode = modeSelect.value;

    typingLabel.textContent = "";
    if(progressFill) progressFill.style.width = "0%";

    if(mode === "estimator") {
      const expectedAttempts = Math.pow(charset.length, password.length);
      const expectedSeconds = expectedAttempts / speed;
      typingLabel.textContent = "Expected time: " + humanReadableTime(expectedSeconds);
      if(monkeyGif) monkeyGif.style.display = "none";
      if(progressFill) progressFill.style.width = "100%";
      return;
    }

    // Simulation mode
    let attempts = 0;
    const maxAttempts = 1000000; // safety cap
    if(monkeyGif) monkeyGif.style.display = "inline";

    const interval = setInterval(() => {
      if(attempts >= maxAttempts) {
        clearInterval(interval);
        typingLabel.textContent = "Password not found within cap!";
        if(monkeyGif) monkeyGif.style.display = "none";
        if(progressFill) progressFill.style.width = "100%";
        return;
      }

      const attemptStr = randomString(password.length, charset);
      typingLabel.textContent = attemptStr;
      attempts++;
      if(progressFill) progressFill.style.width = (attempts / maxAttempts * 100) + "%";

      if(attemptStr === password) {
        clearInterval(interval);
        typingLabel.textContent = "Found password: " + password;
        if(monkeyGif) monkeyGif.style.display = "none";
        if(progressFill) progressFill.style.width = "100%";
        alert("Password found in " + attempts + " attempts!");
      }
    }, 50); // change typing speed if you want
  }

  // Attach click listener
  startBtn.addEventListener('click', startSimulation);
});
</script>
