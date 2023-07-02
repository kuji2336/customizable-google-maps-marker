/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.
async function initMap() {
  // Request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
  const infoWindow = new InfoWindow();

  const map = new Map(document.getElementById("map"), {
    mapId: "9bd92426168a314",
    zoom: 11,
    center: { lat: 41.6938, lng: 44.8015 },
  });

  // Data for the markers consisting of a name, a LatLng and a zIndex for the
  // order in which these markers should display on top of each other.
  const beaches = [
    ["(Solar Auto Charger) Kerchi Street", 41.7899406, 44.8024076, 4],
    ["(Solar Auto Charger) Kerchi Street 2", 41.79238, 44.800502, 5],
    ["(Solar Auto Charger) Queen Tamar Ave", 41.718503, 44.792097, 3],
    ["(Solar Auto Charger) Old Tbilisi", 41.697579, 44.799303, 2],
    ["(Solar Auto Charger) Gudiashvili street", 41.697596, 44.800044, 1],
  ];

  function setMarkers(map) {
    // Adds markers to the map.
    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.
    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.

    for (let i = 0; i < beaches.length; i++) {
      const parser = new DOMParser();
      // A marker with a custom inline SVG.
      const pinSvgString =
        '<svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 500 500"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M96 0C60.7 0 32 28.7 32 64V448c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32s-14.3-32-32-32V304h16c22.1 0 40 17.9 40 40v32c0 39.8 32.2 72 72 72s72-32.2 72-72V252.3c32.5-10.2 56-40.5 56-76.3V144c0-8.8-7.2-16-16-16H544V80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H480V80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H432c-8.8 0-16 7.2-16 16v32c0 35.8 23.5 66.1 56 76.3V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V344c0-48.6-39.4-88-88-88H320V64c0-35.3-28.7-64-64-64H96zM216.9 82.7c6 4 8.5 11.5 6.3 18.3l-25 74.9H256c6.7 0 12.7 4.2 15 10.4s.5 13.3-4.6 17.7l-112 96c-5.5 4.7-13.4 5.1-19.3 1.1s-8.5-11.5-6.3-18.3l25-74.9H96c-6.7 0-12.7-4.2-15-10.4s-.5-13.3 4.6-17.7l112-96c5.5-4.7 13.4-5.1 19.3-1.1z"/></svg>';
      const pinSvg = parser.parseFromString(pinSvgString, "image/svg+xml").documentElement;
      const glyphSvgPinElement = new PinElement({
        glyph: pinSvg,
        glyphColor: "#ff8300",
        background: "#FFD514",
        borderColor: "#ff8300",
      });
      const beach = beaches[i];
      const position = { lat: beach[1], lng: beach[2] };
      const marker = new AdvancedMarkerElement({
        position: position,
        map,
        content: glyphSvgPinElement.element,
        title: beach[0],
        zIndex: beach[3],
      });

      // Add click event listener to each marker
      marker.addListener("click", () => {
        map.panTo(position);
        map.setZoom(20);
      });

       // Add a click listener for each marker, and set up the info window.
       marker.addListener("click", ({ domEvent, latLng }) => {
        const { target } = domEvent;
  
        infoWindow.close();
        infoWindow.setContent(marker.title);
        infoWindow.open(marker.map, marker);
      });
    }
  }

  setMarkers(map);
}

window.initMap = initMap;
