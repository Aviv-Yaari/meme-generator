function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove);
  gElCanvas.addEventListener('mousedown', onDown);
  gElCanvas.addEventListener('mouseup', onUp);
  gElCanvas.addEventListener('mouseleave', onUp);
  gElCanvas.addEventListener('contextmenu', onRightClick);
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
    if (checkClickInBorder(line, pos, 'border')) {
      line.isDragging = true;
    } else if (checkClickInBorder(line, pos, 'resizeBorder')) {
      line.isResizing = true;
    } else return;
    line.align = 'center';
    setSelectedLine(index);
    renderMeme();
    renderInputs();
  });
}

function onRightClick(ev) {
  ev.preventDefault();
  const pos = getEvPos(ev);
  addLine({ posX: pos.x, posY: pos.y, txt: 'New Line' });
  renderInputs();
  renderMeme();
}

function onMove(ev) {
  const pos = getEvPos(ev);
  const { lines } = getMeme();
  document.body.style.cursor = 'default';
  for (const line of lines) {
    if (checkClickInBorder(line, pos, 'border')) {
      document.body.style.cursor = 'grab';
    }
    if (line.isDragging) {
      line.posX = pos.x;
      line.posY = pos.y;
    } else if (line.isResizing) {
      const dist = (pos.x - line.resizeBorder.endX) / 4;
      updateLine({ size: line.size + dist });
    } else continue;
    renderMeme();
  }
}

function onUp() {
  const { lines } = getMeme();
  document.body.style.cursor = 'default';
  for (const line of lines) {
    line.isDragging = false;
    line.isResizing = false;
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
