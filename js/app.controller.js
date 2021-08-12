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
    onclick="renderMemePage('${img.id}')"
    >`
  );
  const strHTMLUpload = `<input onchange="loadImage(event, addCustomMeme)" class="input-upload" type="file" hidden />
  <img src="img/upload.jpg" class="upload-img" onclick="document.querySelector('.input-upload').click()">`;
  elGallery.innerHTML = strHTMLUpload + strHTML.join('');
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
    onclick="renderMemePage('${img.id}', true, ${index})"
    oncontextmenu="onSavedMemeRightClick(event, ${index})"
    >`;
  });
  renderToast('Right click a picture to delete from saved memes');
  elContainer.innerHTML = strHTML.join('');
}

function renderMemePage(imgId, isSavedMeme = false, savedMemeIdx = null, isCustomMeme = false) {
  const elSearch = document.querySelector('.search-input');
  incSearchScore(elSearch.value.toLowerCase());
  elSearch.value = '';
  document.body.className = '';
  document.body.classList.add('page-meme');
  // Had to repeat myself here in declaring the meme default (also declared in meme service),
  // could not find a better solution that wasnt messier.
  const memeDefault = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'Top Line',
        size: 30,
        align: 'center',
        color: '#000000',
        fontFamily: 'Impact',
        posX: null,
        posY: null,
        isDragging: false,
      },
      {
        txt: 'Bottom Line',
        size: 30,
        align: 'center',
        color: '#000000',
        fontFamily: 'Impact',
        posX: null,
        posY: null,
        isDragging: false,
      },
    ],
  };
  updateMeme({ ...memeDefault, selectedImgId: imgId });
  if (isSavedMeme) setMeme(gSavedMemes[savedMemeIdx]);
  initInputs();
  initCanvas(isSavedMeme);
}

function onSavedMemeRightClick(ev, savedMemeIdx) {
  ev.preventDefault();
  deleteSavedMeme(savedMemeIdx);
  renderSavedMemes();
}

function renderToast(message, timeout = 2000) {
  const elToast = document.querySelector('.toast');
  elToast.hidden = false;
  elToast.textContent = message;
  setTimeout(() => {
    elToast.hidden = true;
  }, timeout);
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
