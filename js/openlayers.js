/* OpenLayers: personal travel map. Locations are approximate city centers, not private addresses. */
(function () {
  'use strict';
  const travelPlaces = [
    {name:'Muğla', lon:28.3636, lat:37.2153, story:'I often spend my summer holidays in Muğla and enjoy its beautiful coastal towns.', trStory:"Muğla’ya yaz tatillerinde sık sık gider, güzel sahil kasabalarını gezmekten keyif alırım."},
    {photo:'mudanya-street.jpg', name:'Bursa', lon:29.0601, lat:40.1885, story:'I visited Bursa to explore the city and to see the Karacabey Stud Farm.', trStory:"Bursa’yı gezmek ve Karacabey Harası’nı görmek için ziyaret ettim."},
    {photo:'rize-bridge.jpg', name:'Rize', lon:40.5234, lat:41.0201, story:'Rize is my hometown and will always have a special place in my life.', trStory:"Rize benim memleketim; hayatımda her zaman özel bir yeri olacak."},
    {photo:'trabzon-football.jpg', name:'Trabzon', lon:39.7168, lat:41.0027, story:'As a Trabzonspor supporter, I traveled here to watch a football match.', trStory:"Trabzonspor taraftarı olarak bir maç izlemek için Trabzon’a gittim."},
    {name:'Zonguldak (Ereğli)', lon:31.4193, lat:41.2797, story:'I was born in Ereğli, where my grandparents also live.', trStory:"Ereğli’de doğdum; anneannem ve dedem de burada yaşıyor."},
    {name:'Aydın', lon:27.8456, lat:37.8560, story:'I enjoy visiting Aydın for holidays, especially Kuşadası and Didim.', trStory:"Özellikle Kuşadası ve Didim’e tatil için gitmeyi seviyorum."},
    {photo:'sirince-street.jpg', name:'İzmir', lon:27.1428, lat:38.4237, story:'I visited İzmir for a holiday and enjoyed discovering the city.', trStory:"İzmir’i tatil için ziyaret edip yeni yerler keşfetmekten keyif aldım."},
    {photo:'cappadocia-balloons.jpg', name:'Cappadocia (Nevşehir)', lon:34.8309, lat:38.6244, story:'I explored Cappadocia during a holiday and enjoyed its unique landscape.', trStory:"Kapadokya’yı tatilde keşfettim ve eşsiz manzaralarına hayran kaldım."},
    {name:'İstanbul', lon:28.9784, lat:41.0082, story:'I visited İstanbul for sightseeing and to explore its many neighborhoods.', trStory:"İstanbul’u gezmek ve farklı semtlerini görmek için ziyaret ettim."},
    {name:'Kocaeli', lon:29.9408, lat:40.7654, story:'I visited Kocaeli for sightseeing and a short trip.', trStory:"Kocaeli’ye kısa bir gezi için gittim."}
  ];
  const features = travelPlaces.map(place => {
    const feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([place.lon, place.lat])),
      name: place.name,
      story: place.story,
      trStory: place.trStory,
      photo: place.photo || null
    });
    return feature;
  });
  const markerLayer = new ol.layer.Vector({
    source: new ol.source.Vector({features, wrapX: false}),
    style: new ol.style.Style({
      image: new ol.style.Circle({radius: 8, fill: new ol.style.Fill({color:'#b77b49'}), stroke: new ol.style.Stroke({color:'#ffffff',width:2.5})})
    })
  });
  const map = new ol.Map({
    target: 'travel-map',
    layers: [new ol.layer.Tile({source: new ol.source.OSM({wrapX: false})}), markerLayer],
    view: new ol.View({
      center: ol.proj.fromLonLat([34.7,39.2]),
      zoom: 5.6,
      minZoom: 3,
      maxZoom: 17,
      multiWorld: false,
      extent: ol.proj.transformExtent([18,32,47,45], 'EPSG:4326', 'EPSG:3857')
    })
  });
  // Assignment Issue 1: hide markers below the chosen zoom threshold.
  const MIN_MARKER_ZOOM = 7;
  function updateVisibility() { markerLayer.setVisible(map.getView().getZoom() >= MIN_MARKER_ZOOM); }
  map.getView().on('change:resolution', updateVisibility);
  updateVisibility();
  const details = document.getElementById('travel-details');
  map.on('singleclick', event => {
    const feature = map.forEachFeatureAtPixel(event.pixel, candidate => candidate, {layerFilter: layer => layer === markerLayer, hitTolerance: 6});
    if (feature && markerLayer.getVisible()) {
      details.replaceChildren();
      const heading = document.createElement('strong'); heading.textContent = feature.get('name');
      const paragraph = document.createElement('p'); paragraph.textContent = (window.GeoLang?.get() === 'tr' ? feature.get('trStory') : feature.get('story'));
      if (feature.get('photo')) {
        const picture = document.createElement('img');
        picture.src = 'images/' + feature.get('photo');
        picture.alt = 'A travel photo from ' + feature.get('name');
        picture.className = 'travel-detail-photo';
        details.append(picture);
      }
      details.append(heading, paragraph);
      details.dataset.selected = 'true';
    }
  });
  window.addEventListener('languagechange', () => { if (details.dataset.selected === 'true') { details.dataset.selected = ''; details.replaceChildren(); const p=document.createElement('p'); p.textContent=window.GeoLang.get()==='tr' ? 'Yeni dilde anıyı görmek için işaretçiyi yeniden seç.' : 'Select a marker to see its memory in the selected language.'; details.append(p); } });
  map.on('pointermove', event => { map.getTargetElement().style.cursor = markerLayer.getVisible() && map.hasFeatureAtPixel(event.pixel, {layerFilter: layer => layer === markerLayer}) ? 'pointer' : ''; });
})();
