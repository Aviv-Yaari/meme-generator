function init() {
  // renderGallery();
  renderMemePage(1);
}

function renderGallery() {
  document.body.className = '';
  document.body.classList.add('page-gallery');
  const elGallery = document.querySelector('.gallery-container');

  let strHTML;
  const imgs = getImgs();
  strHTML = imgs.map(
    (img) => `
    <img src="${img.url}"
    alt="${img.name}"
    width="250"
    height="250"
    onclick="renderMemePage(${img.id})"
    >`
  );
  elGallery.innerHTML = strHTML.join('');
}

function renderMemePage(imgId) {
  document.body.className = '';
  document.body.classList.add('page-meme');
  setMeme({ selectedImgId: imgId });
  initInputs();
  const elCanvasCont = document.querySelector('.canvas-container');
  // Todo - change to fit more aspect ratios
  elCanvasCont.style.width = '400px';
  elCanvasCont.style.height = '400px';
  initCanvas();
}

function renderToast(message) {
  const elToast = document.querySelector('.toast');
  elToast.textContent = message;
  setTimeout(() => {
    elToast.textContent = '';
  }, 1000);
}
