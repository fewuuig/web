let currentIndex = 0;

function slide(direction) {
  const container = document.querySelector('.introduce-imgs');
  const images = document.querySelectorAll('.introduce-img');
  const total = images.length;

  currentIndex += direction;
  if (currentIndex < 0) currentIndex = total - 1;
  if (currentIndex >= total) currentIndex = 0;

  const offset = currentIndex * images[0].clientWidth;
  container.style.transform = `translateX(-${offset}px)`;
}