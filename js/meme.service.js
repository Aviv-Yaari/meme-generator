const gImgs = [
  { id: 1, name: 'Angry Trump', url: 'img/1.jpg', keywords: ['angry'] },
  { id: 2, name: 'Puppies', url: 'img/2.jpg', keywords: ['cute'] },
  { id: 3, name: 'Sleeping Baby and Puppy', url: 'img/3.jpg', keywords: ['cute'] },
];
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

// Saved memes:

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
