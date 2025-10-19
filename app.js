// app.js (append or replace your existing app.js content)
document.addEventListener('DOMContentLoaded', () => {
    <img alt="content/thumbs/download.png"></img>
  fetch('data/manifest.json')
    .then(res => res.json())
    .then(data => {
      const notesEl = document.querySelector('#notes ul') || (() => {
        const s = document.querySelector('#notes') || document.createElement('section');
        s.id = 'notes'; s.innerHTML = '<h2>Notes</h2><ul></ul>'; document.querySelector('main').appendChild(s);
        return s.querySelector('ul');
      })();

      data.notes.forEach(n => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${n.file}" download>${n.title}</a>`;
        notesEl.appendChild(li);
      });

      const slidesEl = document.querySelector('#slides') || (() => {
        const s = document.createElement('section'); s.id='slides'; s.innerHTML = '<h2>Slides</h2><div class="slides-list"></div>'; document.querySelector('main').appendChild(s);
        return s.querySelector('.slides-list');
      })();

      data.slides.forEach(s => {
        const wrapper = document.createElement('div');
        wrapper.className = 'slide-embed';
        wrapper.innerHTML = `<h3>${s.title}</h3><iframe src="${s.embed}" frameborder="0" width="100%" height="480" allowfullscreen></iframe>`;
        slidesEl.appendChild(wrapper);
      });

      const videosEl = document.querySelector('#videos') || (() => {
        const s = document.createElement('section'); s.id='videos'; s.innerHTML = '<h2>Videos</h2><div class="videos-list"></div>'; document.querySelector('main').appendChild(s);
        return s.querySelector('.videos-list');
      })();

      data.videos.forEach(v => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `<h3>${v.title}</h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${v.youtubeId}" title="${v.title}" frameborder="0" allowfullscreen></iframe>`;
        videosEl.appendChild(card);
      });
    })
    .catch(err => console.error('Could not load manifest:', err));
});
