import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    datetimePicker: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {      
      const selectedDate = selectedDates[0].getTime();      
      
      if (selectedDate < Date.now()) {
          window.alert("Please choose a date in the future");
          return;
      }
      refs.startBtn.removeAttribute('disabled');     
  },
};

document.body.style.backgroundColor = 'tomato';
refs.startBtn.setAttribute('disabled', true);

flatpickr("#datetime-picker", options);

refs.startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {    
    const intervalId = setInterval(countDown, 1000)
}

function countDown() {
    const dateToStart = new Date(refs.datetimePicker.value).getTime();
    let deltaTime = dateToStart - Date.now();

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
        
    refs.days.textContent = days;    
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(Date.now()));