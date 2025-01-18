import iziToast from 'izitoast';
import iconSvgError from '../img/allert.svg';
import iconSvgOk from '../img/ok.svg';
import iconSvgWarning from '../img/warning.svg';
import iconSvgBell from '../img/bell.svg';

const promiseForm = document.querySelector('.form');
promiseForm.setAttribute('novalidate', '');

iziToast.show({
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
});

promiseForm.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();
  const delayInput = document.querySelector('input[name="delay"]');
  const getStateInput = document.querySelector('input[name="state"]:checked');
  if (delayInput.value === '') {
    console.log('Не спіши, введи тривалість затримки!');
    iziToast.show({
      message: 'You forgot to enter important data',
      messageColor: '#fff',
      title: 'Caution',
      titleColor: '#fff',
      backgroundColor: '#ffa000',
      progressBarColor: '#bb7b10',
      position: 'topRight',
      iconUrl: iconSvgWarning,
    });
    event.currentTarget.reset();
    return;
  }

  if (Number(delayInput.value) < 0) {
    console.log(
      "Від'ємне число? Ти не промах. Але і я також! Спробуй ще! Виклик прийняв!"
    );
    iziToast.show({
      message: 'Передбачено! Введи коректне число!',
      messageColor: '#fff',
      title: 'Caution',
      titleColor: '#fff',
      backgroundColor: '#ffa000',
      progressBarColor: '#bb7b10',
      position: 'topRight',
      iconUrl: iconSvgWarning,
    });
    event.currentTarget.reset();
    return;
  }
  if (delayInput.value === '0') {
    console.log('Нуль? Так не терпиться?');
    iziToast.show({
      message: 'Передбачено! Введи коректне число!',
      messageColor: '#fff',
      title: 'Caution',
      titleColor: '#fff',
      backgroundColor: '#ffa000',
      progressBarColor: '#bb7b10',
      position: 'topRight',
      iconUrl: iconSvgWarning,
    });
    event.currentTarget.reset();
    return;
  }

  if (!/^\d+$/.test(delayInput.value)) {
    console.log('І це все, що ти можеш? :))');
    iziToast.show({
      message: 'Передбачено! Введи коректне число!',
      messageColor: '#fff',
      title: 'Caution',
      titleColor: '#fff',
      backgroundColor: '#ffa000',
      progressBarColor: '#bb7b10',
      position: 'topRight',
      iconUrl: iconSvgWarning,
    });
    event.currentTarget.reset();
    return;
  }
  if (!getStateInput) {
    console.log('Нічого не буде! Треба вибрати тип промісу!');
    iziToast.show({
      message: 'You forgot to enter important data',
      messageColor: '#fff',
      title: 'Caution',
      titleColor: '#fff',
      backgroundColor: '#ffa000',
      progressBarColor: '#bb7b10',
      position: 'topRight',
      iconUrl: iconSvgWarning,
    });

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
      iziToast.show({
        message: stateResult,
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
          const progressBarGreen = document.querySelector(
            '.iziToast-progressbar'
          );
          progressBarGreen.setAttribute('style', 'border-color: #b5ea7c;');
        },
      });
    })
    .catch(stateResult => {
      console.log(stateResult);
      iziToast.show({
        title: 'Error',
        titleColor: '#fff',
        message: stateResult,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        iconUrl: iconSvgError,
      });
    });

  event.currentTarget.reset();
}
