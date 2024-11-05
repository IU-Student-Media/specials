function countdown() {
  let today = new Date();
  // Unix timestamp (ms) for 6 AM EST November 5.
  let election = new Date("Nov 05 2024 07:00 PM EST") // changed to fix daylights savings issue
  let diff = election - today;
  let days = Math.floor(diff / (1000 * 3600 * 24));
  let hours = Math.floor(((diff / (1000 * 3600 * 24)) - days) * 24) - 1;
  let minutes = Math.floor(((((diff / (1000 * 3600 * 24)) - days) * 24) - 1 - hours) * 60);
  let minute = ((((diff / (1000 * 3600 * 24)) - days) * 24) - 1 - hours) * 60;
  let seconds = Math.floor((minute - minutes) * 60);
  if (diff > 0) {
    document.getElementById("countdown-days").textContent = String(days).padStart(2, '0');
    document.getElementById("countdown-hrs").textContent = String(hours).padStart(2, '0');
    document.getElementById("countdown-mins").textContent = String(minutes).padStart(2, '0');
    document.getElementById("countdown-secs").textContent = String(seconds).padStart(2, '0');
  } else {
    document.getElementById("countdown-days").textContent = '00';
    document.getElementById("countdown-hrs").textContent = '00';
    document.getElementById("countdown-mins").textContent = '00';
    document.getElementById("countdown-secs").textContent = '00';
  }
}
setInterval(countdown, 1000);