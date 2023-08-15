const seconds = document.querySelector('.seconds');
const minutes = document.querySelector('.minutes');

const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');

let started;

const playSound = async function () {
  try {
    const sound = 'sounds/250629__kwahmah_02__alarm1.mp3';
    const audio = new Audio(sound);
    await audio.play();
  } catch (err) {
    alert(err);
  }
};

const resetTimer = function (timer) {
  clearInterval(timer);

  startBtn.classList.remove('active');
  stopBtn.classList.remove('active');
  resetBtn.classList.add('active');

  started = false;
  minutes.value = '';
  seconds.value = '';
};

const stopTimer = function (timer) {
  clearInterval(timer);

  startBtn.classList.remove('active');
  resetBtn.classList.remove('active');
  stopBtn.classList.add('active');

  started = false;
};

startBtn.addEventListener('click', function () {
  stopBtn.classList.remove('active');
  resetBtn.classList.remove('active');
  startBtn.classList.add('active');

  if (started) return;

  if (minutes.value < 0 || seconds.value < 0) {
    minutes.value = '';
    seconds.value = '';
    alert('You must set positive numbers!');
  }

  if (minutes.value && minutes.value > 0 && !seconds.value) {
    minutes.value--;
    seconds.value = '59';
    const secondsTimer = setInterval(() => {
      seconds.value--;
      if (seconds.value === '0') {
        if (minutes.value && minutes.value > '0') {
          seconds.value = '59';
          minutes.value--;
        } else {
          clearInterval(secondsTimer);
          playSound();
        }
      }

      stopBtn.addEventListener('click', stopTimer.bind(null, secondsTimer));

      resetBtn.addEventListener('click', resetTimer.bind(null, secondsTimer));
    }, 1000);
  } else if (seconds.value && seconds.value > '0') {
    seconds.value--;
    if (seconds.value === '0') {
      playSound();
    } else {
      const secondsTimer = setInterval(() => {
        seconds.value--;
        if (seconds.value === '0') {
          if (minutes.value && minutes.value > '0') {
            seconds.value = '59';
            minutes.value--;
          } else {
            clearInterval(secondsTimer);
            playSound();
          }
        }

        stopBtn.addEventListener('click', stopTimer.bind(null, secondsTimer));

        resetBtn.addEventListener('click', resetTimer.bind(null, secondsTimer));
      }, 1000);
    }
  }
  started = true;
});
