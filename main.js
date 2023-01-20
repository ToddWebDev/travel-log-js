mapboxgl.accessToken =
  'pk.eyJ1IjoidG9kZHdlYmRldiIsImEiOiJjanlidjVoMHQwYjBqM2RvY2poMGFwc3l0In0.sLNe9kgTJ5pAwrzTc9_5cQ'

const homeCoords = [-111.891, 40.7608]

const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: homeCoords, // starting position [lng, lat]
  zoom: 4, // starting zoom
  pitch: 40,
})

const logs = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-117.1611, 32.7157],
      },
      pan: {
        coordinates: [-114.66446033065944, 36.76722997619034],
        zoom: 6,
      },
      properties: {
        type: 'flight',
        month: 'May',
        year: '2021',
        destination: 'San Diego',
        state: 'California',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-110.6818, 43.7904],
        zoom: 11,
      },
      pan: {
        coordinates: [-110.6818, 43.7904],
        zoom: 9,
      },
      properties: {
        type: 'auto',
        month: 'June',
        year: '2021',
        destination: 'Grand Teton National Park',
        state: 'Wyoming',
      },
    },
  ],
}

const routes = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [homeCoords, [-117.1611, 32.7157]],
      },
    },
  ],
}

logs.features.forEach(function (log, i) {
  log.properties.id = i
})

map.on('load', () => {
  /* Add the data to your map as a source  */
  map.addSource('locations', {
    type: 'geojson',
    data: logs,
  })

  map.addSource('routes', {
    type: 'geojson',
    data: routes,
  })

  buildLogsList(logs)

  // Add navigation control (the +/- zoom buttons)
  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

  // Add home marker
  new mapboxgl.Marker(map).setLngLat([-111.891, 40.7608]).addTo(map)

  addLogMarkers()
})

function buildLogsList(logs) {
  for (const log of logs.features) {
    /* Add a new listing section to the sidebar. */
    const logsUL = document.getElementById('logs')
    const listing = logsUL.appendChild(document.createElement('li'))
    /* Assign a unique `id` to the listing. */
    listing.id = `listing-${log.properties.id}`
    /* Assign the `item` class to each listing for styling. */
    listing.className = 'item'

    /* Add details to the individual listing. */
    const date = listing.appendChild(document.createElement('p'))
    date.className = 'date'
    date.innerHTML = `${log.properties.month} ${log.properties.year}`

    /* Add the link to the individual listing created above. */
    const link = listing.appendChild(document.createElement('a'))
    link.href = '#'
    link.className = 'title'
    link.id = `link-${log.properties.id}`
    link.innerHTML = `${log.properties.destination}`

    /* Add event listeners */
    link.addEventListener('click', function () {
      for (const [i, feature] of logs.features.entries()) {
        if (this.id === `link-${feature.properties.id}`) {
          flyToCoordinates(feature)
          createPopUp(feature)
          if (feature.properties.type === 'flight') addRoute(routes.features[i])
        }
      }
      const activeItem = document.getElementsByClassName('active')
      if (activeItem[0]) {
        activeItem[0].classList.remove('active')
      }
      this.parentNode.classList.add('active')
    })
  }
}

function addLogMarkers() {
  /* For each feature in the GeoJSON object above: */
  for (const feature of logs.features) {
    new mapboxgl.Marker({ color: '#c53058' })
      .setLngLat(feature.geometry.coordinates)
      .addTo(map)
  }
}

function addRoute(feature) {
  // Calculate the distance in kilometers between route start/end point.
  const lineDistance = turf.length(feature)

  const arc = []

  // Number of steps to use in the arc and animation, more steps means
  // a smoother arc and animation, but too many steps will result in a
  // low frame rate
  const steps = 500

  // Draw an arc between the `origin` & `destination` of the two points
  for (let i = 0; i < lineDistance; i += lineDistance / steps) {
    const segment = turf.along(feature, i)
    arc.push(segment.geometry.coordinates)
  }

  // Update the route with calculated arc coordinates
  feature.geometry.coordinates = arc

  map.addLayer({
    id: 'routes',
    source: 'routes',
    type: 'line',
    paint: {
      'line-width': 4,
      'line-color': '#007cbf',
    },
  })
}

function flyToCoordinates(currentFeature) {
  map.flyTo({
    center: currentFeature.pan.coordinates,
    zoom: currentFeature.pan.zoom,
  })
}

function createPopUp(currentFeature) {
  const popUps = document.getElementsByClassName('mapboxgl-popup')
  /** Check if there is already a popup on the map and if so, remove it */
  if (popUps[0]) popUps[0].remove()

  const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      `<h3>${currentFeature.properties.destination}, ${currentFeature.properties.state}</h3><p>${currentFeature.properties.type}</p><p>${currentFeature.properties.month} ${currentFeature.properties.year}</p>`
    )
    .addTo(map)

  popup.on('close', function (e) {
    if (map.getLayer('routes')) map.removeLayer('routes')
  })
}
