import iziToast from 'izitoast';
import iconSvgError from '../img/allert.svg';
import iconSvgOk from '../img/ok.svg';

const createButton = document.querySelector('.create-button');
const promiseForm = document.querySelector('.form');
createButton.addEventListener('click', createPromise);

function createPromise(event) {
  event.preventDefault();
  const delayInput = document.querySelector('input[name="delay"]');
  console.log('createPromise  delayInput:', delayInput);
  const getStateInput = document.querySelector('input[name="state"]:checked');
  if (delayInput.value === '') {
    iziToast.show({
      message: 'Не спіши, введи тривалість затримки!',
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      progressBar: false,
    });
    return;
  }
  if (!getStateInput) {
    console.log('Вибери тип промісу!');
    iziToast.show({
      message: 'Нічого не буде! Треба вибрати тип промісу!',
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      progressBar: false,
    });
    return;
  }
  const promiseDelay = Number(delayInput.value);
  console.log('createPromise  promiseDely:', promiseDelay);
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
        // progressBarColor: '#b5ea7c',

        position: 'topRight',
        iconUrl: iconSvgOk,
      });
    })
    .catch(() => {
      console.log(`❌ Rejected promise in ${promiseDelay}ms`);
      iziToast.show({
        title: 'Error',
        message: `❌ Rejected promise in ${promiseDelay}ms`,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        iconUrl: iconSvgError,
      });
    });

  console.log('promise  promise:', promise);

  console.log('getStateInput:', getStateInput);
  promiseForm.reset();
}
