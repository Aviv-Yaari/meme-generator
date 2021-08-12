function loadImage(ev, onImageReady) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = onImageReady.bind(null, img);
  };
  reader.readAsDataURL(ev.target.files[0]);
}

function addCustomMeme(img) {
  const newImg = { id: makeId(), name: 'custom meme', url: img.src, keywords: ['custom'] };
  const imgs = getImgs();
  setImgs([newImg, ...imgs]);
  renderGallery();
}
