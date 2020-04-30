import './reveal.scss';
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

hljs.initHighlightingOnLoad();
