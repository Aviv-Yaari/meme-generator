function initInputs() {
  //   selectLine(0);
  const line = getCurrentLine();
  const elInputs = Array.from(document.querySelectorAll('.meme-controls > input'));
  for (const elInput of elInputs) {
    elInput.value = line[elInput.name];
  }
}

function onLineChange() {
  const { txt } = getCurrentLine();
  if (!txt) {
    removeCurrentLine();
    renderToast('Empty line auto-deleted');
  }
  selectLine(1);
  initInputs();
  renderMeme();
}

function onLineUpdate(el) {
  const { name, value } = el;
  updateLine({ [name]: value });
  renderMeme();
}

function onChangeTextSize(type) {
  const currSize = getCurrentLine().size;
  if (type === 'inc') {
    updateLine({ size: currSize + 5 });
  } else {
    updateLine({ size: currSize - 5 });
  }
  renderMeme();
}

function onMoveText(type) {
  const { posY: currPosY } = getCurrentLine();
  if (type === 'up') {
    updateLine({ posY: currPosY - 5 });
  } else {
    updateLine({ posY: currPosY + 5 });
  }
  renderMeme();
}

function onAddLine() {
  const { width: w, height: h } = gElCanvas;
  const posY = h / 2;
  const posX = w / 2;
  addLine({ posX, posY });
  initInputs();
  renderMeme();
}

function onRemoveLine() {
  removeCurrentLine();
  initInputs();
  renderMeme();
}
