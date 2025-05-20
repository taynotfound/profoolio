// Loading overlay
const loadingOverlay = document.getElementById('loading-overlay');
if (loadingOverlay) {
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      loadingOverlay.style.opacity = 0;
      setTimeout(() => {
        loadingOverlay.style.display = 'none';
      }, 500);
    }, 800);
  });
}

// Welcome animation overlay
const welcome = document.getElementById('welcome-overlay');
if (welcome) {
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      welcome.classList.add('fade-out');
      setTimeout(() => {
        welcome.style.display = 'none';
      }, 1200);
    }, 1800);
  });
}

// Glassy Navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scroll for nav links
for (const link of document.querySelectorAll('.nav-link')) {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// Contact Modal (advanced)
const openContact = document.getElementById('open-contact');
const contactModal = document.getElementById('contact-modal');
const contactGlass = contactModal?.querySelector('.contact-glass');
const closeContact = contactModal?.querySelector('.close-modal');
const firstInput = contactModal?.querySelector('input, textarea');
if (openContact && contactModal && contactGlass && closeContact) {
  openContact.addEventListener('click', () => {
    contactModal.classList.remove('hidden');
    setTimeout(() => contactModal.classList.add('show'), 10);
    setTimeout(() => firstInput?.focus(), 350);
  });
  closeContact.addEventListener('click', () => closeContactModal());
  closeContact.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') closeContactModal(); });
  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) closeContactModal();
  });
  document.addEventListener('keydown', (e) => {
    if (contactModal.classList.contains('show') && e.key === 'Escape') closeContactModal();
    // Focus trap
    if (contactModal.classList.contains('show') && e.key === 'Tab') {
      const focusable = contactModal.querySelectorAll('input, textarea, button, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    }
  });
}
function closeContactModal() {
  contactModal.classList.remove('show');
  setTimeout(() => contactModal.classList.add('hidden'), 350);
}

// Contact form AJAX (animated)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('contact-status');
    const sendBtn = contactForm.querySelector('.contact-send');
    status.textContent = '';
    sendBtn.disabled = true;
    sendBtn.classList.add('sending');
    try {
      const formData = new FormData(contactForm);
      const body = Object.fromEntries(formData.entries());
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      sendBtn.classList.remove('sending');
      if (res.ok) {
        sendBtn.classList.add('success');
        status.innerHTML = '<svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="#22d3ee" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg> <span>Message sent!</span>';
        status.classList.add('success');
        contactForm.reset();
        setTimeout(() => {
          sendBtn.classList.remove('success');
          status.classList.remove('success');
          status.textContent = '';
          closeContactModal();
        }, 1800);
      } else {
        sendBtn.classList.add('error');
        status.innerHTML = '<svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="#ef4444" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg> <span>Failed to send. Try again.</span>';
        status.classList.add('error');
        setTimeout(() => {
          sendBtn.classList.remove('error');
          status.classList.remove('error');
          status.textContent = '';
        }, 2200);
      }
    } catch {
      sendBtn.classList.add('error');
      status.innerHTML = '<svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="#ef4444" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg> <span>Failed to send. Try again.</span>';
      status.classList.add('error');
      setTimeout(() => {
        sendBtn.classList.remove('error');
        status.classList.remove('error');
        status.textContent = '';
      }, 2200);
    }
    sendBtn.disabled = false;
  });
  // Animate input on focus/blur
  contactForm.querySelectorAll('.contact-input').forEach(input => {
    input.addEventListener('focus', () => input.classList.add('focus'));
    input.addEventListener('blur', () => input.classList.remove('focus'));
  });
}

// Sparkles animation in modal
const sparklesCanvas = document.getElementById('contact-sparkles');
if (sparklesCanvas) {
  const ctx = sparklesCanvas.getContext('2d');
  let width = sparklesCanvas.width = contactGlass.offsetWidth;
  let height = sparklesCanvas.height = contactGlass.offsetHeight;
  let sparkles = Array.from({length: 18}, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: 1.2 + Math.random() * 2.2,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    hue: 260 + Math.random() * 60
  }));
  function drawSparkles() {
    ctx.clearRect(0, 0, width, height);
    for (const s of sparkles) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
      ctx.fillStyle = `hsla(${s.hue}, 80%, 80%, 0.7)`;
      ctx.shadowColor = `hsla(${s.hue}, 80%, 80%, 0.7)`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
      s.x += s.dx;
      s.y += s.dy;
      if (s.x < 0 || s.x > width) s.dx *= -1;
      if (s.y < 0 || s.y > height) s.dy *= -1;
    }
    requestAnimationFrame(drawSparkles);
  }
  drawSparkles();
  window.addEventListener('resize', () => {
    width = sparklesCanvas.width = contactGlass.offsetWidth;
    height = sparklesCanvas.height = contactGlass.offsetHeight;
  });
}



