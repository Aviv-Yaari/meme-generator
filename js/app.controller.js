function init() {
  renderGallery();
  // renderMemePage(1);
  loadMemes();
}

function renderGallery(imgs = getImgs()) {
  renderTags();
  document.body.className = '';
  document.body.classList.add('page-gallery');
  const elGallery = document.querySelector('.gallery-container');

  let strHTML;
  strHTML = imgs.map(
    (img) => `
    <img src="${img.url}"
    alt="${img.name}"
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
    onclick="renderMemePage(${img.id}, true, ${index})"
    oncontextmenu="onSavedMemeRightClick(event, ${index})"
    >`;
  });
  renderToast('Right click a picture to delete from saved memes');
  elContainer.innerHTML = strHTML.join('');
}

function renderMemePage(imgId, isSavedMeme = false, savedMemeIdx = null) {
  const search = document.querySelector('.search-input').value;
  incSearchScore(search.toLowerCase());
  document.body.className = '';
  document.body.classList.add('page-meme');
  updateMeme({ selectedImgId: imgId });
  if (isSavedMeme) setMeme(gSavedMemes[savedMemeIdx]);
  initInputs();
  initCanvas(isSavedMeme);
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

function onNavBtnClick(elBtn, func) {
  const elNavBtns = document.querySelectorAll('.navbar .nav-item');
  for (const elNavBtn of elNavBtns) {
    elNavBtn.classList.remove('clicked');
  }
  elBtn.classList.add('clicked');
  func();
}

function onSearch(elSearch) {
  const { value } = elSearch;
  renderGallery(filterImgs(value));
}

function renderTags() {
  const elTagsCont = document.querySelector('.tags-container');
  const tags = getSearchScores();
  let strHTML = '';
  for (const tag in tags) {
    const score = tags[tag];
    strHTML += `<span style="font-size:${score * 5}px;">${tag}</span>`;
  }
  elTagsCont.innerHTML = strHTML;
}
