import iziToast from 'izitoast';
import iconSvgError from '../img/allert.svg';
import iconSvgOk from '../img/ok.svg';
import iconSvgWarning from '../img/warning.svg';
import iconSvgBell from '../img/bell.svg';

const createButton = document.querySelector('.create-button');
const promiseForm = document.querySelector('.form');

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

createButton.addEventListener('click', createPromise);

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
        resolve('Success! Value passed to resolve function');
      } else {
        reject('Error! Error passed to reject function');
      }
    }, promiseDelay);
  });

  promise
    .then(() => {
      console.log(`✅ Fulfilled promise in ${promiseDelay}ms`);
      iziToast.show({
        message: `✅ Fulfilled promise in ${promiseDelay}ms`,
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
    .catch(() => {
      console.log(`❌ Rejected promise in ${promiseDelay}ms`);
      iziToast.show({
        title: 'Error',
        titleColor: '#fff',
        message: `❌ Rejected promise in ${promiseDelay}ms`,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        iconUrl: iconSvgError,
      });
    });

  promiseForm.reset();
}
