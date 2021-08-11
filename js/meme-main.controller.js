/** @type {HTMLCanvasElement} */
let gElCanvas;
/** @type {CanvasRenderingContext2D} */
let gCtx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

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

function renderMeme(isExport = false, after = null) {
  const meme = getMeme();
  const imgData = findImgById(meme.selectedImgId);
  const elImg = new Image();
  elImg.src = imgData.url;
  elImg.addEventListener('load', () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    loadText(meme.lines, isExport);
    if (isExport && after) {
      after();
    }
  });
}

function loadText(lines, isExport) {
  // const { width: w, height: h } = gElCanvas;
  lines.forEach((line, index) => {
    gCtx.lineWidth = 4;
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = line.color;
    gCtx.font = `${line.size}px ${line.fontFamily}`;
    gCtx.textAlign = line.align;
    gCtx.textBaseline = 'middle';
    gCtx.strokeText(line.txt, line.posX, line.posY);
    gCtx.fillText(line.txt, line.posX, line.posY);
    line.border = calcLineBorder(line);
    if (getMeme().selectedLineIdx === index && !isExport) {
      renderBorderAround(line);
    }
  });
}

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

function renderBorderAround(line) {
  const { startX, startY, endX, endY } = line.border;
  gCtx.strokeStyle = 'white';
  gCtx.lineWidth = 1;
  gCtx.strokeRect(startX, startY, endX - startX, endY - startY);
}

function checkClickInBorder(line, clickPos) {
  const { startX, startY, endX, endY } = line.border;
  if (clickPos.x > startX && clickPos.x < endX && clickPos.y > startY && clickPos.y < endY) {
    return true;
  }
  return false;
}

//#endregion Line Border calculations

//#region Canvas Settings

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetWidth;
  renderMeme();
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
  window.addEventListener('resize', () => {
    resizeCanvas();
  });
}
//#endregion

//#region Drag and Drop:

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove);
  gElCanvas.addEventListener('mousedown', onDown);
  gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove);
  gElCanvas.addEventListener('touchstart', onDown);
  gElCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
  const pos = getEvPos(ev);
  const { lines } = getMeme();
  lines.forEach((line, index) => {
    if (!checkClickInBorder(line, pos)) return;
    line.align = 'center';
    line.isDragging = true;
    setSelectedLine(index);
    renderMeme();
    initInputs();
  });
}

function onMove(ev) {
  const pos = getEvPos(ev);
  const { lines } = getMeme();
  document.body.style.cursor = 'default';
  for (const line of lines) {
    if (checkClickInBorder(line, pos)) document.body.style.cursor = 'grab';
    if (!line.isDragging) continue;
    line.posX = pos.x;
    line.posY = pos.y;
  }
  renderMeme();
}

function onUp() {
  const { lines } = getMeme();
  document.body.style.cursor = 'default';
  for (const line of lines) {
    line.isDragging = false;
  }
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

//#endregion Drag and Drop
