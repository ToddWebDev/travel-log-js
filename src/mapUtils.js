mapboxgl.accessToken =
  'pk.eyJ1IjoidG9kZHdlYmRldiIsImEiOiJjanlidjVoMHQwYjBqM2RvY2poMGFwc3l0In0.sLNe9kgTJ5pAwrzTc9_5cQ'

const origin = [-111.8999, 40.6111] //SLC

let steps = 500

// A simple line from origin to destination.
const route = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [],
      },
    },
  ],
}

// A single point that animates along a route
const point = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: origin,
      },
    },
  ],
}

export function initializeMap() {
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: origin, // starting position [lng, lat]
    zoom: 5, // starting zoom
    pitch: 0,
  })

  return map
}

export function flyToLogFeature(map, feature, counter) {
  flyToCoordinates(map, feature.pan.coordinates, feature.pan.zoom)
  createPopUp(map, feature, counter)
  if (
    feature.properties.mode === 'driving' ||
    feature.properties.mode === 'train'
  ) {
    addRoute(map, feature.start.coordinates, feature.geometry.coordinates)
  }
  if (feature.properties.mode === 'flight') {
    addFlight(
      map,
      feature.start.coordinates,
      feature.geometry.coordinates,
      counter
    )
  }
}

export function flyToCoordinates(map, coordinates, zoom) {
  map.flyTo({
    center: coordinates,
    zoom: zoom,
  })
}

export function createPopUp(map, currentFeature, counter) {
  const popUps = document.getElementsByClassName('mapboxgl-popup')
  /** Check if there is already a popup on the map and if so, remove it */
  if (popUps[0]) popUps[0].remove()

  const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      `${
        currentFeature.properties.mode === 'recreation'
          ? showRecreationProperties(currentFeature.properties)
          : showTravelProperties(currentFeature.properties)
      }`
    )
    .addTo(map)

  document.activeElement.blur()

  popup.on('close', function (e) {
    resetMap(map, counter)
    removeActiveListing()
  })
}

export async function addRoute(map, startCoordinates, endCoordinates) {
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoordinates[0]},${startCoordinates[1]};${endCoordinates[0]},${endCoordinates[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
    { method: 'GET' }
  )
  const json = await query.json()
  const data = json.routes[0]
  const route = data.geometry.coordinates

  console.log('Miles: ', data.distance * 0.000621371192)

  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route,
    },
  }
  map.addLayer({
    id: 'route',
    type: 'line',
    source: {
      type: 'geojson',
      data: geojson,
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#007cbf',
      'line-width': 4,
      'line-opacity': 0.75,
    },
  })
}

export function addFlight(map, start, destination, counter) {
  route.features[0].geometry.coordinates = [start, destination]
  // Calculate the distance in kilometers between route start/end point.
  const lineDistance = turf.length(route.features[0])

  const arc = []

  // Draw an arc between the `start` & `destination` of the two points
  for (let i = 0; i < lineDistance; i += lineDistance / steps) {
    const segment = turf.along(route.features[0], i)
    arc.push(segment.geometry.coordinates)
  }

  console.log('Miles: ', lineDistance)

  // Update the route with calculated arc coordinates
  route.features[0].geometry.coordinates = arc
  console.log(arc)
  map.addSource('route', {
    type: 'geojson',
    data: route,
  })

  map.addLayer({
    id: 'route',
    source: 'route',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-width': 4,
      'line-color': '#007cbf',
      'line-opacity': 0.75,
    },
  })

  map.addSource('point', {
    type: 'geojson',
    data: point,
  })

  map.addLayer({
    id: 'point',
    source: 'point',
    type: 'symbol',
    layout: {
      // This icon is a part of the Mapbox Streets style.
      // To view all images available in a Mapbox style, open
      // the style in Mapbox Studio and click the "Images" tab.
      // To add a new image to the style at runtime see
      // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
      'icon-image': 'airport',
      'icon-size': 1.5,
      'icon-rotate': ['get', 'bearing'],
      'icon-rotation-alignment': 'map',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
    },
  })

  function animate() {
    const start =
      route.features[0].geometry.coordinates[
        counter >= steps ? counter - 1 : counter
      ]
    const end =
      route.features[0].geometry.coordinates[
        counter >= steps ? counter : counter + 1
      ]
    if (!start) return
    if (!end) {
      setTimeout(() => {
        map.removeLayer('point')
        return
      }, 1000)
    }

    // Update point geometry to a new position based on counter denoting
    // the index to access the arc
    point.features[0].geometry.coordinates =
      route.features[0].geometry.coordinates[counter]

    // Calculate the bearing to ensure the icon is rotated to match the route arc
    // The bearing is calculated between the current point and the next point, except
    // at the end of the arc, which uses the previous point and the current point
    point.features[0].properties.bearing = turf.bearing(
      turf.point(start),
      turf.point(end)
    )

    // Update the source with this new data
    map.getSource('point').setData(point)

    // Request the next frame of animation as long as the end has not been reached
    if (counter < steps) {
      requestAnimationFrame(animate)
    }

    counter = counter + 1
  }
  animate(counter)
}

export function resetMap(map, counter) {
  if (map.getLayer('route')) map.removeLayer('route')
  if (map.getSource('route')) map.removeSource('route')
  if (map.getLayer('point')) map.removeLayer('point')
  if (map.getSource('point')) map.removeSource('point')
  counter = 0
}

function showTravelProperties(properties) {
  const date = new Date(properties.date)
  return `<h2>${properties.destination}, ${
    properties.state ? properties.state : properties.country
  }</h2>
  ${
    properties.description
      ? `<p class="description">${properties.description}</p>`
      : ''
  }<p>${
    properties.mode === 'driving'
      ? `<i class="fas fa-car"></i>`
      : properties.mode === 'train'
      ? `<i class="fas fa-train"></i>`
      : `<i class="fas fa-plane"></i>`
  } ${properties.distance + ' miles'}</p>
  ${
    properties.departure
      ? `<p><i class="fas fa-location-pin"></i> ${properties.departure}</p>`
      : ''
  }
  <p class="date">${date.toLocaleString('en-US', {
    dateStyle: 'long',
  })}</p>`
}

function showRecreationProperties(properties) {
  const date = properties.date ? new Date(properties.date) : null
  return `<h2>${properties.destination}</h2><p>${properties.city}, ${
    properties.state
  }</p>
  ${
    properties.description
      ? `<p class="description">${properties.description}</p>`
      : ''
  }
  ${
    date !== null
      ? `<p class="date">${date.toLocaleString('en-US', {
          dateStyle: 'long',
        })}</p>`
      : ''
  }`
}

export function removeActiveListing() {
  const activeItem = document.getElementsByClassName('active')
  if (activeItem[0]) {
    activeItem[0].classList.remove('active')
  }
}
