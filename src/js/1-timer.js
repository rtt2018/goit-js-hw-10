import flatpickr from 'flatpickr';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
import iziToast from 'izitoast';

let userSelectedDate;
const startButton = document.querySelector('.button-start');
const calendarField = document.getElementById('datetime-picker');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

startButton.addEventListener('click', startCountDown);

function startCountDown() {
  startButton.disabled = true;
  calendarField.disabled = true;

  const playCountDown = setInterval(() => {
    const timePreiod = userSelectedDate - Date.now();
    if (timePreiod < 0) {
      clearInterval(playCountDown);
      calendarField.disabled = false;
      return;
    }
    const timePreiodArray = convertMs(timePreiod);
    console.log('playCountDown  timePreiodArray:', timePreiodArray);
    const { days, hours, minutes, seconds } = timePreiodArray;
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
  }, 1000);
}

const options = {
  locale: Ukrainian,
  dateFormat: 'd F Y H:i',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const unixDate = new Date(selectedDates[0]).getTime();
    if (unixDate < Date.now()) {
      console.log('Ти обрав минуле!');
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        iconUrl: '../img/allert.svg',
        iconColor: '#FAFAFB',
        title: 'Error',
        titleColor: '#fff',
        borderRadius: '4px',
      });
      startButton.disabled = true;
      return;
    }
    startButton.disabled = false;
    userSelectedDate = unixDate;
  },
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return value.toString().length === 1
    ? value.toString().padStart(2, 0)
    : value.toString();
}

const calendar = flatpickr('#datetime-picker', options);
