function OnUploadImg() {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
  };
  reader.readAsDataURL;
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system:
function onImgInput(ev) {
  loadImageFromInput(ev, renderImg);
}

function loadImageFromInput(ev, onImageReady) {
  document.querySelector('.canvas-1').innerHTML = '';
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = new Image();
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
  };
  reader.readAsDataURL(ev.target.files[0]);
}

function renderImg(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}
