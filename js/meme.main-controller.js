/** @type {HTMLCanvasElement} */
let gElCanvas;
/** @type {CanvasRenderingContext2D} */
let gCtx;

function initCanvas() {
  gElCanvas = document.querySelector('.meme-canvas');
  gCtx = gElCanvas.getContext('2d');
  addListeners();
  resizeCanvas();
  renderDefaultLines();
  renderMeme();
}

function renderDefaultLines() {
  const { lines } = getMeme();
  const { width: w, height: h } = gElCanvas;
  const defaultYs = [20, h - 20, h / 2]; // 20(top) for line 0, h-20(bottom) for line 1, h/2(middle) for line 2
  lines.forEach((line, index) => {
    updateLine({ posX: w / 2, posY: defaultYs[index] }, index);
  });
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
  // const { width: w, height: h } = gElCanvas;
  lines.forEach((line, index) => {
    gCtx.lineWidth = 4;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px Impact`;
    gCtx.textAlign = line.align;
    gCtx.textBaseline = 'middle';
    gCtx.strokeText(line.txt, line.posX, line.posY);
    gCtx.fillText(line.txt, line.posX, line.posY);
    if (getMeme().selectedLineIdx === index) {
      addBorderAround(line);
    }
  });
}

function addBorderAround(line) {
  gCtx.strokeStyle = 'white';
  gCtx.lineWidth = 1;

  const metrics = gCtx.measureText(line.txt);
  const top = metrics.actualBoundingBoxAscent * -1;
  const bottom = metrics.actualBoundingBoxDescent;
  const height = top - bottom;
  const width = metrics.width;
  // calc the position of the border according to the alignment of the text
  const calcPosX = { left: 0, center: line.posX - width / 2, right: line.posX - width };
  gCtx.strokeRect(calcPosX[line.align] - 5, line.posY + height / 2 - 5, width + 10, -height + 10);
}

// Canvas Controls:

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container');
  gElCanvas.width = elContainer.offsetWidth - 20;
  gElCanvas.height = elContainer.offsetWidth - 20;
  renderMeme();
}

function addListeners() {
  window.addEventListener('resize', () => {
    resizeCanvas();
  });
}
