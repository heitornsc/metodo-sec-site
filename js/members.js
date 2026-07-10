/*
  Para cada treino, cole o ID do vídeo do YouTube em "youtube".
  O ID é o trecho depois de "v=" no link do vídeo.
  Ex: https://www.youtube.com/watch?v=ABC12345678  ->  youtube: 'ABC12345678'
  Deixe em branco ('') se ainda não tiver o vídeo — o card mostra um aviso.
*/
const workoutsByDay = {
  seg: [
    { name: 'Aquecimento + Mobilidade', duration: '8 min', youtube: '' },
    { name: 'Membros Inferiores', duration: '22 min', youtube: '' },
    { name: 'Core', duration: '10 min', youtube: '' },
    { name: 'Cardio Metabólico', duration: '15 min', youtube: '' },
    { name: 'Alongamento', duration: '6 min', youtube: '' },
  ],
  ter: [
    { name: 'Aquecimento + Mobilidade', duration: '8 min', youtube: '' },
    { name: 'Membros Superiores', duration: '20 min', youtube: '' },
    { name: 'Core', duration: '10 min', youtube: '' },
    { name: 'Alongamento', duration: '6 min', youtube: '' },
  ],
  qua: [
    { name: 'Aquecimento + Mobilidade', duration: '8 min', youtube: '' },
    { name: 'Full Body', duration: '25 min', youtube: '' },
    { name: 'Cardio Metabólico', duration: '15 min', youtube: '' },
    { name: 'Alongamento', duration: '6 min', youtube: '' },
  ],
  qui: [
    { name: 'Aquecimento + Mobilidade', duration: '8 min', youtube: '' },
    { name: 'Membros Inferiores', duration: '22 min', youtube: '' },
    { name: 'Core', duration: '10 min', youtube: '' },
    { name: 'Alongamento', duration: '6 min', youtube: '' },
  ],
  sex: [
    { name: 'Aquecimento + Mobilidade', duration: '8 min', youtube: '' },
    { name: 'Membros Superiores', duration: '20 min', youtube: '' },
    { name: 'Cardio Metabólico', duration: '15 min', youtube: '' },
    { name: 'Alongamento', duration: '6 min', youtube: '' },
  ],
  sab: [
    { name: 'Treino Livre / Cardio', duration: '30 min', youtube: '' },
    { name: 'Alongamento Completo', duration: '12 min', youtube: '' },
  ],
};

const playIcon = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';

function renderWorkouts(day) {
  const grid = document.getElementById('workoutGrid');
  grid.innerHTML = '';
  (workoutsByDay[day] || []).forEach((w, i) => {
    const imgPath = `assets/treinos/${day}-${i + 1}.jpg`;
    const card = document.createElement('div');
    card.className = 'workout-card reveal is-visible';
    card.innerHTML = `
      <div class="workout-card__thumb">
        <img src="${imgPath}" alt="${w.name}" onerror="this.style.display='none'">
        <div class="workout-card__play">${playIcon}</div>
        <span class="workout-card__duration">${w.duration}</span>
      </div>
      <div class="workout-card__info">
        <strong>${w.name}</strong>
        <span>Treino do dia</span>
      </div>
    `;
    card.addEventListener('click', () => openVideoModal(w.name, w.youtube));
    grid.appendChild(card);
  });
}

function openVideoModal(title, youtubeId) {
  const modal = document.getElementById('videoModal');
  const frameWrap = document.getElementById('videoModalFrame');
  document.getElementById('videoModalTitle').textContent = title;

  if (youtubeId) {
    frameWrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" title="${title}" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    frameWrap.innerHTML = `<p class="video-modal__empty">Vídeo ainda não cadastrado para este treino. Adicione o link do YouTube em <code>js/members.js</code>.</p>`;
  }
  modal.classList.add('is-open');
}

function closeVideoModal() {
  document.getElementById('videoModal').classList.remove('is-open');
  document.getElementById('videoModalFrame').innerHTML = '';
}

const dayTabs = document.getElementById('dayTabs');
dayTabs.querySelectorAll('.day-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    dayTabs.querySelectorAll('.day-tab').forEach((t) => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    renderWorkouts(tab.dataset.day);
  });
});

renderWorkouts('seg');
