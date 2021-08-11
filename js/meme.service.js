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
      color: 'white',
    },
    {
      txt: 'Center Line',
      size: 20,
      align: 'center',
      color: 'white',
    },
    {
      txt: 'Bottom Line',
      size: 20,
      align: 'center',
      color: 'white',
    },
  ],
};

function getImgs() {
  return gImgs;
}

function findImgById(id) {
  return gImgs.find((img) => img.id === id);
}

function getMeme() {
  return gMeme;
}

function setMeme(props) {
  gMeme = { ...gMeme, ...props };
  return gMeme;
}

function selectLine(diff) {
  gMeme.selectedLineIdx += diff;
}

function setLine(props) {
  const { selectedLineIdx } = gMeme;
  const line = gMeme.lines[selectedLineIdx];
  gMeme.lines[selectedLineIdx] = { ...line, ...props };
}
