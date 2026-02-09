const pages = Array.from(document.querySelectorAll('.page'));
const nextButtons = Array.from(document.querySelectorAll('.next'));
const treatButton = document.getElementById('treat-button');
const easterEggButton = document.getElementById('easter-egg');
const insideJoke = document.getElementById('inside-joke');
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');

function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.toggle('active', i === index);
  });
}

nextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const next = Number(button.dataset.next || 0);
    showPage(next);
  });
});

function spawnHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = Math.random() > 0.5 ? '❤' : '♡';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.setProperty('--x', `${(Math.random() - 0.5) * 70}px`);
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1600);
}

if (treatButton) {
  treatButton.addEventListener('click', (event) => {
    const buttonBounds = event.currentTarget.getBoundingClientRect();
    for (let i = 0; i < 18; i += 1) {
      setTimeout(() => {
        const x = buttonBounds.left + buttonBounds.width / 2 + (Math.random() - 0.5) * 40;
        const y = buttonBounds.top + 10;
        spawnHeart(x, y);
      }, i * 45);
    }
  });
}

if (easterEggButton && insideJoke) {
  easterEggButton.addEventListener('click', () => {
    insideJoke.hidden = !insideJoke.hidden;
  });
}

if (musicToggle && bgMusic) {
  let missingTrack = false;

  bgMusic.addEventListener('error', () => {
    missingTrack = true;
  });

  musicToggle.addEventListener('click', async () => {
    const source = bgMusic.querySelector('source');
    const hasSource = source && source.getAttribute('src');

    if (!hasSource || missingTrack) {
      musicToggle.textContent = 'Add track first';
      setTimeout(() => {
        musicToggle.textContent = 'Music: Off';
      }, 1200);
      return;
    }

    if (bgMusic.paused) {
      try {
        await bgMusic.play();
        musicToggle.textContent = 'Music: On';
      } catch {
        musicToggle.textContent = 'Tap again';
      }
      return;
    }

    bgMusic.pause();
    musicToggle.textContent = 'Music: Off';
  });
}
