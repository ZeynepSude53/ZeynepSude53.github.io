# GMT458 – Personal Web GIS Portfolio

**Student:** Zeynep Sude  
**University:** Hacettepe University  
**Department:** Geomatics Engineering  
**Course:** GMT458 – Web GIS

**Live Website:** https://zeynepsude53.github.io/

## 1. Project Overview

This project is a personal portfolio website developed for the GMT458 Web GIS course at Hacettepe University.

The website introduces my personal background, academic interests, internship experience, and interactive maps. It combines basic web development technologies with geographic information systems to create a personalized and interactive portfolio.

## 2. Website Structure

The website consists of four HTML pages:

- **Home (`index.html`):** Personal introduction and main navigation.
- **About (`about.html`):** Personal background, education, hobbies, and interests.
- **Projects (`projects.html`):** Internship work involving digital terrain modeling and 3D visualization using Netcad GIS, including an image-based table.
- **Maps (`maps.html`):** Two interactive maps developed using OpenLayers and Leaflet.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure and content |
| CSS3 | Styling, animations, and responsive design |
| JavaScript | Interactive website functionality |
| OpenLayers | Interactive travel map |
| Leaflet | Interactive map of Ankara |
| OpenStreetMap | Base map tiles |
| Netcad GIS | Digital terrain modeling and visualization |
| Git & GitHub | Version control |
| GitHub Pages | Website hosting |

## 4. Web GIS Applications

### 4.1. OpenLayers – Places I Have Visited

An interactive travel map displaying cities across Türkiye that I have visited.

Each location includes a short personal description.

**Technical Features:**
- Markers appear at zoom level 7 and above.
- Marker visibility is controlled using JavaScript.
- Horizontal world repetition is disabled using `wrapX: false`.

### 4.2. Leaflet – My Ankara

An interactive map displaying places that are meaningful to me in Ankara, including my university campus, riding club, and favorite neighborhoods.

**Technical Features:**
- Markers are organized using a separate layer group.
- Markers appear at zoom level 11 and above.
- World repetition is disabled using `noWrap: true`.
- Map boundaries are configured to limit navigation.

## 5. Solutions to Common Web GIS Problems

### Issue 1 – Overlapping Markers

Displaying multiple markers at low zoom levels may cause visual clutter and overlapping.

To address this issue, marker visibility is controlled based on the current zoom level.

### Issue 2 – Repeating World

Web mapping libraries may display repeated copies of the world when zoomed out or moved horizontally.

To prevent this behavior, horizontal wrapping is disabled and map boundaries are configured where appropriate.

## 6. CSS Features

The website includes:

- Page entrance animations.
- Hover effects on buttons and project cards.
- Responsive layouts for different screen sizes.
- Image galleries and tabular information.
- Consistent navigation and visual design.

## 7. AI Assistance

AI tools were used to assist with implementation, debugging, and documentation.

Specific topics explored with AI assistance included:

- Integrating OpenLayers and Leaflet.
- Implementing zoom-based marker visibility.
- Resolving Leaflet display and CSS issues.
- Understanding Git commands and GitHub Pages deployment.

**Estimated AI usage:** Approximately 1–2 hours.

## 8. Version Control and Deployment

Git was used to track development changes, including commits made on different days.

The website is hosted using GitHub Pages and is publicly accessible at:

https://zeynepsude53.github.io/

## 9. References

- [OpenLayers Documentation](https://openlayers.org/)
- [Leaflet Documentation](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
