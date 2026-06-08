const landing = document.getElementById('landing');
const main = document.getElementById('main');
const music = document.getElementById('music');
const enterBtn = document.getElementById('enterBtn');
const revealBtn = document.getElementById('revealBtn');
const secret = document.getElementById('secret');
const muteBtn = document.getElementById('muteBtn');
const typingLine = document.getElementById('typingLine');
const collectionSection = document.getElementById('collectionSection');
const collectionTitle = document.getElementById('collectionTitle');
const collectionText = document.getElementById('collectionText');
const photoCollection = document.getElementById('photoCollection');
const groupMemoryGrid = document.getElementById('groupMemoryGrid');
const cardGrid = document.getElementById('cardGrid');
const photoModal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const letterBtn = document.getElementById('letterBtn');
const letterModal = document.getElementById('letterModal');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizProgress = document.getElementById('quizProgress');
const quizNote = document.getElementById('quizNote');
const nextBtn = document.getElementById('nextBtn');
const quizModal = document.getElementById('quizModal');
const quizImage = document.getElementById('quizImage');
const quizMessage = document.getElementById('quizMessage');

const quiz = [
  {
    question: 'What is our cutest memory? 💕',
    options: [
      { text: 'Our selfie 😍', img: 'images/photo1.jpg', msg: 'Our cutest selfie ever 💖' },
      { text: 'That fun day 😂', img: 'images/photo2.jpg', msg: 'We laughed so much that day 😂' },
      { text: 'That special moment 💖', img: 'images/photo3.jpg', msg: 'This moment means everything 💕' },
    ],
  },
  {
    question: 'When did you feel happiest with me? 😊',
    options: [
      { text: 'Laughing together 😂', img: 'images/photo4.jpg', msg: 'Your smile is my happiness 💖' },
      { text: 'Eating together 🍕', img: 'images/photo5.jpg', msg: 'Food + you = perfect combo 🍕💖' },
      { text: 'Talking for hours 💬', img: 'images/photo6.jpg', msg: 'We never run out of talks 💕' },
    ],
  },
  {
    question: 'What do we do the most together? 😂',
    options: [
      { text: 'Laugh non-stop 😂', img: 'images/photo1.jpg', msg: 'We laugh at everything 😂💖' },
      { text: 'Take photos 📸', img: 'images/photo2.jpg', msg: 'Our gallery is full of memories 📸' },
      { text: 'Eat food 🍟', img: 'images/photo3.jpg', msg: 'We love food too much 😂🍟' },
    ],
  },
  {
    question: 'What is our funniest memory? 😆',
    options: [
      { text: 'That silly moment 🤣', img: 'images/photo4.jpg', msg: 'We were so silly 😂' },
      { text: 'That embarrassing moment 😜', img: 'images/photo5.jpg', msg: 'Still can\'t stop laughing 😂' },
      { text: 'That unexpected laugh 😂', img: 'images/photo6.jpg', msg: 'Happened randomly but best 😂' },
    ],
  },
  {
    question: 'Who is the best friend ever? 😎💖',
    options: [
      { text: 'Me 😌', img: 'images/photo1.jpg', msg: 'Obviously me 😌💖' },
      { text: 'Me 😎', img: 'images/photo2.jpg', msg: 'Of course it\'s me 😎💖' },
      { text: 'Me 😂', img: 'images/photo3.jpg', msg: 'No doubt 😂💖' },
    ],
  },
];

