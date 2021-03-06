/** @type {HTMLCanvasElement} */
let gElCanvas;
/** @type {CanvasRenderingContext2D} */
let gCtx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

//#region Basic actions

function initCanvas(isSavedMeme = false) {
  gElCanvas = document.querySelector('.meme-canvas');
  gCtx = gElCanvas.getContext('2d');
  addListeners();
  resizeCanvas();
  if (!isSavedMeme) renderDefaultLines();
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

function renderMeme(exportFunc = null) {
  // if isDragging - lighten the function to require less resources
  const meme = getMeme();
  const imgData = findImgById(meme.selectedImgId);
  const elImg = new Image();
  elImg.src = imgData.url;
  elImg.addEventListener('load', () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    const isExport = exportFunc ? true : false;
    loadText(meme.lines, isExport);
    if (exportFunc) exportFunc();
  });
}

function loadText(lines, isExport) {
  lines.forEach((line, index) => {
    gCtx.lineWidth = 4;
    gCtx.fillStyle = line.fillColor;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.font = `${line.size}px ${line.fontFamily}`;
    gCtx.textAlign = line.align;
    gCtx.textBaseline = 'middle';
    gCtx.strokeText(line.txt, line.posX, line.posY);
    gCtx.fillText(line.txt, line.posX, line.posY);
    line.border = calcLineBorder(line);
    line.resizeBorder = calcLineResizeBorder(line);
    if (getMeme().selectedLineIdx === index && !isExport) {
      renderBorderAround(line);
      renderResizeBorder(line);
    }
  });
}
//#endregion Basic actions

//#region Line Border calculations:

function calcLineBorder(line) {
  const metrics = gCtx.measureText(line.txt);
  const top = metrics.actualBoundingBoxAscent * -1;
  const bottom = metrics.actualBoundingBoxDescent;
  const height = top - bottom;
  const width = metrics.width;
  const calcPosX = { left: 0, center: line.posX - width / 2, right: line.posX - width };
  const startX = calcPosX[line.align] - 5;
  const startY = line.posY + height / 2 - 5;
  return {
    startX,
    startY,
    endX: startX + width + 10,
    endY: startY - height + 10,
  };
}

function calcLineResizeBorder(line) {
  const { endX, endY } = line.border;
  return { startX: endX, startY: endY, endY: endY + 20, endX: endX + 20 };
}

function renderBorderAround(line) {
  const { startX, startY, endX, endY } = line.border;
  gCtx.strokeStyle = 'white';
  gCtx.lineWidth = 1;
  gCtx.strokeRect(startX, startY, endX - startX, endY - startY);
}

function renderResizeBorder(line) {
  const { startX, startY } = line.resizeBorder;
  const img = new Image();
  img.src = 'img/resize-icon.png';
  img.onload = () => {
    gCtx.fillRect(startX, startY, 20, 20);
    gCtx.drawImage(img, startX, startY, 20, 20);
  };
}

function checkClickInBorder(line, clickPos, type) {
  const { startX, startY, endX, endY } = line[type];
  if (clickPos.x > startX && clickPos.x < endX && clickPos.y > startY && clickPos.y < endY) {
    return true;
  }
  return false;
}

//#endregion Line Border calculations

//#region Canvas Settings

function resizeCanvas() {
  const { selectedImgId } = getMeme();
  const { url: imgUrl } = findImgById(selectedImgId);
  const elContainer = document.querySelector('.canvas-container');
  const img = new Image();
  img.src = imgUrl;
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = (img.height * elContainer.offsetWidth) / img.width;
  renderMeme();
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
  window.addEventListener('resize', () => {
    resizeCanvas();
  });
}
//#endregion Canvas Settings
