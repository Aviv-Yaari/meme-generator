const gImgs = [
  { id: 1, name: 'Angry Trump', url: 'img/1.jpg', keywords: ['angry', 'celeb'] },
  { id: 2, name: 'Puppies', url: 'img/2.jpg', keywords: ['cute', 'pets'] },
  { id: 3, name: 'Sleeping Baby and Puppy', url: 'img/3.jpg', keywords: ['baby', 'cute', 'pets'] },
  { id: 4, name: 'Sleeping Cat', url: 'img/4.jpg', keywords: ['cute', 'pets'] },
  { id: 5, name: 'Success Baby', url: 'img/5.jpg', keywords: ['baby'] },
  { id: 6, name: 'Sleeping Baby and Puppy', url: 'img/6.jpg', keywords: ['cute'] },
  { id: 7, name: 'Surprised Baby', url: 'img/7.jpg', keywords: ['cute', 'funny'] },
  { id: 8, name: 'Tell Me More Wonka', url: 'img/8.jpg', keywords: ['movies', 'sarcastic'] },
  { id: 9, name: 'Evil Baby', url: 'img/9.jpg', keywords: ['cute', 'funny', 'baby'] },
  { id: 10, name: 'Laughing Obame', url: 'img/10.jpg', keywords: ['funny', 'celeb'] },
  { id: 11, name: 'Kissing Wrestlers', url: 'img/11.jpg', keywords: ['awkward', 'funny'] },
  { id: 12, name: 'What Would You Do', url: 'img/12.jpg', keywords: ['celeb', 'tv'] },
  { id: 13, name: 'Dicaprio Raising Glass', url: 'img/13.jpg', keywords: ['party', 'movies'] },
  { id: 14, name: 'What if I Told You', url: 'img/14.jpg', keywords: ['celeb', 'movies'] },
  { id: 15, name: 'One Does Not Simply', url: 'img/15.jpg', keywords: ['movies'] },
  { id: 16, name: 'Laughing Captain', url: 'img/16.jpg', keywords: ['movies', 'funny'] },
  { id: 17, name: 'Putin Peace', url: 'img/17.jpg', keywords: ['celeb'] },
  { id: 18, name: 'Look at All', url: 'img/18.jpg', keywords: ['movies'] },
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
