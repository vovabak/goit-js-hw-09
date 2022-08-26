import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {    
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

let selectedDate = 0;
let deltaTime = 0;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {      
        selectedDate = selectedDates[0].getTime();      
        deltaTime = selectedDate - Date.now();

        if (selectedDate < Date.now()) {
            Notiflix.Notify.warning('Please choose a date in the future',
                {
                    timeout: 4000,
                    position: 'center-top',
                    distance: '20px',
                    fontSize: '21px',
                }         
            );
            return;
        }
        refs.startBtn.disabled = false;
        updateInputValue();
    },
    onValueUpdate() {
        clearInterval(intervalId);
    },
};

flatpickr("#datetime-picker", options);

refs.startBtn.addEventListener('click', onStartBtn);


function onStartBtn() {    
    intervalId = setInterval(countDown, 1000);
    refs.startBtn.disabled = true;    
}

function countDown() {    
    deltaTime = selectedDate - Date.now();

    if (deltaTime < 11000) {
        refs.seconds.classList.add('js-notify');        
        refs.seconds.nextElementSibling.classList.add('js-notify');
    }

    if (deltaTime < 0) {
        Notiflix.Report.info('Day "D"', 'Your time is out', 'Ok',
            () => {
                refs.seconds.classList.remove('js-notify');
                refs.seconds.nextElementSibling.classList.remove('js-notify');
            },
            {
                titleFontSize: '25px',
                messageFontSize: '18px',                
            },            
        );     
        
        clearInterval(intervalId);        
        return;
    }

    updateInputValue();
};

function updateInputValue() {
    
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}

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
};