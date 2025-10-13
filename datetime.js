document.addEventListener('DOMContentLoaded', () => {
  const dateTimeBlock = document.getElementById('dateTimeBlock');

  function updateDateTime() {
    const now = new Date();

    const months = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];

    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formatted = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
    dateTimeBlock.textContent = formatted;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
});
