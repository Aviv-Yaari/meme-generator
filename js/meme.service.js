const IMGS_DB = [
  { id: 1, name: 'angry trump', url: 'img/1.jpg', keywords: ['angry', 'celeb'] },
  { id: 2, name: 'puppies', url: 'img/2.jpg', keywords: ['cute', 'pets'] },
  { id: 3, name: 'sleeping baby and puppy', url: 'img/3.jpg', keywords: ['baby', 'cute', 'pets'] },
  { id: 4, name: 'sleeping cat', url: 'img/4.jpg', keywords: ['cute', 'pets'] },
  { id: 5, name: 'success baby', url: 'img/5.jpg', keywords: ['baby'] },
  { id: 6, name: 'sleeping baby and puppy', url: 'img/6.jpg', keywords: ['cute'] },
  { id: 7, name: 'surprised baby', url: 'img/7.jpg', keywords: ['cute', 'funny'] },
  { id: 8, name: 'tell me more wonka', url: 'img/8.jpg', keywords: ['movies', 'sarcastic'] },
  { id: 9, name: 'evil baby', url: 'img/9.jpg', keywords: ['cute', 'funny', 'baby'] },
  { id: 10, name: 'laughing obame', url: 'img/10.jpg', keywords: ['funny', 'celeb'] },
  { id: 11, name: 'kissing wrestlers', url: 'img/11.jpg', keywords: ['awkward', 'funny'] },
  { id: 12, name: 'what would you do', url: 'img/12.jpg', keywords: ['celeb', 'tv'] },
  { id: 13, name: 'dicaprio raising glass', url: 'img/13.jpg', keywords: ['party', 'movies'] },
  { id: 14, name: 'what if i told you', url: 'img/14.jpg', keywords: ['celeb', 'movies'] },
  { id: 15, name: 'one does not simply', url: 'img/15.jpg', keywords: ['movies'] },
  { id: 16, name: 'laughing captain', url: 'img/16.jpg', keywords: ['movies', 'funny'] },
  { id: 17, name: 'putin peace', url: 'img/17.jpg', keywords: ['celeb'] },
  { id: 18, name: 'look at all', url: 'img/18.jpg', keywords: ['movies'] },
];

let gSearchScores = { funny: 5, celeb: 10, movies: 4 };
let gImgs = IMGS_DB;
let gMeme = {
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
  gSearchScores[search]++;
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
