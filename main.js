mapboxgl.accessToken =
  'pk.eyJ1IjoidG9kZHdlYmRldiIsImEiOiJjanlidjVoMHQwYjBqM2RvY2poMGFwc3l0In0.sLNe9kgTJ5pAwrzTc9_5cQ'

const origin = [-111.8999, 40.6111]

let steps = 500
let counter = 0

const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: origin, // starting position [lng, lat]
  zoom: 5, // starting zoom
  pitch: 0,
})

const home = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: origin,
  },
  pan: {
    coordinates: origin,
    zoom: 10,
  },
  properties: {
    mode: 'home',
    month: 'January',
    year: '2019',
    destination: 'Salt Lake City',
    state: 'Utah',
  },
}

const logs = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.3321, 47.6062],
      },
      pan: {
        coordinates: [-116.78644177555437, 44.2884079320018],
        zoom: 5,
      },
      start: {
        coordinates: origin,
      },
      properties: {
        mode: 'driving',
        month: 'May',
        year: '2019',
        destination: 'Seattle',
        state: 'Washington',
        distance: 851,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-123.8313, 46.1879],
      },
      pan: {
        coordinates: [-123.0886165508648, 46.90233274137791],
        zoom: 7.5,
      },
      start: {
        coordinates: [-122.3321, 47.6062],
      },
      properties: {
        mode: 'driving',
        month: 'May',
        year: '2019',
        destination: 'Astoria',
        state: 'Oregon',
        distance: 177,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-124.0046, 41.2132],
      },
      pan: {
        coordinates: [-123.92154707949429, 43.7005826707189],
        zoom: 6.25,
      },
      start: {
        coordinates: [-123.8313, 46.1879],
      },
      properties: {
        mode: 'driving',
        month: 'May',
        year: '2019',
        destination: 'Redwood National Park',
        state: 'California',
        distance: 417,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.4194, 37.7749],
      },
      pan: {
        coordinates: [-123.19556069262748, 39.50361605084848],
        zoom: 7,
      },
      start: {
        coordinates: [-124.0046, 41.2132],
      },
      properties: {
        mode: 'driving',
        month: 'June',
        year: '2019',
        destination: 'San Francisco',
        state: 'California',
        distance: 327,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-119.5383, 37.8651],
      },
      pan: {
        coordinates: [-120.98549301726592, 37.828592490655986],
        zoom: 7.5,
      },
      start: {
        coordinates: [-122.4194, 37.7749],
      },
      properties: {
        mode: 'driving',
        month: 'July',
        year: '2019',
        destination: 'Yosemite National Park',
        state: 'California',
        distance: 192,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.9486, 36.5725],
      },
      pan: {
        coordinates: [-120.74895706125952, 37.227490516885304],
        zoom: 7.5,
      },
      start: {
        coordinates: [-119.5383, 37.8651],
      },
      properties: {
        mode: 'driving',
        month: 'August',
        year: '2019',
        destination: 'Pebble Beach',
        state: 'California',
        distance: 225,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-117.6126, 33.4274],
      },
      pan: {
        coordinates: [-119.74757369808816, 35.02551397492231],
        zoom: 6,
      },
      start: {
        coordinates: [-121.9486, 36.5725],
      },
      properties: {
        mode: 'driving',
        month: 'August',
        year: '2019',
        destination: 'San Clemente',
        state: 'California',
        distance: 391,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-114.7377, 36.0161],
      },
      pan: {
        coordinates: [-116.20340957805965, 34.72501255520023],
        zoom: 7,
      },
      start: {
        coordinates: [-117.6126, 33.4274],
      },
      properties: {
        mode: 'driving',
        month: 'October',
        year: '2019',
        destination: 'Hoover Dam',
        state: 'Nevada',
        distance: 307,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-112.1076, 36.0604],
      },
      pan: {
        coordinates: [-113.4282804608597, 36.045341726061366],
        zoom: 7.5,
      },
      start: {
        coordinates: [-114.7377, 36.0161],
      },
      properties: {
        mode: 'driving',
        month: 'October',
        year: '2019',
        destination: 'Grand Canyon National Park',
        state: 'Arizona',
        description: 'South Rim',
        distance: 249,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.5104, 36.8791],
      },
      pan: {
        coordinates: [-111.81177121913402, 36.468484496277185],
        zoom: 8.25,
      },
      start: {
        coordinates: [-112.1076, 36.0604],
      },
      properties: {
        mode: 'driving',
        month: 'November',
        year: '2019',
        destination: 'Horseshoe Bend',
        state: 'Arizona',
        distance: 133,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-113.0263, 37.2982],
      },
      pan: {
        coordinates: [-112.26322243059343, 37.09022349960718],
        zoom: 7.5,
      },
      start: {
        coordinates: [-111.5104, 36.8791],
      },
      properties: {
        mode: 'driving',
        month: 'November',
        year: '2019',
        destination: 'Zion National Park',
        state: 'Utah',
        distance: 157,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-117.6126, 33.4274],
      },
      pan: {
        coordinates: [-114.87913045491008, 37.14307504778424],
        zoom: 6,
      },
      start: {
        coordinates: origin,
      },
      properties: {
        mode: 'flight',
        month: 'July',
        year: '2020',
        destination: 'San Clemente',
        state: 'California',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-84.2333, 39.5523],
      },
      pan: {
        coordinates: [-97.99241754854586, 40.99151566036469],
        zoom: 5,
      },
      start: {
        coordinates: origin,
      },
      properties: {
        mode: 'flight',
        month: 'November',
        year: '2020',
        destination: 'Springboro',
        state: 'Ohio',
      },
    },
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
      start: {
        coordinates: origin,
      },
      properties: {
        mode: 'flight',
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
      pan: {
        coordinates: [-111.30093632213028, 42.27718688306124],
        zoom: 6.75,
      },
      start: {
        coordinates: origin,
      },
      properties: {
        mode: 'driving',
        month: 'June',
        year: '2021',
        destination: 'Grand Teton National Park',
        state: 'Wyoming',
        distance: 300,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-109.821, 38.4598],
      },
      pan: {
        coordinates: [-110.87853505263796, 39.491432526194124],
        zoom: 7.25,
      },
      start: {
        coordinates: origin,
      },
      properties: {
        mode: 'driving',
        month: 'August',
        year: '2021',
        destination: 'Canyonlands National Park',
        state: 'Utah',
        distance: 233,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-110.0986, 36.9969],
      },
      pan: {
        coordinates: [-109.96061585882612, 37.73135716373229],
        zoom: 8,
      },
      start: {
        coordinates: [-109.821, 38.4598],
      },
      properties: {
        mode: 'driving',
        month: 'August',
        year: '2021',
        destination: 'Monument Valley',
        state: 'Utah',
        distance: 182,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.3743, 36.8619],
      },
      pan: {
        coordinates: [-110.73446338699108, 36.93137527991146],
        zoom: 8,
      },
      start: {
        coordinates: [-110.0986, 36.9969],
      },
      properties: {
        mode: 'driving',
        month: 'August',
        year: '2021',
        destination: 'Antelope Canyon',
        state: 'Arizona',
        distance: 119,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-112.0581, 36.2135],
      },
      pan: {
        coordinates: [-111.71626593622823, 36.53948476316447],
        zoom: 9,
      },
      start: {
        coordinates: [-111.3743, 36.8619],
      },
      properties: {
        mode: 'driving',
        month: 'August',
        year: '2021',
        destination: 'Grand Canyon National Park',
        state: 'Arizona',
        description: 'North Rim',
        distance: 128,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-112.1871, 37.593],
      },
      pan: {
        coordinates: [-112.12175894986007, 36.90050842961888],
        zoom: 8,
      },
      start: {
        coordinates: [-112.0581, 36.2135],
      },
      properties: {
        mode: 'driving',
        month: 'August',
        year: '2021',
        destination: 'Bryce Canyon National Park',
        state: 'Utah',
        distance: 160,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-113.0263, 37.2982],
      },
      pan: {
        coordinates: [-112.47255923068407, 39.03087475830939],
        zoom: 7,
      },
      start: {
        coordinates: origin,
      },
      properties: {
        mode: 'driving',
        month: 'May',
        year: '2022',
        destination: 'Zion National Park',
        state: 'Utah',
        distance: 293,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-117.6126, 33.4274],
      },
      pan: {
        coordinates: [-114.87913045491008, 37.14307504778424],
        zoom: 6,
      },
      start: {
        coordinates: origin,
      },
      properties: {
        mode: 'driving',
        month: 'June',
        year: '2022',
        destination: 'San Clemente',
        state: 'California',
        distance: 697,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-116.6141, 33.8371],
      },
      pan: {
        coordinates: [-117.11653439312553, 33.63243363757619],
        zoom: 9,
      },
      start: {
        coordinates: [-117.6126, 33.4274],
      },
      properties: {
        mode: 'driving',
        month: 'June',
        year: '2022',
        destination: 'Palm Springs',
        state: 'California',
        distance: 113,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-115.901, 33.8734],
      },
      pan: {
        coordinates: [-116.25905197457654, 33.855690648706684],
        zoom: 8,
      },
      start: {
        coordinates: [-116.6141, 33.8371],
      },
      properties: {
        mode: 'driving',
        month: 'June',
        year: '2022',
        destination: 'Joshua Tree National Park',
        state: 'California',
        distance: 79,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.1355, 38.0877],
      },
      pan: {
        coordinates: [-113.59145742554648, 35.99566512012293],
        zoom: 6.5,
      },
      start: {
        coordinates: [-115.901, 33.8734],
      },
      properties: {
        mode: 'driving',
        month: 'June',
        year: '2022',
        destination: 'Capital Reef National Park',
        state: 'Utah',
        distance: 594,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-121.7817, 42.2249],
      },
      pan: {
        coordinates: [-116.76052177075833, 41.59596822261041],
        zoom: 6,
      },
      start: {
        coordinates: origin,
      },
      properties: {
        mode: 'driving',
        month: 'August',
        year: '2022',
        destination: 'Klamath Falls',
        state: 'Oregon',
        distance: 779,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.1279, 42.9295],
      },
      pan: {
        coordinates: [-121.95312968571488, 42.575921063512325],
        zoom: 9,
      },
      start: {
        coordinates: [-121.7817, 42.2249],
      },
      properties: {
        mode: 'driving',
        month: 'August',
        year: '2022',
        destination: 'Crater Lake National Park',
        state: 'Oregon',
        distance: 61,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.39, 43.2415],
      },
      pan: {
        coordinates: [-122.2580920791247, 43.08495076622465],
        zoom: 10,
      },
      start: {
        coordinates: [-122.1279, 42.9295],
      },
      properties: {
        mode: 'driving',
        month: 'August',
        year: '2022',
        destination: 'Watson Falls',
        state: 'Oregon',
        distance: 40,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.6784, 45.5152],
      },
      pan: {
        coordinates: [-122.53082340266808, 44.37389326296227],
        zoom: 7.75,
      },
      start: {
        coordinates: [-122.39, 43.2415],
      },
      properties: {
        mode: 'driving',
        month: 'August',
        year: '2022',
        destination: 'Portland',
        state: 'Oregon',
        distance: 233,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.1158, 45.5762],
      },
      pan: {
        coordinates: [-122.39837782601055, 45.54592320050154],
        zoom: 9.25,
      },
      start: {
        coordinates: [-122.6784, 45.5152],
      },
      properties: {
        mode: 'driving',
        month: 'August',
        year: '2022',
        destination: 'Multnomah Falls',
        state: 'Oregon',
        distance: 30,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-114.401, 42.5937],
      },
      pan: {
        coordinates: [-118.17641931751784, 44.155823935637954],
        zoom: 6.5,
      },
      start: {
        coordinates: [-122.1158, 45.5762],
      },
      properties: {
        mode: 'driving',
        month: 'August',
        year: '2022',
        destination: 'Shoshone Falls',
        state: 'Idaho',
        distance: 528,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-109.5925, 38.7331],
      },
      pan: {
        coordinates: [-110.72943057013381, 39.756671417162394],
        zoom: 7.5,
      },
      start: {
        coordinates: origin,
      },
      properties: {
        mode: 'driving',
        month: 'November',
        year: '2022',
        destination: 'Arches National Park',
        state: 'Utah',
        distance: 233,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [139.7563, 35.6648],
      },
      pan: {
        coordinates: [191.36606983230297, 53.39446500917633],
        zoom: 2.5,
      },
      start: {
        coordinates: [-122.4194, 37.7749],
      },
      properties: {
        mode: 'flight',
        month: 'April',
        year: '2023',
        destination: 'Tokyo',
        state: 'Japan',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [139.1069, 35.2324],
      },
      pan: {
        coordinates: [139.37893748535635, 35.45549198809632],
        zoom: 9,
      },
      start: {
        coordinates: [139.7563, 35.6648],
      },
      properties: {
        mode: 'driving',
        month: 'April',
        year: '2023',
        destination: 'Hakone',
        state: 'Japan',
        distance: 53,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [135.7681, 35.0116],
      },
      pan: {
        coordinates: [137.44191503720106, 35.13388833198617],
        zoom: 7.5,
      },
      start: {
        coordinates: [139.1069, 35.2324],
      },
      properties: {
        mode: 'driving',
        month: 'April',
        year: '2023',
        destination: 'Kyoto',
        state: 'Japan',
        distance: 233,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [135.5023, 34.6937],
      },
      pan: {
        coordinates: [135.63547485005572, 34.8533580821886],
        zoom: 10,
      },
      start: {
        coordinates: [135.7681, 35.0116],
      },
      properties: {
        mode: 'driving',
        month: 'April',
        year: '2023',
        destination: 'Osaka',
        state: 'Japan',
        distance: 35,
      },
    },
  ],
}

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

