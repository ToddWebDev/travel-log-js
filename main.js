mapboxgl.accessToken =
  'pk.eyJ1IjoidG9kZHdlYmRldiIsImEiOiJjanlidjVoMHQwYjBqM2RvY2poMGFwc3l0In0.sLNe9kgTJ5pAwrzTc9_5cQ'

const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [-111.891, 40.7608], // starting position [lng, lat]
  zoom: 4, // starting zoom
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

logs.features.forEach(function (log, i) {
  log.properties.id = i
})

map.on('load', () => {
  /* Add the data to your map as a source  */
  map.addSource('locations', {
    type: 'geojson',
    data: logs,
  })

  buildLogsList(logs)

  // Add navigation control (the +/- zoom buttons)
  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

  // Add home marker
  new mapboxgl.Marker(map).setLngLat([-111.891, 40.7608]).addTo(map)

  // Add location markers
  addMarkers()
})

map.on('click', (event) => {
  /* Determine if a feature in the "locations" layer exists at that point. */
  const features = map.queryRenderedFeatures(event.point, {
    layers: ['locations'],
  })

  /* If it does not exist, return */
  if (!features.length) return

  const clickedPoint = features[0]

  flyToCoordinates(clickedPoint)
  createPopUp(clickedPoint)

  /* Highlight listing in sidebar (and remove highlight for all other listings) */
  const activeItem = document.getElementsByClassName('active')
  if (activeItem[0]) {
    activeItem[0].classList.remove('active')
  }
  const listing = document.getElementById(
    `listing-${clickedPoint.properties.id}`
  )
  listing.classList.add('active')
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
      for (const feature of logs.features) {
        if (this.id === `link-${feature.properties.id}`) {
          flyToCoordinates(feature)
          createPopUp(feature)
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

function addMarkers() {
  /* For each feature in the GeoJSON object above: */
  for (const marker of logs.features) {
    new mapboxgl.Marker({ color: '#c53058' })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map)
  }
}

function flyToCoordinates(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15,
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
}