// Animate hero text and project cards on load
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('hero')?.classList.add('animate-hero-reveal');
  document.querySelectorAll('.project-card').forEach(card => {
    card.classList.add('animate-fade-in-up');
  });
});

// 3D Cube Easter Egg (canvas)
const cubeCanvas = document.getElementById('cube-canvas');
if (cubeCanvas) {
  const ctx = cubeCanvas.getContext('2d');
  let angleX = 0.5, angleY = 0.5;
  let dragging = false, lastX, lastY;
  const size = 70;
  const vertices = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
  ];
  const edges = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7]
  ];
  function project([x, y, z]) {
    const scale = 90 / (z + 4);
    return [x * scale + 100, y * scale + 100];
  }
  function drawCube() {
    ctx.clearRect(0, 0, 200, 200);
    // Rotate
    const sinX = Math.sin(angleX), cosX = Math.cos(angleX);
    const sinY = Math.sin(angleY), cosY = Math.cos(angleY);
    const rotated = vertices.map(([x, y, z]) => {
      let nx = x * cosY - z * sinY;
      let nz = x * sinY + z * cosY;
      let ny = y * cosX - nz * sinX;
      nz = y * sinX + nz * cosX;
      return [nx, ny, nz];
    });
    // Draw edges
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#7c3aed';
    ctx.shadowBlur = 12;
    for (const [a, b] of edges) {
      const [x1, y1] = project(rotated[a]);
      const [x2, y2] = project(rotated[b]);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }
  function animate() {
    angleX += 0.01;
    angleY += 0.013;
    drawCube();
    requestAnimationFrame(animate);
  }
  animate();
  cubeCanvas.addEventListener('mousedown', e => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });
  window.addEventListener('mousemove', e => {
    if (dragging) {
      angleY += (e.clientX - lastX) * 0.01;
      angleX += (e.clientY - lastY) * 0.01;
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });
  window.addEventListener('mouseup', () => dragging = false);
}

// Project screenshot modal
const screenshotModal = document.getElementById('screenshot-modal');
const modalImg = document.getElementById('modal-img');
if (screenshotModal && modalImg) {
  document.querySelectorAll('.project-screenshots img').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      screenshotModal.classList.remove('hidden');
      setTimeout(() => screenshotModal.classList.add('show'), 10);
    });
  });
  screenshotModal.querySelector('.close-modal').addEventListener('click', () => {
    screenshotModal.classList.remove('show');
    setTimeout(() => screenshotModal.classList.add('hidden'), 300);
  });
  screenshotModal.addEventListener('click', (e) => {
    if (e.target === screenshotModal) {
      screenshotModal.classList.remove('show');
      setTimeout(() => screenshotModal.classList.add('hidden'), 300);
    }
  });
}

// Matrix-style code rain animation (purple)
const canvas = document.getElementById('code-rain');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  let fontSize = 18;
  let columns = Math.floor(width / fontSize);
  let drops = Array(columns).fill(1);
  const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  function draw() {
    ctx.fillStyle = 'rgba(26, 26, 46, 0.15)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = `hsl(${270 + Math.random()*30}, 80%, 70%)`;
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
  });
}

// Animate sections on scroll (fade/slide in)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('section').forEach(section => {
  section.classList.add('section-hidden');
  observer.observe(section);
});

