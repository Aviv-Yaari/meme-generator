function init() {
  // renderGallery();
  renderMemePage(1);
  loadMemes();
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

function renderSavedMemes() {
  document.body.className = '';
  document.body.classList.add('page-saved-memes');
  const elContainer = document.querySelector('.saved-memes-container');

  let strHTML;
  const savedMemes = getSavedMemes();
  strHTML = savedMemes.map((meme, index) => {
    const img = findImgById(meme.selectedImgId);
    return `
    <img src="${meme.previewImgUrl}"
    alt="${img.name}"
    width="250"
    height="250"
    onclick="renderSavedMemePage(${img.id}, ${index})"
    oncontextmenu="onSavedMemeRightClick(event, ${index})"
    >`;
  });
  elContainer.innerHTML = strHTML.join('');
}

function renderMemePage(imgId) {
  document.body.className = '';
  document.body.classList.add('page-meme');
  updateMeme({ selectedImgId: imgId });
  initInputs();
  initCanvas();
}

function renderSavedMemePage(imgId, savedMemeIdx) {
  setMeme(gSavedMemes[savedMemeIdx]);
  renderMemePage(imgId);
}

function onSavedMemeRightClick(ev, savedMemeIdx) {
  ev.preventDefault();
  deleteSavedMeme(savedMemeIdx);
  renderSavedMemes();
}

function renderToast(message) {
  const elToast = document.querySelector('.toast');
  elToast.textContent = message;
  setTimeout(() => {
    elToast.textContent = '';
  }, 1000);
}
