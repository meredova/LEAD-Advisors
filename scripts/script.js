// Timer
const showDays = document.querySelector('.days')
const showHours = document.querySelector('.hours')
const showMinutes = document.querySelector('.minutes')
const showSeconds = document.querySelector('.seconds')
const deadline = new Date(2023, 6, 24)
const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

function countDown() {
    const today = new Date()
    const timeSpan = deadline - today
    if (timeSpan == 0) {
        clearInterval()
        return
    }

    const days = Math.floor(timeSpan / day)
    const hours = Math.floor((timeSpan % day) / hour)
    const minutes = Math.floor((timeSpan % hour) / minute)
    const seconds = Math.floor((timeSpan % minute) / second) 
   
    showDays.innerHTML = days
    showHours.innerHTML = hours
    showMinutes.innerHTML = minutes
    showSeconds.innerHTML = seconds
}
setInterval(countDown, 1000)

// Validation


let popup = document.querySelector('.overlay');
let closeBtn = document.querySelector('.modal__button');
let closeX = document.querySelector('.modal__close');

closeBtn.addEventListener('click', clickBtn);
closeX.addEventListener('click', clickBtn);

function clickBtn() {
  popup.style.display = 'none';
}

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault()
    var form = event.target
    var formData = new FormData(form)

    var xhr = new XMLHttpRequest()
    xhr.open(form.method, form.action)
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) 
            return;
        if (xhr.status === 200) {
            popup.style.display = 'flex';
            form.reset()
        } else {
            popup.style.display = 'flex';
            document.querySelector('.modal__title').innerHTML = 'Error!';
            document.querySelector('.modal__subtitle').innerHTML = 'Someting went wrong';
            form.reset()
        }
    }
    xhr.send(formData)
})


// Slider

const events = document.querySelector('.events')
const checkEvents = document.querySelector('.footer__events__link')
const arrow = document.querySelector('.footer__events__arrow')
const slides = document.querySelectorAll('.slide');
let currentSlideIndex = 0;

checkEvents.addEventListener(('click'), () => {
    if (events.style.display == 'none') {
    events.style.display = 'block';
    arrow.style.transform = 'rotate(-90deg)'
    } else {
        events.style.display = 'none';
        events.style.transform = 'translateY(20%) rotate(90deg);'
    }
})

function showSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove('active');
      slide.querySelector('.slide__descr').style.display = 'none';
      slide.querySelector('.slide__title').style.background = 'linear-gradient(180deg, rgba(22, 44, 78, 0) 0%, #162C4E 100%)';
    });
  
    slides[index].classList.add('active');
    slides[index].querySelector('.slide__descr').style.display = 'block';
    slides[index].querySelector('.slide__title').style.background = '#162C4E';
  }

function showNextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  showSlide(currentSlideIndex);
}

document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('slide__title')) {
      showNextSlide();
    }
  });

  showSlide(currentSlideIndex);