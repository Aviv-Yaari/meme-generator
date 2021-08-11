/** @type {HTMLCanvasElement} */
let gElCanvas;
/** @type {CanvasRenderingContext2D} */
let gCtx;

function initCanvas() {
  gElCanvas = document.querySelector('.meme-canvas');
  gCtx = gElCanvas.getContext('2d');
  addListeners();
  resizeCanvas();
  renderMeme();
}

function renderMeme() {
  const meme = getMeme();
  const imgData = findImgById(meme.selectedImgId);
  const elImg = new Image();
  elImg.src = imgData.url;
  elImg.addEventListener('load', () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    loadText(meme.lines);
  });
}

function loadText(lines) {
  const { width: w, height: h } = gElCanvas;
  const centerX = w / 2;
  const heights = [20, h - 20, h / 2];
  const aligns = { left: 0, center: centerX, right: w };
  lines.forEach((line, index) => {
    gCtx.lineWidth = 4;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px Impact`;
    gCtx.textAlign = line.align;
    gCtx.textBaseline = 'middle';
    gCtx.strokeText(line.txt, aligns[line.align], heights[index]);
    gCtx.fillText(line.txt, aligns[line.align], heights[index], w);
  });
}

// Meme data controls:
function initInputs() {
  selectLine(0);
  const meme = getMeme();
  if (!meme.lines.length) return;
  const elInputs = Array.from(document.querySelectorAll('.meme-controls > input'));
  for (const elInput of elInputs) {
    elInput.value = meme.lines[0][elInput.name];
  }
}

function onLineUpdate(el) {
  const { name, value } = el;
  setLine({ [name]: value });
  renderMeme();
}

// Canvas Controls:

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container');
  //   const data = gCtx.getImageData(0, 0, gElCanvas.width, gElCanvas.height);
  gElCanvas.width = elContainer.offsetWidth - 20;
  gElCanvas.height = elContainer.offsetHeight - 20;
  renderMeme();
  //   gCtx.putImageData(data, 0, 0);
}

function addListeners() {
  window.addEventListener('resize', () => {
    resizeCanvas();
  });
}
