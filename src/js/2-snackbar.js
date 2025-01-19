import iziToast from 'izitoast';
import iconSvgError from '../img/allert.svg';
import iconSvgOk from '../img/ok.svg';
import iconSvgWarning from '../img/warning.svg';
import iconSvgBell from '../img/bell.svg';

// Константи

const promiseForm = document.querySelector('.form');
promiseForm.setAttribute('novalidate', '');

const helloMessageArg = {
  message: 'Welcome!',
  messageColor: '#fff',
  title: 'Hello',
  titleColor: '#fff',
  backgroundColor: '#09f',
  progressBarColor: '#0071bd',
  position: 'topRight',
  iconUrl: iconSvgBell,
  onOpened: function () {
    const progressBarGreen = document.querySelector('.iziToast-progressbar');
    progressBarGreen.setAttribute('style', 'border-color: #b8e3ff;');
  },
};

const importantDataMessageArgs = {
  message: 'You forgot to enter important data',
  messageColor: '#fff',
  title: 'Caution',
  titleColor: '#fff',
  backgroundColor: '#ffa000',
  progressBarColor: '#bb7b10',
  position: 'topRight',
  iconUrl: iconSvgWarning,
};

const negativeValueDelayMessage = {
  message: 'Передбачено! Введи коректне число!',
  messageColor: '#fff',
  title: 'Caution',
  titleColor: '#fff',
  backgroundColor: '#ffa000',
  progressBarColor: '#bb7b10',
  position: 'topRight',
  iconUrl: iconSvgWarning,
};

const zeroValueDelayMessage = {
  message: 'Передбачено! Введи коректне число!',
  messageColor: '#fff',
  title: 'Caution',
  titleColor: '#fff',
  backgroundColor: '#ffa000',
  progressBarColor: '#bb7b10',
  position: 'topRight',
  iconUrl: iconSvgWarning,
};

const fractionValueDelayMessage = {
  message: 'Передбачено! Введи коректне число!',
  messageColor: '#fff',
  title: 'Caution',
  titleColor: '#fff',
  backgroundColor: '#ffa000',
  progressBarColor: '#bb7b10',
  position: 'topRight',
  iconUrl: iconSvgWarning,
};

const promiseTypeUndefinedMessage = {
  message: 'You forgot to enter important data',
  messageColor: '#fff',
  title: 'Caution',
  titleColor: '#fff',
  backgroundColor: '#ffa000',
  progressBarColor: '#bb7b10',
  position: 'topRight',
  iconUrl: iconSvgWarning,
};

const promiseFillfilledMessage = {
  title: 'OK',
  titleColor: '#fff',
  messageColor: '#fff',
  backgroundColor: '#59a10d',
  color: '#fff',
  progressBarColor: '#326101',
  borderColor: '#b5ea7c',
  position: 'topRight',
  iconUrl: iconSvgOk,
  onOpened: function () {
    const progressBarGreen = document.querySelector('.iziToast-progressbar');
    progressBarGreen.setAttribute('style', 'border-color: #b5ea7c;');
  },
};

const promiseRejectedMessage = {
  title: 'Error',
  titleColor: '#fff',
  messageColor: '#fff',
  backgroundColor: '#ef4040',
  position: 'topRight',
  iconUrl: iconSvgError,
};

// Основна логіка

iziToast.show(helloMessageArg);

promiseForm.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();
  const delayInput = document.querySelector('input[name="delay"]');
  const getStateInput = document.querySelector('input[name="state"]:checked');
  if (delayInput.value === '') {
    console.log('Не спіши, введи тривалість затримки!');
    iziToast.show(importantDataMessageArgs);
    event.currentTarget.reset();
    return;
  }

  if (Number(delayInput.value) < 0) {
    console.log(
      "Від'ємне число? Ти не промах. Але і я також! Спробуй ще! Виклик прийняв!"
    );
    iziToast.show(negativeValueDelayMessage);
    event.currentTarget.reset();
    return;
  }
  if (delayInput.value === '0') {
    console.log('Нуль? Так не терпиться? Введи хоча б 1!');
    iziToast.show(zeroValueDelayMessage);
    event.currentTarget.reset();
    return;
  }

  if (!/^\d+$/.test(delayInput.value)) {
    console.log('І це все, що ти можеш? :))');
    iziToast.show(fractionValueDelayMessage);
    event.currentTarget.reset();
    return;
  }
  if (!getStateInput) {
    console.log('Нічого не буде! Треба вибрати тип промісу!');
    iziToast.show(promiseTypeUndefinedMessage);
    return;
  }
  const promiseDelay = Number(delayInput.value);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (getStateInput.value === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${promiseDelay}ms`);
      } else {
        reject(`❌ Rejected promise in ${promiseDelay}ms`);
      }
    }, promiseDelay);
  });

  promise
    .then(stateResult => {
      console.log(stateResult);
      promiseFillfilledMessage.message = stateResult;
      iziToast.show(promiseFillfilledMessage);
    })
    .catch(stateResult => {
      console.log(stateResult);
      promiseRejectedMessage.message = stateResult;
      iziToast.show(promiseRejectedMessage);
    });

  event.currentTarget.reset();
}
