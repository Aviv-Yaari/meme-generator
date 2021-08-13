function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove);
  gElCanvas.addEventListener('mousedown', onDown);
  gElCanvas.addEventListener('mouseup', onUp);
  gElCanvas.addEventListener('mouseleave', onLeave);
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove);
  gElCanvas.addEventListener('touchstart', onDown);
  gElCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
  const pos = getEvPos(ev);
  const { lines } = getMeme();
  let isLineHit = false;
  lines.forEach((line, index) => {
    if (!checkClickInBorder(line, pos)) return;
    isLineHit = true;
    line.align = 'center';
    line.isDragging = true;
    setSelectedLine(index);
    renderMeme();
    initInputs();
  });
  if (!isLineHit) {
    addLine({ posX: pos.x, posY: pos.y });
    initInputs();
    renderMeme();
  }
}

function onMove(ev) {
  const pos = getEvPos(ev);
  const { lines } = getMeme();
  document.body.style.cursor = 'pointer';
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
  document.body.style.cursor = 'pointer';
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

function onLeave() {
  document.body.style.cursor = 'default';
}
