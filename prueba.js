const { marked } = require ('marked');

// Override function
const renderer = {
  link(href, title, text) {
      console.log(href, title, text)
  }
};

marked.use({ renderer });

// Run marked
marked.parse('[Markdown](https://es.wikipedia.org/wiki/Markdown)\n[Markdown2](https://es.ikipedia.org/wiki/Markdown)')