import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('[type="submit"]'),
}

refs.form.addEventListener('submit', onSubmit);


function onSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;  

  let inputDelay = Number(delay.value);
  const interval = Number(step.value);  
  
  for (let i = 1; i <= Number(amount.value); i++) {

    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`,
                {                  
                  position: 'right-top',
                  distance: '20px',
                  fontSize: '21px',
                }         
        );        
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,
                {                  
                  position: 'right-top',
                  distance: '20px',
                  fontSize: '21px',
                },
        );        
      });
    
    inputDelay += interval;    
  }

  e.currentTarget.reset();
}

function createPromise(position, delay) { 

  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        
        } else {
          reject({position, delay});
        }
    }, delay)
    
  });
}