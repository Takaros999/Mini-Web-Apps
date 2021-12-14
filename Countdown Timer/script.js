let days = document.getElementById('days');
let hours = document.getElementById('hours');
let mins = document.getElementById('mins');
let seconds = document.getElementById('seconds');

let summer = new Date();
summer.setFullYear(2022, 6, 20);
summer.setHours(6, 45, 0);
console.log(summer);

let currTime = new Date();
console.log(currTime);

loadCountdown();

function loadCountdown() {
  const secDiff = Math.round((summer.getTime() - currTime.getTime()) / 1000);
  days.innerHTML = Math.floor(secDiff / 60 / 60 / 24);
  hours.innerHTML = formatTime(Math.floor((secDiff / 60 / 60) % 24));
  mins.innerHTML = formatTime(Math.floor((secDiff / 60) % 60));
  seconds.innerHTML = formatTime(Math.floor(secDiff % 60));
  let newM;
  let newS;
}

function formatTime(time) {
  if (time < 10) {
    return `0${time}`;
  } else {
    return `${time}`;
  }
}

function AutoRefresh(t) {
  setTimeout('location.reload(true);', t);
}
