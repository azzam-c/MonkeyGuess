// Calculate theoretical expected time
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
remaining %= 3600*24;

const hours = Math.floor(remaining / 3600);
remaining %= 3600;

const minutes = Math.floor(remaining / 60);
const seconds = Math.floor(remaining % 60);

const theoreticalText = `(Theoretical time: ${years}y ${months}m ${weeks}w ${days}d ${hours}h ${minutes}m ${seconds}s)`;
