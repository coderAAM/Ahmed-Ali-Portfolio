// Canvas particle network effect
const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

function sizeCanvasToContainer() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width);
  canvas.height = Math.floor(rect.height);
}

sizeCanvasToContainer();
window.addEventListener('resize', sizeCanvasToContainer);

const particleCount = 80;
const particles = [];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticles() {
  particles.length = 0;
  const radiusBase = Math.min(canvas.width, canvas.height) * 0.5;
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = randomBetween(radiusBase * 0.2, radiusBase * 0.95);
    particles.push({
      x: canvas.width / 2 + Math.cos(angle) * distance,
      y: canvas.height / 2 + Math.sin(angle) * distance,
      vx: randomBetween(-0.6, 0.6),
      vy: randomBetween(-0.6, 0.6),
      r: randomBetween(1.2, 2.2)
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background gradient glow
  const grad = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    Math.min(canvas.width, canvas.height) * 0.05,
    canvas.width / 2,
    canvas.height / 2,
    Math.min(canvas.width, canvas.height) * 0.55
  );
  grad.addColorStop(0, 'rgba(0, 121, 107, 0.15)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw and update particles
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const dx = p.x - cx;
    const dy = p.y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxR = Math.min(canvas.width, canvas.height) * 0.48;
    if (dist > maxR) {
      const angle = Math.atan2(dy, dx);
      p.x = cx + Math.cos(angle) * maxR;
      p.y = cy + Math.sin(angle) * maxR;
      p.vx *= -0.9;
      p.vy *= -0.9;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = '#00796b';
    ctx.fill();
  }

  // Connect lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d2 = dx * dx + dy * dy;
      const maxDist = Math.pow(Math.min(canvas.width, canvas.height) * 0.22, 2);
      if (d2 < maxDist) {
        const alpha = 1 - d2 / maxDist;
        ctx.strokeStyle = `rgba(0,121,107,${alpha * 0.7})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawParticles);
}

createParticles();
drawParticles();

// GSAP animations
gsap.from(".hero-text h2", { duration: 1, y: -50, opacity: 0, ease: "bounce" });
gsap.from(".hero-text p", { duration: 1.5, opacity: 0, delay: 0.5 });
gsap.from(".hero-img img", { duration: 1, scale: 0.85, opacity: 0, delay: 0.6, ease: "power2.out" });
gsap.from(".service-card", {
  scrollTrigger: ".services",
  duration: 1,
  y: 50,
  opacity: 0,
  stagger: 0.3
});
gsap.from(".exp-card", {
  scrollTrigger: ".experience",
  duration: 1,
  x: -50,
  opacity: 0,
  stagger: 0.3
});
gsap.from(".work-item", {
  scrollTrigger: ".works",
  duration: 1,
  y: 50,
  opacity: 0,
  stagger: 0.3
});



// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");

  // Toggle icon
  if (navLinks.classList.contains("show")) {
    menuToggle.textContent = "✖";
  } else {
    menuToggle.textContent = "☰";
  }
});

// Close menu when link clicked
navItems.forEach(item => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuToggle.textContent = "☰"; // reset icon
  });
});



// GSAP animation for process steps
gsap.from(".step", {
    scrollTrigger: ".process",
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 1,
    ease: "power2.out"
  });
  


