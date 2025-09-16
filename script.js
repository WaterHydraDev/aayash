(function () {
  const plane = document.getElementById('plane');

  const fps = 24;
  const duration = 3000;
  const easing = t => 1 - Math.pow(1 - t, 3);

  function computePositions() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const w = plane.offsetWidth;
    const h = plane.offsetHeight;

    const endX = (vw - w) / 2;
    const endY = (vh - h) / 2;

    const visiblePart = w * 0.4; 
    const startX = - (w - visiblePart);
    const startY = endY;

    return { start: { x: startX, y: startY }, end: { x: endX, y: endY } };
  }

  function animate() {
    const { start, end } = computePositions();

    // Initial placement
    plane.style.transform = `translate(${start.x}px, ${start.y}px)`;

    let startTime = performance.now();
    const frameInterval = 1000 / fps;

    const timer = setInterval(() => {
      const now = performance.now();
      let t = (now - startTime) / duration;
      if (t > 1) t = 1;
      const eased = easing(t);

      const curX = start.x + (end.x - start.x) * eased;
      const curY = start.y + (end.y - start.y) * eased;

      plane.style.transform = `translate(${curX}px, ${curY}px)`;

      if (t >= 1) clearInterval(timer);
    }, frameInterval);
  }

  window.addEventListener('load', animate);
  window.addEventListener('resize', animate);
})();