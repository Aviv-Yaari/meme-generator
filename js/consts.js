const IMGS_DB = [
  { id: 1, name: 'angry trump', url: 'img/memes/1.jpg', keywords: ['angry', 'politics'] },
  { id: 2, name: 'puppies', url: 'img/memes/2.jpg', keywords: ['cute', 'pets'] },
  {
    id: 3,
    name: 'sleeping baby and puppy',
    url: 'img/memes/3.jpg',
    keywords: ['baby', 'cute', 'pets'],
  },
  { id: 4, name: 'sleeping cat', url: 'img/memes/4.jpg', keywords: ['cute', 'pets'] },
  { id: 5, name: 'success baby', url: 'img/memes/5.jpg', keywords: ['baby'] },
  { id: 6, name: 'aliens history channel', url: 'img/memes/6.jpg', keywords: ['tv'] },
  { id: 7, name: 'surprised baby', url: 'img/memes/7.jpg', keywords: ['cute', 'funny'] },
  { id: 8, name: 'tell me more wonka', url: 'img/memes/8.jpg', keywords: ['movies', 'sarcastic'] },
  { id: 9, name: 'evil baby', url: 'img/memes/9.jpg', keywords: ['cute', 'funny', 'baby'] },
  { id: 10, name: 'laughing obama', url: 'img/memes/10.jpg', keywords: ['funny', 'politics'] },
  { id: 11, name: 'kissing wrestlers', url: 'img/memes/11.jpg', keywords: ['awkward', 'funny'] },
  { id: 12, name: 'what would you do', url: 'img/memes/12.jpg', keywords: ['celeb', 'tv'] },
  {
    id: 13,
    name: 'dicaprio cheers',
    url: 'img/memes/13.jpg',
    keywords: ['party', 'movies'],
  },
  { id: 14, name: 'what if i told you', url: 'img/memes/14.jpg', keywords: ['celeb', 'movies'] },
  { id: 15, name: 'one does not simply', url: 'img/memes/15.jpg', keywords: ['movies'] },
  { id: 16, name: 'laughing captain', url: 'img/memes/16.jpg', keywords: ['movies', 'funny'] },
  { id: 17, name: 'putin peace', url: 'img/memes/17.jpg', keywords: ['celeb'] },
  { id: 18, name: 'look at all', url: 'img/memes/18.jpg', keywords: ['movies'] },
  { id: 19, name: 'sounds of music everywhere', url: 'img/memes/19.jpg', keywords: ['movies'] },
  { id: 20, name: 'oprah everybody', url: 'img/memes/20.jpg', keywords: ['tv', 'celeb'] },
  { id: 21, name: 'flexing dog', url: 'img/memes/21.jpg', keywords: ['pets', 'funny'] },
  { id: 22, name: 'dancing children africa', url: 'img/memes/22.jpg', keywords: ['funny'] },
  { id: 23, name: 'angry guy', url: 'img/memes/23.jpg', keywords: ['movies', 'angry'] },
  {
    id: 24,
    name: 'angy trump 2',
    url: 'img/memes/24.jpg',
    keywords: ['angry', 'funny', 'politics'],
  },
  { id: 25, name: 'dr evil quote', url: 'img/memes/25.jpg', keywords: ['movies'] },
];
for (const img of IMGS_DB) {
  img.id = makeId();
}

const MEME_INIT = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Top Line',
      size: 30,
      align: 'center',
      color: '#000000',
      fontFamily: 'Impact',
      posX: null,
      posY: null,
      isDragging: false,
    },
    {
      txt: 'Bottom Line',
      size: 30,
      align: 'center',
      color: '#000000',
      fontFamily: 'Impact',
      posX: null,
      posY: null,
      isDragging: false,
    },
  ],
};

const SEARCH_SCORES_INIT = {
  funny: 5,
  pets: 10,
  movies: 4,
  trump: 12,
  politics: 5,
  tv: 4,
  obama: 4,
  kid: 5,
  baby: 3,
};
