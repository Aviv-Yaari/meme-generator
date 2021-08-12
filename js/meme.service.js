let gSearchScores = SEARCH_SCORES_INIT;
let gImgs = IMGS_DB;
let gMeme = MEME_INIT;

let gSavedMemes = [];

function getImgs() {
  return gImgs;
}

function setImgs(newImgs) {
  gImgs = newImgs;
}

function findImgById(id) {
  return gImgs.find((img) => img.id === id);
}

function getMeme() {
  return gMeme;
}

function setMeme(newMeme) {
  gMeme = newMeme;
}

function getCurrentLine() {
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
  gMeme.selectedLineIdx = newLineIdx;
}

function updateLine(props, lineIdx = gMeme.selectedLineIdx) {
  const line = gMeme.lines[lineIdx];
  gMeme.lines[lineIdx] = { ...line, ...props };
}

function addLine(props) {
  const newLine = {
    txt: '',
    size: 30,
    align: 'center',
    color: '#000000',
    fontFamily: 'Impact',
    posX: null,
    posY: null,
    ...props,
  };
  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function removeCurrentLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  selectLine(+1);
}

//#region Saved memes
function getSavedMemes() {
  return gSavedMemes;
}

function loadMemes() {
  gSavedMemes = loadFromStorage();
  if (!gSavedMemes) gSavedMemes = [];
}

function saveMeme(img) {
  gMeme.previewImgUrl = img;
  gSavedMemes.push({ ...gMeme });
  saveToStorage(gSavedMemes);
}

function deleteSavedMeme(savedMemeIdx) {
  gSavedMemes.splice(savedMemeIdx, 1);
  saveToStorage(gSavedMemes);
}
//#endregion Saved memes

//#region Search

function getSearchScores() {
  return gSearchScores;
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
