let gSearchScores = SEARCH_SCORES_INIT;
let gImgs = loadFromStorage('imgs') || IMGS_DB;
let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Top Line',
      size: 30,
      align: 'center',
      strokeColor: '#000000',
      fillColor: '#FFFFFF',
      fontFamily: 'Impact',
      posX: null,
      posY: null,
      isDragging: false,
    },
    {
      txt: 'Bottom Line',
      size: 30,
      align: 'center',
      strokeColor: '#000000',
      fillColor: '#FFFFFF',
      fontFamily: 'Impact',
      posX: null,
      posY: null,
      isDragging: false,
    },
  ],
};
let gTagsToDisp = 3;
let gSavedMemes = [];

//#region images

function getImgs() {
  return gImgs;
}

function setImgs(newImgs) {
  gImgs = newImgs;
  saveToStorage('imgs', gImgs);
}

function findImgById(id) {
  return gImgs.find((img) => img.id === id);
}

//#endregion images

function getMeme() {
  return gMeme;
}

function setMeme(newMeme) {
  gMeme = newMeme;
}

function getCurrentLine() {
  if (!gMeme.lines.length) return false;
  return gMeme.lines[gMeme.selectedLineIdx];
}

function updateMeme(props) {
  gMeme = { ...gMeme, ...props };
  return gMeme;
}

function setSelectedLine(lineIdx) {
  gMeme.selectedLineIdx = lineIdx;
}

function selectLine(diff) {
  let newLineIdx = gMeme.selectedLineIdx + diff;
  if (newLineIdx >= gMeme.lines.length) {
    newLineIdx = 0;
  }
  if (!gMeme.lines.length) {
    newLineIdx = -1;
  }
  gMeme.selectedLineIdx = newLineIdx;
}

function updateLine(props, lineIdx = gMeme.selectedLineIdx) {
  if (!gMeme.lines.length) return;
  const line = gMeme.lines[lineIdx];
  gMeme.lines[lineIdx] = { ...line, ...props };
}

function addLine(props) {
  const newLine = {
    txt: '',
    size: 30,
    align: 'center',
    strokeColor: '#000000',
    fillColor: '#FFFFFF',
    fontFamily: 'Impact',
    posX: null,
    posY: null,
    ...props,
  };
  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function removeCurrentLine() {
  if (!gMeme.lines.length) return;
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  selectLine(+1);
}

//#region Saved memes
function getSavedMemes() {
  return gSavedMemes;
}

function loadMemes() {
  gSavedMemes = loadFromStorage('saved-memes');
  if (!gSavedMemes) gSavedMemes = [];
}

function saveMeme(img) {
  gMeme.previewImgUrl = img;
  gSavedMemes.push({ ...gMeme });
  saveToStorage('saved-memes', gSavedMemes);
}

function deleteSavedMeme(savedMemeIdx) {
  gSavedMemes.splice(savedMemeIdx, 1);
  saveToStorage('saved-memes', gSavedMemes);
}
//#endregion Saved memes

//#region Search

function getSearchScores() {
  return Object.fromEntries(Object.entries(gSearchScores).slice(0, gTagsToDisp));
}

function getTagsLength() {
  return Object.keys(gSearchScores).length;
}

function loadTags(num) {
  const tagsCount = getTagsLength();
  if (gTagsToDisp + num >= tagsCount) {
    gTagsToDisp = tagsCount;
  } else if (gTagsToDisp + num <= 0) {
    gTagsToDisp = 0;
  } else {
    gTagsToDisp += num;
  }
}

function incSearchScore(search) {
  if (!search) return;
  if (!gSearchScores[search]) gSearchScores[search] = 0;
  if (gSearchScores[search] < 12) gSearchScores[search]++; // (max score is 12)
}

function filterImgs(search) {
  if (!search) {
    return IMGS_DB;
  }
  const searchToLower = search.toLowerCase();
  return gImgs.filter(
    (img) =>
      img.name.includes(searchToLower) ||
      img.keywords.some((keyword) => keyword.includes(searchToLower))
  );
}

//#endregion Search
