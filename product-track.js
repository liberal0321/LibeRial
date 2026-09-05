document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.getElementById('productMainImage');
  const thumbs = Array.from(document.querySelectorAll('.product-thumb'));
  const prev = document.querySelector('.gallery-arrow-prev');
  const next = document.querySelector('.gallery-arrow-next');
  const current = document.getElementById('galleryCurrent');
  let index = 0;

  function showImage(newIndex){
    index = (newIndex + thumbs.length) % thumbs.length;
    const thumb = thumbs[index];
    mainImage.style.opacity = '.25';
    setTimeout(() => {
      mainImage.src = thumb.dataset.image;
      mainImage.alt = thumb.dataset.alt || '';
      mainImage.style.opacity = '1';
    }, 100);
    thumbs.forEach((t,i) => t.classList.toggle('is-active', i === index));
    current.textContent = String(index + 1);
  }

  thumbs.forEach((thumb,i) => thumb.addEventListener('click', () => showImage(i)));
  prev.addEventListener('click', () => showImage(index - 1));
  next.addEventListener('click', () => showImage(index + 1));

  let touchStartX = null;
  mainImage.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, {passive:true});

  mainImage.addEventListener('touchend', e => {
    if(touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if(Math.abs(delta) > 45) showImage(delta < 0 ? index + 1 : index - 1);
    touchStartX = null;
  }, {passive:true});

  const colorButtons = document.querySelectorAll('[data-option="color"] .option-btn');
  const sizeButtons = document.querySelectorAll('[data-option="size"] .option-btn');
  const colorLabel = document.getElementById('selectedColorLabel');
  const sizeLabel = document.getElementById('selectedSizeLabel');
  const buyButton = document.getElementById('buyButton');

  colorButtons.forEach(btn => btn.addEventListener('click', () => {
    colorButtons.forEach(b => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');
    colorLabel.textContent = btn.dataset.value;
    showImage(btn.dataset.value === 'BLACK' ? 3 : 1);
  }));

  sizeButtons.forEach(btn => btn.addEventListener('click', () => {
    sizeButtons.forEach(b => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');
    sizeLabel.textContent = btn.dataset.value;
    buyButton.disabled = false;
    buyButton.querySelector('span:first-child').textContent = '購入する';
  }));
});
