const KEY = 'saved-memes';

function saveToStorage(savedMemes) {
  localStorage.setItem(KEY, JSON.stringify(savedMemes));
}

function loadFromStorage() {
  const data = localStorage.getItem(KEY);
  return JSON.parse(data);
}
