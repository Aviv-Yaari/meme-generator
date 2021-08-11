function onDownload(elLink) {
  const download = () => {
    const url = gElCanvas.toDataURL('image/jpeg');
    elLink = document.querySelector('.download-meme');
    elLink.href = url;
    elLink.click();
  };
  renderMeme(true, download);
  renderMeme();
}

function onShare() {
  const share = async () => {
    const url = gElCanvas.toDataURL('image/jpeg');
    const formData = new FormData();
    formData.append('img', url);
    const response = await fetch('//ca-upload.com/here/upload.php', {
      method: 'POST',
      body: formData,
    });
    const uploadedUrl = await response.text();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${uploadedUrl}&t=${uploadedUrl}`,
      '_blank'
    );
  };
  renderMeme(true, share);
  renderMeme();
}
