const pages = Array.from(document.querySelectorAll('.page'));
const nextButtons = Array.from(document.querySelectorAll('.next'));
const treatButton = document.getElementById('treat-button');
const pawNote = document.getElementById('paw-note');
const easterEggButton = document.getElementById('easter-egg');
const insideJoke = document.getElementById('inside-joke');
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
const petalField = document.getElementById('petal-field');

let activePage = 0;
let isTransitioning = false;

function showPage(nextIndex) {
  if (isTransitioning || nextIndex < 0 || nextIndex >= pages.length || nextIndex === activePage) {
    return;
  }

  const currentPage = pages[activePage];
  const targetPage = pages[nextIndex];
  if (!currentPage || !targetPage) {
    return;
  }

  isTransitioning = true;
  currentPage.classList.add('turning-out');
  targetPage.classList.add('active');

  window.setTimeout(() => {
    currentPage.classList.remove('active', 'turning-out');
    activePage = nextIndex;
    isTransitioning = false;

    if (activePage === 4 || activePage === 5) {
      burstSparks(window.innerWidth * 0.5, window.innerHeight * 0.48, 16);
    }
  }, 560);
}

function spawnPetals() {
  if (!petalField) {
    return;
  }

  const petalCount = 22;
  for (let i = 0; i < petalCount; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.setProperty('--left', `${Math.random() * 100}%`);
    petal.style.setProperty('--delay', `${Math.random() * 8}s`);
    petal.style.setProperty('--duration', `${8 + Math.random() * 7}s`);
    petalField.appendChild(petal);
  }
}

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

function burstSparks(x, y, count) {
  for (let i = 0; i < count; i += 1) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty('--dx', `${(Math.random() - 0.5) * 180}px`);
    spark.style.setProperty('--dy', `${(Math.random() - 0.5) * 180}px`);
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 1000);
  }
}

nextButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const next = Number(event.currentTarget.dataset.next || activePage);
    showPage(next);
  });
});

if (treatButton) {
  treatButton.addEventListener('click', (event) => {
    const buttonBounds = event.currentTarget.getBoundingClientRect();
    for (let i = 0; i < 22; i += 1) {
      setTimeout(() => {
        const x = buttonBounds.left + buttonBounds.width / 2 + (Math.random() - 0.5) * 50;
        const y = buttonBounds.top + 10;
        spawnHeart(x, y);
      }, i * 42);
    }

    burstSparks(buttonBounds.left + buttonBounds.width / 2, buttonBounds.top + 20, 12);

    if (pawNote) {
      pawNote.hidden = false;
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

  async function playMusic() {
    const source = bgMusic.querySelector('source');
    const hasSource = source && source.getAttribute('src');

    if (!hasSource || missingTrack) {
      musicToggle.textContent = 'Add track first';
      setTimeout(() => {
        musicToggle.textContent = 'Music: Off';
      }, 1200);
      return false;
    }

    if (bgMusic.paused) {
      try {
        await bgMusic.play();
        musicToggle.textContent = 'Music: On';
        return true;
      } catch {
        musicToggle.textContent = 'Music: Off';
        return false;
      }
    }

    musicToggle.textContent = 'Music: On';
    return true;
  }

  bgMusic.addEventListener('error', () => {
    missingTrack = true;
  });

  // Autoplay on load when browser policy allows it.
  void playMusic();

  // If blocked by autoplay policy, start at first user interaction.
  const unlockAutoplay = async () => {
    const started = await playMusic();
    if (started) {
      window.removeEventListener('pointerdown', unlockAutoplay);
      window.removeEventListener('keydown', unlockAutoplay);
    }
  };

  window.addEventListener('pointerdown', unlockAutoplay);
  window.addEventListener('keydown', unlockAutoplay);

  musicToggle.addEventListener('click', async () => {
    if (bgMusic.paused) {
      await playMusic();
      return;
    }

    bgMusic.pause();
    musicToggle.textContent = 'Music: Off';
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    showPage(Math.min(activePage + 1, pages.length - 1));
  }

  if (event.key === 'ArrowLeft') {
    showPage(Math.max(activePage - 1, 0));
  }
});

spawnPetals();
