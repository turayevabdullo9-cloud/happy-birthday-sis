interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  shape: 'rect' | 'circle';
}

const LUXURY_CONFETTI_COLORS = [
  '#C9A96E', // Champagne gold
  '#B87A7A', // Muted rose
  '#EAD2CE', // Soft blush pink
  '#D4B98C', // Warm antique gold
  '#9E6263', // Deep rosewood
  '#F5ECE0', // Warm ivory
];

export function launchLuxuryConfetti(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const particles: ConfettiParticle[] = Array.from({ length: 120 }, (_, i) => {
    const fromLeft = i % 2 === 0;
    const startX = fromLeft ? width * 0.25 : width * 0.75;
    const angle = fromLeft
      ? -Math.PI / 2 + (Math.random() - 0.25) * 0.9
      : -Math.PI / 2 + (Math.random() - 0.75) * 0.9;
    const speed = 7 + Math.random() * 8;

    return {
      x: startX + (Math.random() - 0.5) * 140,
      y: height * 0.68 + (Math.random() - 0.5) * 60,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      size: 6 + Math.random() * 6,
      color: LUXURY_CONFETTI_COLORS[i % LUXURY_CONFETTI_COLORS.length],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.14,
      opacity: 1,
      shape: i % 4 === 0 ? 'circle' : 'rect',
    };
  });

  let animId = 0;
  let frame = 0;

  const tick = () => {
    frame += 1;
    ctx.clearRect(0, 0, width, height);

    let activeCount = 0;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.19; // gentle gravity
      p.vx *= 0.992;
      p.rotation += p.rotationSpeed;

      if (frame > 90) {
        p.opacity = Math.max(0, p.opacity - 0.014);
      }

      if (p.opacity > 0.02 && p.y < height + 40) {
        activeCount += 1;
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.65);
        }
        ctx.restore();
      }
    }

    if (activeCount > 0 && frame < 240) {
      animId = window.requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  };

  animId = window.requestAnimationFrame(tick);
  return () => {
    window.cancelAnimationFrame(animId);
    ctx.clearRect(0, 0, width, height);
  };
}