function resetMap() {
  if (map.getLayer('route')) map.removeLayer('route')
  if (map.getSource('route')) map.removeSource('route')
  if (map.getLayer('point')) map.removeLayer('point')
  if (map.getSource('point')) map.removeSource('point')
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

  addHomeListing()
  buildLogsList(logs)

  // Add navigation control (the +/- zoom buttons)
  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

  addMarkers()
})

function addHomeListing() {
  /* Add a new home section to the sidebar. */
  const listing = document.getElementById('home')
  listing.className = 'item'
  /* Add details to the individual listing. */
  const label = listing.appendChild(document.createElement('p'))
  label.className = 'label'
  label.innerHTML = 'home'

  /* Add the link to the individual listing created above. */
  const link = listing.appendChild(document.createElement('a'))
  link.href = '#'
  link.className = 'title'
  link.id = `link-home`
  link.innerHTML = 'Salt Lake City'

  /* Add event listener */
  link.addEventListener('click', function () {
    resetMap()
    flyToCoordinates(home)
    createPopUp(home)

    const activeItem = document.getElementsByClassName('active')
    if (activeItem[0]) {
      activeItem[0].classList.remove('active')
    }
    this.parentNode.classList.add('active')
  })
}

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
    const label = listing.appendChild(document.createElement('p'))
    label.className = 'label'
    label.innerHTML =
      log.properties.mode === 'home'
        ? 'home'
        : log.properties.month + ', ' + log.properties.year

    /* Add the link to the individual listing created above. */
    const link = listing.appendChild(document.createElement('a'))
    link.href = '#'
    link.className = 'title'
    link.id = `link-${log.properties.id}`
    link.innerHTML = `${log.properties.destination}`

    /* Add event listeners */
    link.addEventListener('click', function () {
      resetMap()
      for (const feature of logs.features) {
        if (this.id === `link-${feature.properties.id}`) {
          flyToCoordinates(feature)
          createPopUp(feature)
          if (feature.properties.mode === 'driving') {
            addRoute(feature.start.coordinates, feature.geometry.coordinates)
          }
          if (feature.properties.mode === 'flight') {
            addFlight(feature.start.coordinates, feature.geometry.coordinates)
          }
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
  for (const feature of logs.features) {
    new mapboxgl.Marker({
      color: `${feature.properties.mode === 'home' ? '#249369' : '#c53058'}`,
    })
      .setLngLat(feature.geometry.coordinates)
      .addTo(map)
  }
}

async function addRoute(start, destination) {
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${destination[0]},${destination[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
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

function addFlight(start, destination) {
  route.features[0].geometry.coordinates = [start, destination]
  // Calculate the distance in kilometers between route start/end point.
  const lineDistance = turf.length(route.features[0])

  const arc = []

  // Draw an arc between the `start` & `destination` of the two points
  for (let i = 0; i < lineDistance; i += lineDistance / steps) {
    const segment = turf.along(route.features[0], i)
    arc.push(segment.geometry.coordinates)
  }

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
      `<h3>${currentFeature.properties.destination}, ${
        currentFeature.properties.state
      }</h3>${
        currentFeature.properties.description
          ? `<p>${currentFeature.properties.description}</p>`
          : ''
      }<p>${currentFeature.properties.mode}${
        currentFeature.properties.mode === 'driving'
          ? ': ' + currentFeature.properties.distance + ' miles'
          : ''
      }</p><p>${currentFeature.properties.month} ${
        currentFeature.properties.year
      }</p>`
    )
    .addTo(map)

  popup.on('close', function (e) {
    resetMap()
  })
}
