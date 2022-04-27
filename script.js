let span = document.getElementsByClassName('silder-nav');
let product = document.getElementsByClassName('product');
let product_page = Math.ceil(product.length / 4);
let l = 0;
let movePer = 24;
let maxMove = 240;
// mobile_view
let mob_view = window.matchMedia('(max-width: 768px)');
if (mob_view.matches) {
  movePer = 50.36;
  maxMove = 504;
}

let right_mover = () => {
  l = l + movePer;
  if (product == 1) {
    l = 0;
  }
  for (const i of product) {
    if (l > maxMove) {
      l = 0;
    }
    i.style.left = '-' + l + '%';
  }
};
let left_mover = () => {
  l = l - movePer;
  if (l <= 0) {
    l = 0;
  }
  for (const i of product) {
    if (product_page > 1) {
      i.style.left = '-' + l + '%';
    }
  }
};
span[1].onclick = () => {
  right_mover();
};
span[0].onclick = () => {
  left_mover();
};

console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
  prev: document.querySelector('.btn--left'),
  next: document.querySelector('.btn--right'),
};
const cardsContainerEl = document.querySelector('.cards__wrapper');

buttons.next.addEventListener('click', () => swapCards('right'));

buttons.prev.addEventListener('click', () => swapCards('left'));

function swapCards(direction) {
  const currentCardEl = cardsContainerEl.querySelector('.current--card');
  const previousCardEl = cardsContainerEl.querySelector('.previous--card');
  const nextCardEl = cardsContainerEl.querySelector('.next--card');

  swapCardsClass();

  removeCardEvents(currentCardEl);

  function swapCardsClass() {
    currentCardEl.classList.remove('current--card');
    previousCardEl.classList.remove('previous--card');
    nextCardEl.classList.remove('next--card');

    currentCardEl.style.zIndex = '50';

    if (direction === 'right') {
      previousCardEl.style.zIndex = '20';
      nextCardEl.style.zIndex = '30';

      currentCardEl.classList.add('previous--card');
      previousCardEl.classList.add('next--card');
      nextCardEl.classList.add('current--card');
    } else if (direction === 'left') {
      previousCardEl.style.zIndex = '30';
      nextCardEl.style.zIndex = '20';

      currentCardEl.classList.add('next--card');
      previousCardEl.classList.add('current--card');
      nextCardEl.classList.add('previous--card');
    }
  }
}

function updateCard(e) {
  const card = e.currentTarget;
  const box = card.getBoundingClientRect();
  const centerPosition = {
    x: box.left + box.width / 2,
    y: box.top + box.height / 2,
  };
  let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
  gsap.set(card, {
    '--current-card-rotation-offset': `${angle}deg`,
  });
  const currentInfoEl = cardInfosContainerEl.querySelector('.current--info');
  gsap.set(currentInfoEl, {
    rotateY: `${angle}deg`,
  });
}

function resetCardTransforms(e) {
  const card = e.currentTarget;
  const currentInfoEl = cardInfosContainerEl.querySelector('.current--info');
  gsap.set(card, {
    '--current-card-rotation-offset': 0,
  });
  gsap.set(currentInfoEl, {
    rotateY: 0,
  });
}

function initCardEvents() {
  const currentCardEl = cardsContainerEl.querySelector('.current--card');
  currentCardEl.addEventListener('pointermove', updateCard);
  currentCardEl.addEventListener('pointerout', (e) => {
    resetCardTransforms(e);
  });
}

initCardEvents();

function removeCardEvents(card) {
  card.removeEventListener('pointermove', updateCard);
}

function init() {
  let tl = gsap.timeline();

  tl.to(cardsContainerEl.children, {
    delay: 0.15,
    duration: 0.5,
    stagger: {
      ease: 'power4.inOut',
      from: 'right',
      amount: 0.1,
    },
    '--card-translateY-offset': '0%',
  })
    .to(
      cardInfosContainerEl
        .querySelector('.current--info')
        .querySelectorAll('.text'),
      {
        delay: 0.5,
        duration: 0.4,
        stagger: 0.1,
        opacity: 1,
        translateY: 0,
      }
    )
    .to(
      [buttons.prev, buttons.next],
      {
        duration: 0.4,
        opacity: 1,
        pointerEvents: 'all',
      },
      '-=0.4'
    );
}

var main_btn = document.querySelectorAll('.demo-button');
var wrapper = document.querySelector('.wrapper');
var close_btns = document.querySelectorAll('.close_btn');

main_btn.forEach(function (btn) {
  btn.addEventListener('click', function () {
    wrapper.classList.add('active');
  });
});
close_btns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    wrapper.classList.remove('active');
  });
});

//for menu-btn

const menubtn = document.querySelector('.menu-btn');
const navigation = document.querySelector('.nav');
const navigationItems = document.querySelectorAll('.nav a');

menubtn.addEventListener('click', () => {
  menubtn.classList.toggle('active');
  navigation.classList.toggle('active');
});

navigationItems.forEach((navigationItems) => {
  navigationItems.addEventListener('click', () => {
    menubtn.classList.remove('active');
    navigation.classList.remove('active');
  });
});

//for sticky navigation bar on scroll
window.addEventListener('scroll', function () {
  const header = document.querySelector('.main-header');
  header.classList.toggle('sticky', window.scrollY > 0);
});
