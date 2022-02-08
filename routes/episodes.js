var express = require('express');
var router = express.Router();

var episodes = [
  {
    id: 'short',
    audio: '/audio/short.mp3',
    name: 'Shorty',
    markers: [
      { type: 'ad', start: 0, duration: 10, content: 'Do you have an angry mom?', link: 'https://en.wikipedia.org/wiki/Angry_Mom' },
      { type: 'text', start: 10, duration: 10, content: 'This is a text, yo!' },
      { type: 'image', start: 20, duration: 5, content: '/images/image01.jpg' },
      { type: 'ad', start: 30, duration: 10, content: 'Become a member of the Moth Union.', link: 'https://en.wikipedia.org/wiki/Nymphicula_xanthobathra' },
    ]
  },
  {
    id: 'long',
    audio: '/audio/long.mp3',
    name: 'Long John Silver',
    markers: [
      { type: 'ad', start: 0, duration: 5, content: 'Visit Treasure Island Today!', link: 'https://en.wikipedia.org/wiki/Long_John_Silver' },
      { type: 'image', start: 5, duration: 75, content: '/images/image02.jpg' },
      { type: 'ad', start: 80, duration: 15, content: 'Vacation at Peytons Brook!', link: 'https://en.wikipedia.org/wiki/Peytons_Brook' },
      { type: 'text', start: 100, duration: 20, content: 'Some text.' },
      { type: 'text', start: 125, duration: 5, content: 'Another text.' },
      { type: 'image', start: 140, duration: 10, content: '/images/image03.jpg' },
      { type: 'ad', start: 152, duration: 11, content: 'Play with Pedro!', link: 'https://en.wikipedia.org/wiki/Pedro_Ant%C3%B3nio_Coelho_Moreira' },
    ]
  }
];

router.get('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.json(episodes);
});

router.get('/:episode_id', function (req, res, next) {
  var foundEpisode = findEpisodeById(req.params.episode_id);
  res.header('Access-Control-Allow-Origin', '*');

  if (foundEpisode) {
    res.json(foundEpisode);
  } else {
    res.sendStatus(404);
  }
});

function findEpisodeById(episodeId) {
  function filterById(episode) {
    return episode.id === episodeId;
  }

  return episodes.find(filterById);
}

module.exports = router;