const galleryData = [
  {
    id: 'cute',
    title: 'Cute Memories',
    icon: '💖',
    badge: 'Sweet & soft',
    text: 'Soft smiles, tiny laughs, and heartfelt little moments.',
    images: [
      { src: 'images/photo1.jpg', caption: 'Best day ever 💖' },
      { src: 'images/photo2.jpg', caption: 'Soft smiles and sweet laughs 🌸' },
      { src: 'images/photo3.jpg', caption: 'Little sparkles of joy ✨' },
      { src: 'images/photo4.jpg', caption: 'Sweet memory glow 💕' },
    ],
  },
  {
    id: 'crazy',
    title: 'Crazy Moments',
    icon: '😂',
    badge: 'Silly & fun',
    text: 'The loud, lovable, and unforgettable kind of chaos.',
    images: [
      { src: 'images/photo5.jpg', caption: 'Crazy moments 😂' },
      { src: 'images/photo6.jpg', caption: 'Pure silliness and fun 🎉' },
      { src: 'images/photo7.jpg', caption: 'The best kind of chaos 🫶' },
      { src: 'images/photo8.jpg', caption: 'Laughing through every scene 💛' },
    ],
  },
  {
    id: 'best',
    title: 'Best Moments',
    icon: '📸',
    badge: 'Forever favorite',
    text: 'The timeless memories that feel like pure sunshine.',
    images: [
      { src: 'images/photo9.jpg', caption: 'Forever bestie vibes ☀️' },
      { src: 'images/photo10.jpg', caption: 'Bright and beautiful memories 💕' },
      { src: 'images/photo11.jpg', caption: 'Always together 💖' },
      { src: 'images/photo12.jpg', caption: 'Tiny moments, big love ✨' },
    ],
  },
];

function normalizeImagePath(path) {
  return String(path || '').replace(/^\/+/, '').replace(/\\/g, '/');
}

function typeText(text, el, speed = 45) {
  el.textContent = '';
  let i = 0;
  const writer = setInterval(() => {
    el.textContent += text[i];
    i += 1;
    if (i >= text.length) clearInterval(writer);
  }, speed);
}

function enterSite() {
  landing.classList.add('hidden');
  main.classList.remove('hidden');
  music.play().catch(() => {});
}

function showMessage() {
  secret.classList.add('show');
}

function toggleMute() {
  music.muted = !music.muted;
  muteBtn.textContent = music.muted ? '🔇 Unmute' : '🔈 Mute';
  muteBtn.setAttribute('aria-pressed', String(music.muted));
}

function renderCategoryCards() {
  cardGrid.innerHTML = galleryData
    .map(
      (item) => `
        <article class="memory-card" data-category="${item.id}" tabindex="0" aria-label="Open ${item.title} gallery">
          <div class="mini-collage">
            ${item.images
              .slice(0, 3)
              .map(
                (image) => `<img src="${normalizeImagePath(image.src)}" alt="${image.caption}" loading="lazy" />`
              )
              .join('')}
          </div>
          <div>
            <span class="card-label">${item.badge}</span>
            <div class="card-icon" aria-hidden="true">${item.icon}</div>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
          <span class="hint-chip">Click to open ✨</span>
        </article>
      `
    )
    .join('');
}

function renderGroupGallery() {
  const allImages = galleryData.flatMap((item) => item.images);
  groupMemoryGrid.innerHTML = allImages
    .map(
      (item) => `
        <button class="group-btn" type="button" data-open="group" data-src="${normalizeImagePath(item.src)}" data-caption="${item.caption}">
          <img src="${normalizeImagePath(item.src)}" alt="${item.caption}" loading="lazy" />
          <span>${item.caption}</span>
        </button>
      `
    )
    .join('');

}

