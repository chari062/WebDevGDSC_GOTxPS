// GOT Home Page Interactions
(function(){
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  // Hero animations removed; no dragon/ravens in homepage header
  const appsGrid = document.getElementById('appsGrid');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const appModal = document.getElementById('appModal');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalTag = document.getElementById('modalTag');
  const modalDesc = document.getElementById('modalDesc');
  const modalGallery = document.getElementById('modalGallery');
  const modalClose = document.querySelector('.modal-close');
  const installBtn = document.getElementById('installBtn');
  const devPopup = document.getElementById('devPopup');
  const indevModal = document.getElementById('indevModal');
  const indevPrimary = document.querySelector('.indev-primary');
  const flyCreature = document.getElementById('flyCreature');
  const ravenSound = document.getElementById('ravenSound');
  const hoverSword = document.getElementById('hoverSword');
  const hodor = document.getElementById('hodor');
  const quotesEl = document.getElementById('quotes');
  const ravenEgg = document.getElementById('ravenEgg');
  const QUOTES = ["Winter is Coming.", "The North Remembers.", "Fire and Blood."];

  // Restore theme preference
  const saved = localStorage.getItem('realm-theme');
  if (saved === 'light' || saved === 'dark') {
    body.setAttribute('data-theme', saved);
    const icon = themeToggle?.querySelector('.toggle-icon');
    if (icon) icon.textContent = saved === 'dark' ? '☾' : '☼';
  }

  // Theme toggle
  themeToggle?.addEventListener('click', () => {
    const current = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', current);
    localStorage.setItem('realm-theme', current);
    const icon = themeToggle.querySelector('.toggle-icon');
    if (icon) icon.textContent = current === 'dark' ? '☾' : '☼';
  });

  // Snowfall overlay
  const snowContainer = document.getElementById('snow-container');
  function spawnSnowflake(){
    const flake = document.createElement('div');
    flake.className = 'snowflake';
    flake.textContent = '❄';
    flake.style.left = Math.random() * 100 + 'vw';
    flake.style.animationDuration = (6 + Math.random() * 6) + 's';
    flake.style.opacity = (0.15 + Math.random() * 0.25).toFixed(2);
    flake.style.fontSize = (10 + Math.random() * 10) + 'px';
    snowContainer.appendChild(flake);
    setTimeout(() => flake.remove(), 13000);
  }
  let snowTimer = setInterval(spawnSnowflake, 520);
  for (let i = 0; i < 12; i++) spawnSnowflake();

  // Grid interactions
  const DEVELOPED = {
    cod: {
      title: 'Call of Duty Mobile',
      tag: 'War never ends in the Realm of Duty.',
      desc: 'Fast-paced FPS combat with iconic maps and modes. Form your squad, master your loadout, and dominate battlefields across the Seven Kingdoms.',
      icon: 'file:///Z:/Projects/WebDev/ui_comp/Apps/1.jpeg',
      gallery: []
    },
    instagram: {
      title: 'Instagram',
      tag: 'Stories written in light, shared across realms.',
      desc: 'Capture, edit, and share moments from the Wall to Dorne. Connect with houses near and far via stories, reels, and messages.',
      icon: 'file:///Z:/Projects/WebDev/ui_comp/Apps/2.jpeg',
      gallery: []
    },
    bgmi: {
      title: 'BGMI',
      tag: 'Only the strongest survive in the arena.',
      desc: 'Drop into vast battlegrounds, scavenge for weapons, and outlast rival houses in an ever-shrinking circle.',
      icon: 'file:///Z:/Projects/WebDev/ui_comp/Apps/3.jpeg',
      gallery: []
    }
  };

  function showModal(key){
    const data = DEVELOPED[key];
    if (!data) return;
    modalIcon.src = data.icon;
    modalTitle.textContent = data.title;
    modalTag.textContent = data.tag;
    modalDesc.textContent = data.desc;
    modalGallery.innerHTML = '';
    appModal.showModal();
    // play subtle sword shimmer
    try { hoverSword.currentTime = 0; hoverSword.volume = 0.25; hoverSword.play(); } catch(_){}
  }

  function hideModal(){ appModal.close(); }
  modalClose?.addEventListener('click', hideModal);
  appModal?.addEventListener('click', (e) => { if (e.target === appModal) hideModal(); });
  // Install button plays Hodor audio
  installBtn?.addEventListener('click', () => {
    try { hodor.currentTime = 0; hodor.volume = 0.7; hodor.play(); } catch(_){}
  });

  function showDevPopup(type){
    // Open vanilla modal card
    if (indevModal && typeof indevModal.showModal === 'function') {
      try { indevModal.showModal(); } catch(_) { indevModal.setAttribute('open',''); }
    }
    // After showcasing the card, play raven sound once for all in-development apps
    try {
      setTimeout(() => {
        ravenSound.currentTime = 0;
        ravenSound.volume = 0.45;
        ravenSound.play().catch(() => {});
      }, 150);
    } catch(_) {}
  }

  // Modal close wiring
  indevPrimary?.addEventListener('click', () => indevModal?.close());
  indevModal?.addEventListener('click', (e) => { if (e.target === indevModal) indevModal.close(); });

  appsGrid?.addEventListener('click', (e) => {
    const card = e.target.closest('.app-card');
    if (!card) return;
    const key = card.getAttribute('data-app');
    if (DEVELOPED[key]) {
      showModal(key);
    } else {
      showDevPopup(key === 'whatsapp' ? 'raven' : 'dragon');
    }
  });

  // Search filter
  function normalize(text){ return (text || '').toLowerCase(); }
  function applySearch(){
    const q = normalize(searchInput?.value);
    const cards = appsGrid?.querySelectorAll('.app-card') || [];
    cards.forEach((card) => {
      const name = normalize(card.querySelector('.app-title')?.textContent);
      card.style.display = !q || name.includes(q) ? '' : 'none';
    });
  }
  searchInput?.addEventListener('input', applySearch);
  searchBtn?.addEventListener('click', applySearch);

  // Hover SFX
  appsGrid?.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.app-card');
    if (!card) return;
    try { hoverSword.currentTime = 0; hoverSword.volume = 0.2; hoverSword.play(); } catch(_){}
  });

  // Rotating quotes
  let qi = 0;
  function renderQuote(){ quotesEl.textContent = QUOTES[qi % QUOTES.length]; qi++; }
  renderQuote();
  setInterval(renderQuote, 3500);

  // Easter egg – three-eyed raven
  ravenEgg?.addEventListener('click', () => {
    alert('The Three-Eyed Raven sees all. Did you know? Valyrian steel was forged with dragonfire.');
    try { ravenSound.currentTime = 0; ravenSound.volume = 0.45; ravenSound.play(); } catch(_){}
  });
})();


