/* Leaflet: Ankara places are approximate public landmarks / neighborhood centers. */
(function () {
  'use strict';
  const ankaraMap = L.map('ankara-map', {
    center: [39.88,32.72], zoom: 10, minZoom: 8, maxZoom: 18,
    worldCopyJump: false,
    maxBounds: [[38.7,30.5],[41.2,34.7]],
    maxBoundsViscosity: 1.0
  });
  // Assignment Issue 2: tile images never repeat horizontally.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    noWrap: true,
    bounds: [[-85.0511,-180],[85.0511,180]],
    maxZoom: 19
  }).addTo(ankaraMap);
  const places = [
    {name:'Hacettepe University — Beytepe', lat:39.8678, lon:32.7336, story:'My university campus and an important part of my daily life.', trStory:"Üniversite kampüsüm ve günlük hayatımın önemli bir parçası."},
    {photo:'hara-ankara.jpg', name:'Hara Ankara Riding Club', lat:40.04, lon:32.52, story:'My riding club, where I spend time doing what I love: horseback riding. (Approximate location near Yenikent–Ayaş Road.)', trStory:"At binme tutkumla vakit geçirdiğim binicilik kulübüm. (Yenikent–Ayaş Yolu çevresinde yaklaşık konum.)"},
    {name:'Eryaman', lat:39.9727, lon:32.6231, story:'The neighborhood area where I live and spend much of my daily life.', trStory:"Yaşadığım ve günümün büyük bölümünü geçirdiğim semt."},
    {name:'Ümitköy', lat:39.8875, lon:32.6877, story:'One of my favorite areas for eating out and meeting friends.', trStory:"Yemek yemek ve arkadaşlarla buluşmak için sevdiğim bölgelerden biri."},
    {name:'Çayyolu', lat:39.8652, lon:32.6501, story:'A neighborhood I enjoy for its cafés and relaxed atmosphere.', trStory:"Kafeleri ve sakin ortamıyla sevdiğim bir semt."},
    {name:'Söğütözü', lat:39.9127, lon:32.8043, story:'One of my favorite parts of Ankara for food and spending time with friends.', trStory:"Ankara’da yemek yemek ve arkadaşlarımla vakit geçirmek için sevdiğim yerlerden biri."}
  ];
  const markerGroup = L.layerGroup();
  places.forEach(place => {
    const wrapper = document.createElement('div');
    const heading = document.createElement('strong'); heading.textContent = place.name;
    const paragraph = document.createElement('p'); paragraph.textContent = (window.GeoLang?.get() === 'tr' ? place.trStory : place.story);
    if(place.photo){ const photo=document.createElement('img'); photo.src='images/'+place.photo; photo.alt='Hara Ankara riding club';photo.style.cssText='display:block;width:100%;max-width:220px;border-radius:8px;margin-bottom:8px';wrapper.append(photo); }
    wrapper.append(heading, paragraph);
    window.addEventListener('languagechange', () => { paragraph.textContent = window.GeoLang.get() === 'tr' ? place.trStory : place.story; });
    L.marker([place.lat, place.lon]).bindPopup(wrapper).addTo(markerGroup);
  });
  // Assignment Issue 1: toggle marker layer at a zoom threshold.
  const MIN_MARKER_ZOOM = 11;
  function updateVisibility() {
    if (ankaraMap.getZoom() >= MIN_MARKER_ZOOM) {
      if (!ankaraMap.hasLayer(markerGroup)) markerGroup.addTo(ankaraMap);
    } else if (ankaraMap.hasLayer(markerGroup)) {
      ankaraMap.removeLayer(markerGroup);
    }
  }
  ankaraMap.on('zoomend', updateVisibility);
  updateVisibility();
  // Refresh dimensions after all styles have loaded.
  window.addEventListener('load', () => ankaraMap.invalidateSize(true));
  // Refresh again when the map is resized (e.g. the browser window changes).
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => ankaraMap.invalidateSize(false)).observe(document.getElementById('ankara-map'));
  }
})();