// --- SITE-WIDE ANIMATED BLOBS ---
const bgBlobs = document.getElementById('animated-bg-blobs');
if (bgBlobs) {
  const colors = [
    'rgba(124,58,237,0.45)',
    'rgba(167,139,250,0.33)',
    'rgba(56,189,248,0.22)',
    'rgba(236,72,153,0.18)',
    'rgba(255,255,255,0.09)'
  ];
  for (let i = 0; i < 5; i++) {
    const blob = document.createElement('div');
    blob.className = 'blob';
    blob.style.background = colors[i % colors.length];
    blob.style.width = `${220 + Math.random()*180}px`;
    blob.style.height = `${220 + Math.random()*180}px`;
    blob.style.top = `${Math.random()*80}%`;
    blob.style.left = `${Math.random()*80}%`;
    blob.style.animationDuration = `${14 + Math.random()*8}s`;
    bgBlobs.appendChild(blob);
  }
}

// --- SITE-WIDE SPARKLES ---
const siteSparkles = document.getElementById('site-sparkles');
if (siteSparkles) {
  const ctx = siteSparkles.getContext('2d');
  let width = siteSparkles.width = window.innerWidth;
  let height = siteSparkles.height = window.innerHeight;
  let sparkles = Array.from({length: 32}, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: 0.7 + Math.random() * 1.7,
    dx: (Math.random() - 0.5) * 0.18,
    dy: (Math.random() - 0.5) * 0.18,
    hue: 260 + Math.random() * 60
  }));
  function drawSparkles() {
    ctx.clearRect(0, 0, width, height);
    for (const s of sparkles) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
      ctx.fillStyle = `hsla(${s.hue}, 80%, 80%, 0.7)`;
      ctx.shadowColor = `hsla(${s.hue}, 80%, 80%, 0.7)`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
      s.x += s.dx;
      s.y += s.dy;
      if (s.x < 0 || s.x > width) s.dx *= -1;
      if (s.y < 0 || s.y > height) s.dy *= -1;
    }
    requestAnimationFrame(drawSparkles);
  }
  drawSparkles();
  window.addEventListener('resize', () => {
    width = siteSparkles.width = window.innerWidth;
    height = siteSparkles.height = window.innerHeight;
  });
}

// --- Animate Section Entrances ---
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section').forEach((section, i) => {
    setTimeout(() => section.classList.add('section-visible'), 200 + i*180);
  });
});

// --- Animate Project Cards and Skills ---
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.opacity = 0;
  setTimeout(() => {
    card.classList.add('animate-fade-in-up');
    card.style.opacity = 1;
  }, 800 + i*180);
});
document.querySelectorAll('.skill-badge').forEach((badge, i) => {
  badge.style.opacity = 0;
  setTimeout(() => {
    badge.classList.add('animate-fade-in-up');
    badge.style.opacity = 1;
  }, 1200 + i*90);
});

// --- LAST.FM WIDGET ---
async function updateLastFM() {
  console.log("Updating Last.fm widget...");
  const widget = document.getElementById('lastfm-widget');
  const art = document.getElementById('lastfm-art');
  const placeholder = document.getElementById('album-placeholder');
  const track = document.getElementById('lastfm-track');
  const artist = document.getElementById('lastfm-artist');
  const album = document.getElementById('lastfm-album');
  
  if (!widget) return console.log("Widget not found");
  
  try {
    const res = await fetch('/api/lastfm');
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    
    if (data.track.image) {
      art.src = data.track.image;
      art.alt = data.track.name + ' Album Art';
      art.style.display = 'block';
      placeholder.style.display = 'none';
    } else {
      art.style.display = 'none';
      placeholder.style.display = 'flex';
    }
    
    track.textContent = data.track.name;
    artist.textContent = data.track.artist;
    album.textContent = data.track.album;
    widget.classList.toggle('nowplaying', !!data.nowplaying);
  } catch (error) {
    console.error('Error updating Last.fm:', error);
    art.style.display = 'none';
    placeholder.style.display = 'flex';
    track.textContent = 'Not available';
    artist.textContent = '';
    album.textContent = '';
  }
}
setInterval(updateLastFM, 10000);
updateLastFM();

// Animate Last.fm bars
const bars = document.querySelector('.lastfm-bars');
if (bars) {
  for (let i = 0; i < 8; i++) {
    const bar = document.createElement('div');
    bar.className = 'lastfm-bar';
    bar.style.animationDelay = `${i*0.13 + Math.random()*0.1}s`;
    bars.appendChild(bar);
  }
} 