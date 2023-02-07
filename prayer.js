"use strict";
console.log(
  navigator.geolocation.getCurrentPosition((success, error) => {
    if (error) {
      console.log("Error occurred, fix up");
      return;
    }
    const { latitude, longitude } = success.coords;
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    console.log({ latitude, longitude });

    fetch(
      `https://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=15&month=${currentMonth}&year=${currentYear}`
    )
      .then((res) => res.json())
      .then(({ data }) => {
        const displayLists = document.querySelector(".display-items");
        data.forEach((day) => {
          const ul = document.createElement("ul");
          const p = document.createElement("p");
          p.innerText = day.date.readable;
          ul.appendChild(p);

          Object.entries(day.timings).forEach(([key, value]) => {
            const check = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
            if (check.includes(key)) {
              const li = document.createElement("li");
              li.innerText = `${key}: ${value}`;
              ul.appendChild(li);
            }
          });
          displayLists.appendChild(ul);
        });
      });
  })
);