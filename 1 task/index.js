const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
let timer = null;


// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
    return (seconds) => {
        const now = Date.now();
        const then = now + seconds * 1000;

        timer = setInterval(() => {
            const remainingSeconds = Math.round((then - Date.now()) / 1000);

            if (remainingSeconds < 0) {
                clearInterval(timer);
                timer = null;
                return;
            }
            setRemainingTime(remainingSeconds);

        }, 1000);

    };
};

const setRemainingTime = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let second = seconds % 60;

    let hours_string = hours < 10 ? `0${hours}` : hours;
    let minutes_string = minutes < 10 ? `0${minutes}` : minutes;
    let second_string = second < 10 ? `0${second}` : second;

    timerEl.textContent = `${hours_string}:${minutes_string}:${second_string}`;
}

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (v) => {
    // Очистите input так, чтобы в значении
    // оставались только числа
    if (isNaN(v.data)) {
        inputEl.value = inputEl.value.slice(0, -1);
    }

});

buttonEl.addEventListener('click', () => {
    const seconds = Number(inputEl.value);

    // prevent from starting another timer if current not finished
    if (timer === null) {
        animateTimer(seconds);
    }

    inputEl.value = '';
});
