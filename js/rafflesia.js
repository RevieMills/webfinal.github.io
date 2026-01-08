document.addEventListener('DOMContentLoaded', () => {
  const imagesDesktop = document.querySelectorAll('.circle-desktop .circle-img');
  const circleInner = document.querySelector('.circle-inner');
  const imagesMobile = document.querySelectorAll('.circle-inner .circle-img');
  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const wrapper = document.querySelector('.circle-wrapper');

  const defaultTitle = 'Default Title';
  const defaultText = 'Default description text here.';

  let rotation = 0;
  let isDragging = false;
  let startX = 0;

  // ---------------- Fade text update ----------------
  function fadeUpdateText(img) {
    title.style.opacity = 0;
    description.style.opacity = 0;
    setTimeout(() => {
      if (img) {
        title.textContent = img.dataset.title;
        description.innerHTML = img.dataset.text.replace(/\n/g, '<br>');
      } else {
        title.textContent = defaultTitle;
        description.innerHTML = defaultText.replace(/\n/g, '<br>');
      }
      title.style.opacity = 1;
      description.style.opacity = 1;
    }, 200);
  }

  // ---------------- Desktop Click ----------------
  imagesDesktop.forEach(img => {
    img.addEventListener('click', () => {
      fadeUpdateText(img);
      imagesDesktop.forEach(i => i.classList.remove('active'));
      img.classList.add('active');
    });
  });

  // ---------------- Drag rotation (mouse) ----------------
  circleInner.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      snapToNearest();
    }
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    startX = e.clientX;
    rotateBy(dx);
  });

  // ---------------- Drag rotation (touch) ----------------
  circleInner.addEventListener('touchstart', e => {
    if (e.touches && e.touches.length) {
      startX = e.touches[0].clientX;
    }
  }, { passive: true });

  circleInner.addEventListener('touchmove', e => {
    if (!e.touches || !e.touches.length) return;
    const dx = e.touches[0].clientX - startX;
    startX = e.touches[0].clientX;
    rotateBy(dx);
  }, { passive: true });

  circleInner.addEventListener('touchend', () => {
    snapToNearest();
  });

  // ---------------- Rotation helpers ----------------
  function applyTransform() {
    circleInner.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

    imagesMobile.forEach(img => {
    img.style.transform = `translate(-50%, -50%) rotate(${-rotation}deg)`;
  });

  }

  function rotateBy(deltaX) {
    rotation += deltaX * 0.3; // sensitivity
    applyTransform();
    // No text update here — only rotation
  }

  function snapToNearest() {
    const snapAngle = 360 / imagesMobile.length;
    const snapped = Math.round(rotation / snapAngle) * snapAngle;
    rotation = snapped;
    applyTransform();
    // No text update here either — keep default until user clicks
  }

  // ---------------- Mobile Click ----------------
  imagesMobile.forEach(img => {
    img.addEventListener('click', () => {
      fadeUpdateText(img);
      imagesMobile.forEach(i => i.classList.remove('active'));
      img.classList.add('active');
    });
  });

  // ---------------- Mobile layout fixes ----------------
  if (imagesMobile.length) {
    // Increase wrapper min-height based on image size to prevent clipping
    const maxImgSize = Math.max(...Array.from(imagesMobile).map(img => Math.max(img.offsetWidth, img.offsetHeight)));
    // Ensure enough height for the lowered circle
    wrapper.style.minHeight = `${Math.max(280, maxImgSize * 3)}px`;

    // Initial transform application only
    applyTransform();
  }
});