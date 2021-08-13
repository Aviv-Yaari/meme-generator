function initInputs() {
  document.querySelector('.meme-txt').value = '';
  const line = getCurrentLine();
  if (!line) return;
  const elInputs = Array.from(
    document.querySelectorAll('.meme-controls >* input, .meme-controls >* select ')
  );
  for (const elInput of elInputs) {
    elInput.value = line[elInput.name];
  }
}

function onLineChange() {
  const line = getCurrentLine();
  if (!line) return;
  if (!line.txt) {
    removeCurrentLine();
    renderToast('Empty line auto-deleted');
  }
  selectLine(+1);
  initInputs();
  renderMeme();
}

function onLineUpdate(el) {
  const { name, value } = el;
  updateLine({ [name]: value });
  renderMeme();
}

function onChangeTextSize(type) {
  const line = getCurrentLine();
  if (!line) return;
  const { size: currSize } = line;
  if (type === 'inc') {
    updateLine({ size: currSize + 5 });
  } else {
    updateLine({ size: currSize - 5 });
  }
  renderMeme();
}

function onMoveText(type) {
  const line = getCurrentLine();
  if (!line) return;
  const { posY: currPosY } = line;
  if (type === 'up') {
    updateLine({ posY: currPosY - 5 });
  } else {
    updateLine({ posY: currPosY + 5 });
  }
  renderMeme();
}

function onAddLine() {
  const { lines } = getMeme();
  const { width: w, height: h } = gElCanvas;
  const posX = w / 2;
  let posY = h / 2;
  switch (lines.length) {
    case 0:
      posY = 20;
      break;
    case 1:
      posY = h - 20;
      break;
    default:
      break;
  }
  addLine({ posX, posY });
  initInputs();
  renderMeme();
}

function onRemoveLine() {
  removeCurrentLine();
  initInputs();
  renderMeme();
}

function onAlign(direction) {
  const line = getCurrentLine();
  if (!line) return;
  const { width: w, height: h } = gElCanvas;
  const posXs = { left: 0, center: w / 2, right: w };
  updateLine({ align: direction, posX: posXs[direction] });
  renderMeme();
}

function onSave() {
  const img = gElCanvas.toDataURL('image/jpeg', 0.1);
  saveMeme(img);
  renderToast('Meme Saved!');
}
