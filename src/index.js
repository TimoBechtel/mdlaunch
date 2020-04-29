import 'reveal.js/css/reveal.css';
import 'reveal.js/css/theme/black.css';
import 'highlight.js/styles/dracula.css';
import Reveal from 'reveal.js';
import hljs from 'highlight.js';

Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,
  transition: 'none',
});

document.querySelectorAll('pre code').forEach((block) => {
  hljs.highlightBlock(block);
});
