function init() {
  renderGallery();
  // renderMemePage(1);
  loadMemes();
}

//#region main render functions:

function renderGallery(imgs = getImgs()) {
  renderTags();
  document.body.className = '';
  document.body.classList.add('page-gallery');
  const elGallery = document.querySelector('.gallery-container');
  let strHTML;
  strHTML = imgs.map(
    (img) => `
    <div class="img-container">
    <img src="${img.url}"
    alt="${img.name}"
    onclick="renderMemePage('${img.id}')"
    onmouseover="onImageHover(this, '${img.id}')"
    onmouseleave="onImageLeave()"
    >
    <div class="img-info">
    <section>
    <span>${img.name}</span>
    </section>
    <section>
    <span>tags: ${img.keywords.join(', ')}</span>
    </section>
    </div>
    </div>`
  );
  const strHTMLUpload = `
  <input onchange="loadImage(event, addCustomMeme)" class="input-upload" type="file" hidden />
  <div class="img-container">
  <img
  src="img/upload.jpg"
  class="upload-img"
  onclick="document.querySelector('.input-upload').click()">
  </div>`;
  elGallery.innerHTML = strHTMLUpload + strHTML.join('');
}

function renderSavedMemes() {
  document.body.className = '';
  document.body.classList.add('page-saved-memes');
  const elContainer = document.querySelector('.saved-memes-container');
  const savedMemes = getSavedMemes();
  let strHTML;
  strHTML = savedMemes.map((meme, index) => {
    const img = findImgById(meme.selectedImgId);
    return `
    <div class="img-container">
    <img src="${meme.previewImgUrl}"
    alt="${img.name}"
    onclick="renderMemePage('${img.id}', true, ${index})">
    <button class="btn-remove" onclick="onDeleteSavedMeme(event, ${index})">
    <img src="img/remove.svg" />
    </button>
    </div>`;
  });
  elContainer.innerHTML = strHTML.join('');
}

function renderMemePage(imgId, isSavedMeme = false, savedMemeIdx = null) {
  const elSearch = document.querySelector('.search-input');
  incSearchScore(elSearch.value.toLowerCase());
  elSearch.value = '';
  document.body.className = '';
  document.body.classList.add('page-meme');
  updateMeme({ ...JSON.parse(JSON.stringify(MEME_INIT)), selectedImgId: imgId });
  if (isSavedMeme) setMeme(gSavedMemes[savedMemeIdx]);
  renderInputs();
  initCanvas(isSavedMeme);
}

function renderTags() {
  const elTagsCont = document.querySelector('.tags-container');
  const tags = getSearchScores();
  const tagsLength = getTagsLength();
  const count = Object.keys(tags).length;
  const lessHTML = `<span class="tag tag-less" onclick="onLessMoreClick(-3)">Less...</span>`;
  const moreHTML = `<span class="tag tag-more" onclick="onLessMoreClick(3)">More...</span>`;
  let strHTML = count > 0 ? lessHTML : '';
  for (const tag in tags) {
    const score = tags[tag];
    strHTML += `<span class="tag" onclick="onSearch('${tag}')" style="font-size:${
      score * 5
    }px;">${tag}</span>`;
  }
  elTagsCont.innerHTML = count < tagsLength ? strHTML + moreHTML : strHTML;
}

function renderToast(message, timeout = 2000) {
  const elToast = document.querySelector('.toast');
  elToast.hidden = false;
  elToast.textContent = message;
  setTimeout(() => {
    elToast.hidden = true;
  }, timeout);
}

//#endregion main render functions

function onDeleteSavedMeme(ev, savedMemeIdx) {
  ev.stopPropagation();
  deleteSavedMeme(savedMemeIdx);
  renderSavedMemes();
}

function onNavBtnClick(elBtn, func) {
  const elNavBtns = document.querySelectorAll('.navbar .nav-item');
  for (const elNavBtn of elNavBtns) {
    elNavBtn.classList.remove('clicked');
  }
  elBtn.classList.add('clicked');
  func();
}

function onSearch(value) {
  renderGallery(filterImgs(value));
}

function onLessMoreClick(num) {
  loadTags(num);
  renderTags();
}

function onAboutBtnClick(type) {
  const urls = {
    facebook: 'https://www.facebook.com/aviv.yaari/',
    linkedin: 'https://www.linkedin.com/in/aviv-yaari-8a797a197/',
    github: 'https://github.com/Aviv-Yaari/',
  };
  window.open(urls[type], '_blank');
}

function onImageHover(elImg, imgId) {
  const elMemeInfo = document.createElement('div');
  elMemeInfo.classList.add('meme-info');
  elMemeInfo.textContent = 'test!!';
  elMemeInfo.hidden = false;
  elImg.append(elMemeInfo);
}

function onImageLeave() {
  // const elMemeInfo = document.querySelector('.meme-info');
  // elMemeInfo.hidden = true;
}
