import flatpickr from 'flatpickr';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
import iziToast from 'izitoast';
import iconSvg from '../img/allert.svg';

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
    const timePreiodArray = convertMs(timePreiod);
    const { days, hours, minutes, seconds } = timePreiodArray;
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
    if (
      timePreiod <= 0 ||
      (days === 0 && hours === 0 && minutes === 0 && seconds === 0)
    ) {
      clearInterval(playCountDown);
      calendarField.disabled = false;
      iziToast.show({
        message: 'Done!',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        iconColor: '#FAFAFB',
        title: 'OK',
        titleColor: '#fff',
      });
      return;
    }
  }, 1000);
}

const options = {
  locale: Ukrainian,
  dateFormat: 'Y-m-d H:i',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const unixDate = new Date(selectedDates[0]).getTime();
    if (unixDate < Date.now()) {
      console.log('Ти обрав минуле! Але його вже не повернути. Не оглядайся!');
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        position: 'topRight',
        iconUrl: iconSvg,
        iconColor: '#FAFAFB',
        title: 'Error',
        titleColor: '#fff',
      });
      startButton.disabled = true;
      return;
    }
    startButton.disabled = false;
    userSelectedDate = unixDate;
  },
  onChange(selectedDates) {
    const verifyDate = new Date(selectedDates[0]).getTime();
    if (verifyDate < Date.now()) {
      console.log('Ти обрав минуле! Але його вже не повернути. Не оглядайся!');
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        iconUrl: iconSvg,
        iconColor: '#FAFAFB',
        title: 'Error',
        titleColor: '#fff',
      });
      startButton.disabled = true;
      selectedDates.length = 0;
      return;
    }
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