function openCollection(category) {
  const item = galleryData.find((entry) => entry.id === category);
  if (!item) return;

  collectionTitle.textContent = item.title;
  collectionText.textContent = item.text;
  photoCollection.innerHTML = item.images
    .map((entry) => `
      <article class="photo-frame" data-open="photo" data-src="${normalizeImagePath(entry.src)}" data-caption="${entry.caption}">
        <img src="${normalizeImagePath(entry.src)}" alt="${entry.caption}" loading="lazy" />
        <p class="photo-caption">${entry.caption}</p>
      </article>
    `)
    .join('');

  collectionSection.classList.remove('hidden');
  collectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openModal(src, caption) {
  modalImage.src = normalizeImagePath(src);
  modalCaption.textContent = caption;
  photoModal.classList.remove('hidden');
}

function closeModal() {
  photoModal.classList.add('hidden');
  letterModal.classList.add('hidden');
}

function openLetter() {
  letterModal.classList.remove('hidden');
}

let quizIndex = 0;
let selectedAnswer = null;

function renderQuiz() {
  const current = quiz[quizIndex];
  quizProgress.textContent = `Question ${quizIndex + 1} / ${quiz.length}`;
  quizQuestion.textContent = current.question;
  quizOptions.innerHTML = current.options
    .map(
      (option, index) => `
        <button class="quiz-option ${selectedAnswer === index ? 'selected' : ''}" type="button" data-option="${index}">
          <img src="${normalizeImagePath(option.img)}" alt="${option.text}" loading="lazy" />
          <span>
            <strong>${option.text}</strong>
            ${option.msg}
          </span>
        </button>
      `
    )
    .join('');
  nextBtn.disabled = selectedAnswer === null;
  nextBtn.textContent = quizIndex === quiz.length - 1 ? 'Finish 🎉' : 'Next ➡️';
  quizNote.textContent = selectedAnswer === null ? 'Pick one answer to reveal the memory surprise.' : 'Nice choice! Tap Next to continue.';
}

function openQuizAnswer(index) {
  const option = quiz[quizIndex].options[index];
  quizImage.src = normalizeImagePath(option.img);
  quizMessage.textContent = option.msg;
  quizModal.classList.remove('hidden');
  if (quizIndex === quiz.length - 1) {
    document.querySelector('.quiz-card').classList.add('quiz-celebrate');
  }
}

function nextQuizQuestion() {
  if (selectedAnswer === null) return;

  quizModal.classList.add('hidden');

  if (quizIndex < quiz.length - 1) {
    quizIndex += 1;
    selectedAnswer = null;
    renderQuiz();
  } else {
    quizNote.textContent = 'You finished the quiz 💖 The cutest memories are all yours now!';
    nextBtn.disabled = true;
    document.querySelector('.quiz-card').classList.add('quiz-celebrate');
  }
}

renderCategoryCards();
renderGroupGallery();

enterBtn.addEventListener('click', enterSite);
revealBtn.addEventListener('click', showMessage);
muteBtn.addEventListener('click', toggleMute);
letterBtn.addEventListener('click', openLetter);

cardGrid.addEventListener('click', (event) => {
  const card = event.target.closest('.memory-card');
  if (card) openCollection(card.dataset.category);
});

renderQuiz();

quizOptions.addEventListener('click', (event) => {
  const button = event.target.closest('.quiz-option');
  if (!button) return;
  selectedAnswer = Number(button.dataset.option);
  renderQuiz();
  openQuizAnswer(selectedAnswer);
});

nextBtn.addEventListener('click', nextQuizQuestion);

// Popup image click flow
photoCollection.addEventListener('click', (event) => {
  const frame = event.target.closest('[data-open="photo"]');
  if (frame) openModal(frame.dataset.src, frame.dataset.caption);
});

groupMemoryGrid.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-open="group"]');
  if (btn) openModal(btn.dataset.src, btn.dataset.caption);
});

for (const closeTrigger of document.querySelectorAll('[data-close]')) {
  closeTrigger.addEventListener('click', (event) => {
    const target = event.currentTarget.getAttribute('data-close');
    if (target === 'quiz') {
      quizModal.classList.add('hidden');
      return;
    }
    closeModal();
  });
}

photoModal.addEventListener('click', (event) => {
  if (event.target === photoModal || event.target.classList.contains('modal-backdrop')) closeModal();
});

quizModal.addEventListener('click', (event) => {
  if (event.target === quizModal || event.target.classList.contains('modal-backdrop')) {
    quizModal.classList.add('hidden');
  }
});

letterModal.addEventListener('click', (event) => {
  if (event.target === letterModal || event.target.classList.contains('modal-backdrop')) closeModal();
});

typeText('For the best person in my life 💕', typingLine, 45);