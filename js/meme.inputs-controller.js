function initInputs() {
  const line = getCurrentLine();
  if (!line) return;
  const elInputs = Array.from(
    document.querySelectorAll('.meme-controls > input, .meme-controls > select ')
  );
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
  const { width: w, height: h } = gElCanvas;
  const posXs = { left: 0, center: w / 2, right: w };
  updateLine({ align: direction, posX: posXs[direction] });
  renderMeme();
}
