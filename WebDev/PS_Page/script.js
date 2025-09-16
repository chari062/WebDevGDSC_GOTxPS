// GOT Themed Login Interactions

(function () {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const googleLogin = document.getElementById('googleLogin');
  const dragon = document.getElementById('dragon');
  const successPopup = document.getElementById('successPopup');
  const audio = document.getElementById('gotTheme');
  const snowContainer = document.getElementById('snow-container');

  // Restore theme preference
  const saved = localStorage.getItem('realm-theme');
  if (saved === 'light' || saved === 'dark') {
    body.setAttribute('data-theme', saved);
  }

  // Theme toggle handler
  themeToggle?.addEventListener('click', () => {
    const current = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', current);
    localStorage.setItem('realm-theme', current);
    // Update toggle icon
    const icon = themeToggle.querySelector('.toggle-icon');
    if (icon) icon.textContent = current === 'dark' ? '☾' : '☼';
  });

  // Button hover shimmer position for radial gradient
  googleLogin?.addEventListener('mousemove', (e) => {
    const rect = googleLogin.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    googleLogin.style.setProperty('--x', x + '%');
    googleLogin.style.setProperty('--y', y + '%');
  });

  // Generate subtle snowfall
  function spawnSnowflake() {
    const flake = document.createElement('div');
    flake.className = 'snowflake';
    flake.textContent = '❄';
    flake.style.left = Math.random() * 100 + 'vw';
    flake.style.animationDuration = 6 + Math.random() * 6 + 's';
    flake.style.opacity = (0.15 + Math.random() * 0.25).toFixed(2);
    flake.style.fontSize = (10 + Math.random() * 10) + 'px';
    snowContainer.appendChild(flake);
    setTimeout(() => flake.remove(), 13000);
  }
  // Start snowfall
  let snowTimer = setInterval(spawnSnowflake, 450);
  // Create a few immediately
  for (let i = 0; i < 10; i++) spawnSnowflake();

  // Mock Google login success
  function simulateLogin() {
    // Here you would integrate real Google Sign-In. For this demo, we simulate success.
    handleLoginSuccess();
  }

  googleLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    simulateLogin();
    // Wait for dragon flight to finish before redirecting (~5s)
    const DRAGON_MS = 5000;
    setTimeout(() => {
      window.location.href = './home.html';
    }, DRAGON_MS);
  });

  // Success flow: play audio softly, fly dragon, show popup
  function handleLoginSuccess() {
    // Audio: play 3-5 seconds softly
    if (audio) {
      try {
        audio.currentTime = 0;
        audio.volume = 0.28;
        const playPromise = audio.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.catch(() => {});
        }
        setTimeout(() => {
          // fade out
          const fade = setInterval(() => {
            if (audio.volume > 0.02) {
              audio.volume = Math.max(0, audio.volume - 0.02);
            } else {
              clearInterval(fade);
              audio.pause();
            }
          }, 80);
        }, 3800);
      } catch (_) {}
    }

    // Dragon animation
    if (dragon) {
      dragon.classList.remove('fly');
      // force reflow to restart animation
      void dragon.offsetWidth;
      dragon.classList.add('fly');
    }

    // Success popup
    if (successPopup) {
      successPopup.classList.remove('show');
      void successPopup.offsetWidth;
      successPopup.classList.add('show');
    }
  }
})();


