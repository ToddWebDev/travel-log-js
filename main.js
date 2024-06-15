import { logs, ski_resorts, golf_courses, camp_sites } from './logsData.js'
import {
  initializeMap,
  resetMap,
  flyToCoordinates,
  createPopUp,
  removeActiveListing,
  addRoute,
  addFlight,
} from './mapUtils.js'
import { addUniqueIds } from './logUtils.js'
import { buildLogListItem } from './domUtils.js'
import { origin } from './origin.js'

let counter = 0

const map = initializeMap()

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
    year: 2019,
    destination: 'Salt Lake City',
    state: 'Utah',
  },
}

map.on('load', () => {
  /* Add the data to your map as a source  */
  map.addSource('locations', {
    type: 'geojson',
    data: logs,
  })

  // addHomeListing()
  buildAllLogs()

  // Add navigation control (the +/- zoom buttons)
  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

  // Add origin/home marker
  addMarker(origin, '#fcba03')

  addLocationFilter()
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
    resetMap(map, counter)
    flyToCoordinates(map, home.pan.coordinates, home.pan.zoom)
    createPopUp(map, home)

    const activeItem = document.getElementsByClassName('active')
    if (activeItem[0]) {
      activeItem[0].classList.remove('active')
    }
    this.parentNode.classList.add('active')
  })
}

function addLocationFilter() {
  // Create a new select element
  const selectElement = document.createElement('select')

  selectElement.className = 'input-location-filter'

  // Create and add option elements
  const allLocations = document.createElement('option')
  allLocations.value = 'allLocations'
  allLocations.textContent = 'All Locations'
  selectElement.appendChild(allLocations)

  const skiResorts = document.createElement('option')
  skiResorts.value = 'skiResorts'
  skiResorts.textContent = 'Ski Resorts'
  selectElement.appendChild(skiResorts)

  const golfCourses = document.createElement('option')
  golfCourses.value = 'golfCourses'
  golfCourses.textContent = 'Golf Courses'
  selectElement.appendChild(golfCourses)

  const campSites = document.createElement('option')
  campSites.value = 'campSites'
  campSites.textContent = 'Camp Sites'
  selectElement.appendChild(campSites)

  // Add a click event listener to the select element
  selectElement.addEventListener('change', function (event) {
    const selectedValue = selectElement.value

    switch (selectedValue) {
      case 'allLocations':
        removeAllHTMLMarkers()
        addHTMLMarkers(golf_courses.features)
        addHTMLMarkers(camp_sites.features)
        addHTMLMarkers(ski_resorts.features)
        break
      case 'golfCourses':
        removeAllHTMLMarkers()
        addHTMLMarkers(golf_courses.features)
        break
      case 'skiResorts':
        removeAllHTMLMarkers()
        addHTMLMarkers(ski_resorts.features)
        break
      case 'campSites':
        removeAllHTMLMarkers()
        addHTMLMarkers(camp_sites.features)
        break
      default:
        removeAllHTMLMarkers()
        break
    }
  })

  // Append the select element to the page
  const container = document.getElementById('map')
  container.appendChild(selectElement)
}

function buildLogsList(year) {
  addUniqueIds(year)
  const logsDIV = document.getElementById('logs')
  // Add div container for each year and add list of logs
  const logsUL = logsDIV.appendChild(document.createElement('ul'))
  const headerLI = logsUL.appendChild(document.createElement('li'))
  headerLI.className = 'header'
  const label = headerLI.appendChild(document.createElement('p'))
  label.className = 'label'
  label.innerHTML = year.year
  // Build list items for each log
  year.features.forEach(function (log) {
    buildLogListItem(log, logsUL, map, counter)
  })
}

function buildAllLogs() {
  addHTMLMarkers(golf_courses.features)
  addHTMLMarkers(camp_sites.features)
  addHTMLMarkers(ski_resorts.features)
  let sortedLogs = logs.sort((a, b) => b.year - a.year)
  sortedLogs.forEach((log) => {
    let sortedFeatures = log.features.sort(
      (a, b) => new Date(b.properties.date) - new Date(a.properties.date)
    )
    return sortedFeatures
  })
  sortedLogs.forEach((year) => {
    addHTMLMarkers(year.features)
    buildLogsList(year)
  })
}

function addHTMLMarkers(features) {
  /* For each feature in the GeoJSON object above: */
  for (const [index, feature] of features.entries()) {
    /* Create a div element for the marker. */
    const el = document.createElement('div')
    /* Assign a unique `id` to the marker. */
    el.id = `marker-${feature.properties.type}-${feature.properties.mode}-${index}`
    /* Assign the `marker` class to each marker for styling. */
    el.className =
      feature.properties.type === 'golf-course'
        ? 'marker marker-golf-course'
        : feature.properties.type === 'pga-event'
        ? 'marker marker-pga'
        : feature.properties.type === 'national-park'
        ? 'marker marker-national-park'
        : feature.properties.type === 'scenic-point'
        ? 'marker marker-scenic-point'
        : feature.properties.type === 'alpine-skiing'
        ? 'marker marker-alpine-skiing'
        : feature.properties.type === 'camping'
        ? 'marker marker-camp-site'
        : 'marker'

    /**
     * Create a marker using the div element
     * defined above and add it to the map.
     **/
    new mapboxgl.Marker(el, { offset: [0, -25] })
      .setLngLat(feature.geometry.coordinates)
      .addTo(map)

    el.addEventListener('click', (e) => {
      resetMap(map, counter)
      removeActiveListing()
      /* Fly to the point */
      if (feature.properties.mode !== 'recreation') {
        flyToCoordinates(map, feature.pan.coordinates, feature.pan.zoom)
      } else {
        flyToCoordinates(map, feature.geometry.coordinates, 14)
      }
      /* Close all other popups and display popup for clicked store */
      createPopUp(map, feature)
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
      if (feature.properties.mode !== 'recreation') {
        /* Highlight listing in sidebar */
        const listing = document.getElementById(
          `listing-${feature.properties.id}`
        )
        listing.classList.add('active')
        listing.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
  }
}

function removeHTMLMarkers(features) {
  /* For each feature in the GeoJSON object above: */
  for (const [index, feature] of features.entries()) {
    // Get the element by its ID
    const element = document.getElementById(
      `marker-${feature.properties.type}-${feature.properties.mode}-${index}`
    )

    // Check if the element exists
    if (element) {
      // Remove the element from the DOM
      element.remove()
    }
  }
}

function removeAllHTMLMarkers() {
  removeHTMLMarkers(golf_courses.features)
  removeHTMLMarkers(camp_sites.features)
  removeHTMLMarkers(ski_resorts.features)
}

function addMarker(coordinates, color) {
  new mapboxgl.Marker({
    color: color,
  })
    .setLngLat(coordinates)
    .addTo(map)
}

function addMarkers(features, color) {
  /* For each feature in the GeoJSON object above: */
  for (const feature of features) {
    addMarker(feature.geometry.coordinates, color)
  }
}
