mapboxgl.accessToken =
  'pk.eyJ1IjoidG9kZHdlYmRldiIsImEiOiJjanlidjVoMHQwYjBqM2RvY2poMGFwc3l0In0.sLNe9kgTJ5pAwrzTc9_5cQ'

const origin = [-111.8999, 40.6111] //SLC
// const origin = [-82.9988, 39.9612] //Ohio

let steps = 500
let counter = 0
let viewportWidth = window.innerWidth

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
    year: 2019,
    destination: 'Salt Lake City',
    state: 'Utah',
  },
}

// An array of logs grouped by year
const logs = [
  {
    type: 'FeatureCollection',
    year: 2011,
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-81.78, 24.5551],
        },
        pan: {
          coordinates: [-80.98665131800117, 25.16293086183768],
          zoom: calcViewportZoom(8.5),
        },
        start: {
          coordinates: [-80.1918, 25.7617],
        },
        properties: {
          mode: 'driving',
          month: 'July',
          date: '2011-07-25',
          departure: 'Miami',
          destination: 'Key West',
          state: 'Florida',
          distance: 205,
        },
      },
    ],
  },
  {
    type: 'FeatureCollection',
    year: 2012,
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-81.6557, 30.3322],
        },
        pan: {
          coordinates: [-82.29009740272744, 35.16780476986607],
          zoom: calcViewportZoom(5.5),
        },
        start: {
          coordinates: [-82.9988, 39.9612],
        },
        properties: {
          mode: 'driving',
          month: 'May',
          date: '2012-05-07',
          departure: 'Columbus',
          destination: 'Jacksonville',
          state: 'Florida',
          distance: 810,
        },
      },
    ],
  },
  {
    type: 'FeatureCollection',
    year: 2013,
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-86.7816, 36.1627],
        },
        pan: {
          coordinates: [-84.93176935810186, 38.08469649580659],
          zoom: calcViewportZoom(6.5),
        },
        start: {
          coordinates: [-82.9988, 39.9612],
        },
        properties: {
          mode: 'driving',
          month: 'August',
          date: '2012-08-13',
          departure: 'Columbus',
          destination: 'Nashville',
          state: 'Tennessee',
          distance: 380,
        },
      },
    ],
  },
  {
    type: 'FeatureCollection',
    year: 2016,
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-90.049, 35.1495],
        },
        pan: {
          coordinates: [-88.41913089291256, 35.669160084068785],
          zoom: calcViewportZoom(8),
        },
        start: {
          coordinates: [-86.7816, 36.1627],
        },
        properties: {
          mode: 'driving',
          month: 'May',
          date: '2016-05-08',
          departure: 'Nashville',
          destination: 'Memphis',
          state: 'Tennessee',
          distance: 315,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-80.1373, 26.1224],
        },
        pan: {
          coordinates: [-83.2961390890805, 31.205198984345444],
          zoom: calcViewportZoom(6),
        },
        start: {
          coordinates: [-86.7816, 36.1627],
        },
        properties: {
          mode: 'flight',
          month: 'June',
          date: '2016-06-10',
          departure: 'Nashville',
          destination: 'Fort Lauderdale',
          state: 'Florida',
          distance: 793,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-86.4958, 30.3935],
        },
        pan: {
          coordinates: [-86.63454465601197, 33.289720074203565],
          zoom: calcViewportZoom(6.5),
        },
        start: {
          coordinates: [-86.7816, 36.1627],
        },
        properties: {
          mode: 'driving',
          month: 'August',
          date: '2016-08-13',
          description: '2016 & 2017',
          departure: 'Nashville',
          destination: 'Destin',
          state: 'Florida',
          distance: 451,
        },
      },
    ],
  },
  {
    type: 'FeatureCollection',
    year: 2017,
    description: 'Remote Year',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [12.4964, 41.9028],
        },
        pan: {
          coordinates: [-35.49729937098084, 53.39852953638376],
          zoom: calcViewportZoom(3),
        },
        start: {
          coordinates: [-83.3525, 42.2132],
        },
        properties: {
          mode: 'flight',
          month: 'June',
          year: 2017,
          date: '2017-06-01',
          departure: 'Detroit',
          destination: 'Rome',
          country: 'Italy',
          distance: 4604,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [11.2558, 43.7696],
        },
        pan: {
          coordinates: [11.88795093207377, 42.834139985543274],
          zoom: calcViewportZoom(7.5),
        },
        start: {
          coordinates: [12.4964, 41.9028],
        },
        properties: {
          mode: 'train',
          month: 'June',
          year: 2017,
          date: '2017-06-03',
          departure: 'Rome',
          destination: 'Florence',
          country: 'Italy',
          distance: 168,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [12.3155, 45.4408],
        },
        pan: {
          coordinates: [11.775908970171603, 44.60308209762107],
          zoom: calcViewportZoom(7.5),
        },
        start: {
          coordinates: [11.2558, 43.7696],
        },
        properties: {
          mode: 'train',
          month: 'June',
          year: 2017,
          date: '2017-06-05',
          departure: 'Florence',
          destination: 'Venice',
          country: 'Italy',
          distance: 167,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [11.5903, 45.7676],
        },
        pan: {
          coordinates: [11.955406523792833, 45.604119937575604],
          zoom: calcViewportZoom(7.5),
        },
        start: {
          coordinates: [12.3155, 45.4408],
        },
        properties: {
          mode: 'driving',
          month: 'June',
          year: 2017,
          date: '2017-06-06',
          departure: 'Venice',
          destination: 'Laverda',
          country: 'Italy',
          distance: 67,
        },
      },
    ],
  },
  {
    type: 'FeatureCollection',
    year: 2018,
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-121.8853, 37.3387],
        },
        pan: {
          coordinates: [-104.12352835727609, 38.06615089474022],
          zoom: calcViewportZoom(5),
        },
        start: {
          coordinates: [-86.7816, 36.1627],
        },
        properties: {
          mode: 'flight',
          month: 'June',
          date: '2018-06-16',
          departure: 'Nashville',
          destination: 'San Jose',
          state: 'California',
          distance: 1934,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-117.7854, 33.5427],
        },
        pan: {
          coordinates: [-102.47406435594321, 35.8596814678772],
          zoom: calcViewportZoom(5),
        },
        start: {
          coordinates: [-86.7816, 36.1627],
        },
        properties: {
          mode: 'flight',
          month: 'September',
          date: '2018-09-30',
          departure: 'Nashville',
          destination: 'Laguna Beach',
          state: 'California',
          distance: 1760,
        },
      },
    ],
  },
  {
    type: 'FeatureCollection',
    year: 2019,
    description: 'Remote Year',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-106.1516265, 39.501419],
        },
        pan: {
          coordinates: [-95.15246968270525, 40.04551423560155],
          zoom: calcViewportZoom(5.5),
        },
        start: {
          coordinates: [-84.2333, 39.5523],
        },
        properties: {
          type: 'alpine-skiing',
          mode: 'driving',
          month: 'January',
          year: 2019,
          date: '2019-01-03',
          departure: 'Springboro',
          destination: 'Copper Mountain',
          state: 'Colorado',
          distance: 1294,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: origin,
        },
        pan: {
          coordinates: [-108.99084293346324, 40.08956281212634],
          zoom: calcViewportZoom(7.25),
        },
        start: {
          coordinates: [-106.1516265, 39.501419],
        },
        properties: {
          mode: 'driving',
          month: 'January',
          year: 2019,
          date: '2019-01-05',
          departure: 'Copper Mountain',
          destination: 'Salt Lake City',
          state: 'Utah',
          distance: 440,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.3321, 47.6062],
        },
        pan: {
          coordinates: [-116.78644177555437, 44.2884079320018],
          zoom: calcViewportZoom(5),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          mode: 'driving',
          month: 'May',
          year: 2019,
          date: '2019-05-01',
          departure: 'Salt Lake City',
          destination: 'Seattle',
          state: 'Washington',
          distance: 851,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-123.8157, 46.9754],
        },
        pan: {
          coordinates: [-123.07535682017608, 47.294454930337174],
          zoom: calcViewportZoom(8.5),
        },
        start: {
          coordinates: [-122.3321, 47.6062],
        },
        properties: {
          mode: 'driving',
          month: 'May',
          year: 2019,
          date: '2019-05-27',
          departure: 'Seattle',
          destination: 'Aberdeen',
          state: 'Oregon',
          distance: 109,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-123.8313, 46.1879],
        },
        pan: {
          coordinates: [-123.82352544980225, 46.58322526505187],
          zoom: calcViewportZoom(8.5),
        },
        start: {
          coordinates: [-123.8157, 46.9754],
        },
        properties: {
          type: 'scenic-point',
          mode: 'driving',
          month: 'May',
          year: 2019,
          date: '2019-05-28',
          departure: 'Aberdeen',
          destination: 'Astoria',
          state: 'Oregon',
          distance: 88,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-123.9682, 45.8845],
        },
        pan: {
          coordinates: [-123.89966410948887, 46.03682723037097],
          zoom: calcViewportZoom(10.5),
        },
        start: {
          coordinates: [-123.8313, 46.1879],
        },
        properties: {
          type: 'scenic-point',
          mode: 'driving',
          month: 'May',
          year: 2019,
          date: '2019-05-28',
          departure: 'Astoria',
          destination: 'Cannon Beach',
          description: 'Haystack Rock',
          state: 'Oregon',
          distance: 26,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-124.0795, 44.6768],
        },
        pan: {
          coordinates: [-124.02421972495421, 45.28307891124361],
          zoom: calcViewportZoom(8),
        },
        start: {
          coordinates: [-123.9682, 45.8845],
        },
        properties: {
          type: 'scenic-point',
          mode: 'driving',
          month: 'May',
          year: 2019,
          date: '2019-05-29',
          departure: 'Haystack Rock',
          destination: 'Newport',
          description: 'Yaquina Head Lighthouse',
          state: 'Oregon',
          distance: 134,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-124.284, 42.0526],
        },
        pan: {
          coordinates: [-124.18437067494794, 43.35949711708747],
          zoom: calcViewportZoom(7.25),
        },
        start: {
          coordinates: [-124.0795, 44.6768],
        },
        properties: {
          type: 'scenic-point',
          mode: 'driving',
          month: 'May',
          year: 2019,
          date: '2019-05-30',
          departure: 'Newport',
          destination: 'Brookings',
          description: 'Crater Lake Zip Line',
          state: 'Oregon',
          distance: 209,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-124.0046, 41.2132],
        },
        pan: {
          coordinates: [-124.14394916326553, 41.6346633658],
          zoom: calcViewportZoom(9),
        },
        start: {
          coordinates: [-124.284, 42.0526],
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'June',
          year: 2019,
          date: '2019-06-01',
          departure: 'Brookings',
          destination: 'Redwood National Park',
          state: 'California',
          distance: 78,
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
          zoom: calcViewportZoom(7),
        },
        start: {
          coordinates: [-124.0046, 41.2132],
        },
        properties: {
          mode: 'driving',
          month: 'June',
          year: 2019,
          date: '2019-06-04',
          departure: 'Redwood National Park',
          destination: 'San Francisco',
          state: 'California',
          distance: 327,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-121.9486, 36.5725],
        },
        pan: {
          coordinates: [-122.17034054754755, 37.167747885377445],
          zoom: calcViewportZoom(8.5),
        },
        start: {
          coordinates: [-122.4194, 37.7749],
        },
        properties: {
          type: 'pga-event',
          mode: 'driving',
          month: 'June',
          year: 2019,
          date: '2019-06-13',
          departure: 'San Francisco',
          destination: 'Pebble Beach',
          description: 'U.S. Open',
          state: 'California',
          distance: 119,
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
          zoom: calcViewportZoom(7.5),
        },
        start: {
          coordinates: [-122.4194, 37.7749],
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'July',
          year: 2019,
          date: '2019-07-04',
          departure: 'San Francisco',
          destination: 'Yosemite National Park',
          state: 'California',
          distance: 192,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-121.9233, 36.5552],
        },
        pan: {
          coordinates: [-122.17034054754755, 37.167747885377445],
          zoom: calcViewportZoom(8.5),
        },
        start: {
          coordinates: [-122.4194, 37.7749],
        },
        properties: {
          mode: 'driving',
          month: 'August',
          year: 2019,
          date: '2019-08-17',
          departure: 'San Francisco',
          destination: 'Carmel by the Sea',
          state: 'California',
          distance: 119,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-121.8081, 36.2704],
        },
        pan: {
          coordinates: [-121.86582480706683, 36.41338343085843],
          zoom: calcViewportZoom(10.5),
        },
        start: {
          coordinates: [-121.9233, 36.5552],
        },
        properties: {
          type: 'scenic-point',
          mode: 'driving',
          month: 'August',
          year: 2019,
          date: '2019-08-17 00:00:0000',
          departure: 'Carmel by the Sea',
          destination: 'Big Sur',
          state: 'California',
          distance: 26,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-119.6982, 34.4208],
        },
        pan: {
          coordinates: [-120.74529014881557, 35.353882138870475],
          zoom: calcViewportZoom(7.5),
        },
        start: {
          coordinates: [-121.8081, 36.2704],
        },
        properties: {
          mode: 'driving',
          month: 'August',
          year: 2019,
          date: '2019-08-18',
          departure: 'Big Sur',
          destination: 'Santa Barbara',
          state: 'California',
          distance: 200,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-117.6126, 33.4274],
        },
        pan: {
          coordinates: [-118.6534901641224, 33.93048173077998],
          zoom: calcViewportZoom(8),
        },
        start: {
          coordinates: [-119.6982, 34.4208],
        },
        properties: {
          mode: 'driving',
          month: 'August',
          year: 2019,
          date: '2019-08-20',
          departure: 'Santa Barbara',
          destination: 'San Clemente',
          state: 'California',
          distance: 159,
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
          zoom: calcViewportZoom(7),
        },
        start: {
          coordinates: [-117.6126, 33.4274],
        },
        properties: {
          type: 'scenic-point',
          mode: 'driving',
          month: 'October',
          year: 2019,
          date: '2019-10-01',
          departure: 'San Clemente',
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
          zoom: calcViewportZoom(7.5),
        },
        start: {
          coordinates: [-114.7377, 36.0161],
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'October',
          year: 2019,
          date: '2019-10-15',
          departure: 'Hoover Dam',
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
          zoom: calcViewportZoom(8.25),
        },
        start: {
          coordinates: [-112.1076, 36.0604],
        },
        properties: {
          type: 'scenic-point',
          mode: 'driving',
          month: 'November',
          year: 2019,
          date: '2019-11-01',
          departure: 'Grand Canyon National Park',
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
          zoom: calcViewportZoom(7.5),
        },
        start: {
          coordinates: [-111.5104, 36.8791],
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'November',
          year: 2019,
          date: '2019-11-05',
          departure: 'Horseshoe Bend',
          destination: 'Zion National Park',
          state: 'Utah',
          distance: 157,
        },
      },
    ],
  },
  {
    type: 'FeatureCollection',
    year: 2020,
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-117.6126, 33.4274],
        },
        pan: {
          coordinates: [-114.87913045491008, 37.14307504778424],
          zoom: calcViewportZoom(6),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          mode: 'flight',
          month: 'July',
          year: 2020,
          date: '2020-07-15',
          departure: 'Salt Lake City',
          destination: 'San Clemente',
          state: 'California',
          distance: 585,
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
          zoom: calcViewportZoom(5),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          mode: 'flight',
          month: 'November',
          year: 2020,
          date: '2020-11-15',
          departure: 'Salt Lake City',
          destination: 'Springboro',
          state: 'Ohio',
          distance: 2347,
        },
      },
    ],
  },
  {
    type: 'FeatureCollection',
    year: 2021,
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-117.1611, 32.7157],
        },
        pan: {
          coordinates: [-114.66446033065944, 36.76722997619034],
          zoom: calcViewportZoom(6),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          mode: 'flight',
          month: 'May',
          year: 2021,
          date: '2021-05-15',
          departure: 'Salt Lake City',
          destination: 'San Diego',
          state: 'California',
          distance: 742,
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
          zoom: calcViewportZoom(6.75),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'June',
          year: 2021,
          date: '2021-06-15',
          departure: 'Salt Lake City',
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
          zoom: calcViewportZoom(7.25),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'August',
          year: 2021,
          date: '2021-08-15',
          departure: 'Salt Lake City',
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
          zoom: calcViewportZoom(8),
        },
        start: {
          coordinates: [-109.821, 38.4598],
        },
        properties: {
          type: 'scenic-point',
          mode: 'driving',
          month: 'August',
          year: 2021,
          date: '2021-08-17',
          departure: 'Canyonlands National Park',
          destination: 'Monument Valley',
          state: 'Utah',
          distance: 182,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-111.37433, 36.86191],
        },
        pan: {
          coordinates: [-110.73446338699108, 36.93137527991146],
          zoom: calcViewportZoom(8),
        },
        start: {
          coordinates: [-110.0986, 36.9969],
        },
        properties: {
          type: 'scenic-point',
          mode: 'driving',
          month: 'August',
          year: 2021,
          date: '2021-08-19',
          departure: 'Monument Valley',
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
          zoom: calcViewportZoom(9),
        },
        start: {
          coordinates: [-111.3743, 36.8619],
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'August',
          year: 2021,
          date: '2021-08-20',
          departure: 'Antelope Canyon',
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
          zoom: calcViewportZoom(8),
        },
        start: {
          coordinates: [-112.0581, 36.2135],
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'August',
          year: 2021,
          date: '2021-08-22',
          departure: 'Grand Canyon National Park',
          destination: 'Bryce Canyon National Park',
          state: 'Utah',
          distance: 160,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-115.1391, 36.1716],
        },
        pan: {
          coordinates: [-113.56278442879626, 38.4113646516437],
          zoom: calcViewportZoom(7),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          mode: 'driving',
          month: 'October',
          year: 2021,
          date: '2021-10-05',
          departure: 'Salt Lake City',
          destination: 'Las Vegas',
          state: 'Nevada',
          distance: 411,
        },
      },
    ],
  },
  {
    type: 'FeatureCollection',
    year: 2022,
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-113.0263, 37.2982],
        },
        pan: {
          coordinates: [-112.47255923068407, 39.03087475830939],
          zoom: calcViewportZoom(7),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'May',
          year: 2022,
          date: '2022-05-20',
          departure: 'Salt Lake City',
          destination: 'Zion National Park',
          state: 'Utah',
          distance: 293,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-84.6366, 39.7439],
        },
        pan: {
          coordinates: [-97.99241754854586, 40.99151566036469],
          zoom: calcViewportZoom(5),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          mode: 'flight',
          month: 'June',
          year: 2020,
          date: '2022-06-15',
          departure: 'Salt Lake City',
          destination: 'Eaton',
          description: 'Conrad T. Rizzolo 1938-2022',
          state: 'Ohio',
          distance: 2308,
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
          zoom: calcViewportZoom(6),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          mode: 'driving',
          month: 'June',
          year: 2022,
          date: '2022-06-20',
          departure: 'Salt Lake City',
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
          zoom: calcViewportZoom(9),
        },
        start: {
          coordinates: [-117.6126, 33.4274],
        },
        properties: {
          type: 'scenic-point',
          mode: 'driving',
          month: 'June',
          year: 2022,
          date: '2022-06-29',
          destination: 'San Clemente',
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
          zoom: calcViewportZoom(8),
        },
        start: {
          coordinates: [-116.6141, 33.8371],
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'June',
          year: 2022,
          date: '2022-06-30',
          departure: 'Palm Springs',
          destination: 'Joshua Tree National Park',
          state: 'California',
          distance: 79,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-111.2468, 38.2855],
        },
        pan: {
          coordinates: [-113.59145742554648, 35.99566512012293],
          zoom: calcViewportZoom(6.5),
        },
        start: {
          coordinates: [-115.901, 33.8734],
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'July',
          year: 2022,
          date: '2022-07-01',
          departure: 'Joshua Tree National Park',
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
          zoom: calcViewportZoom(6),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          mode: 'driving',
          month: 'August',
          year: 2022,
          date: '2022-08-17',
          departure: 'Salt Lake City',
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
          zoom: calcViewportZoom(9),
        },
        start: {
          coordinates: [-121.7817, 42.2249],
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'August',
          year: 2022,
          date: '2022-08-19',
          departure: 'Klamath Falls',
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
          zoom: calcViewportZoom(10),
        },
        start: {
          coordinates: [-122.1279, 42.9295],
        },
        properties: {
          type: 'scenic-point',
          mode: 'driving',
          month: 'August',
          year: 2022,
          date: '2022-08-20',
          departure: 'Crater Lake National Park',
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
          zoom: calcViewportZoom(7.5),
        },
        start: {
          coordinates: [-122.39, 43.2415],
        },
        properties: {
          mode: 'driving',
          month: 'August',
          year: 2022,
          date: '2022-08-21',
          departure: 'Watson Falls',
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
          zoom: calcViewportZoom(9.25),
        },
        start: {
          coordinates: [-122.6784, 45.5152],
        },
        properties: {
          type: 'scenic-point',
          mode: 'driving',
          month: 'August',
          year: 2022,
          date: '2022-08-22',
          departure: 'Portland',
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
          zoom: calcViewportZoom(6.5),
        },
        start: {
          coordinates: [-122.1158, 45.5762],
        },
        properties: {
          type: 'scenic-point',
          mode: 'driving',
          month: 'August',
          year: 2022,
          date: '2022-08-23',
          departure: 'Multnomah Falls',
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
          zoom: calcViewportZoom(7.5),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'November',
          year: 2022,
          date: '2022-11-12',
          departure: 'Salt Lake City',
          destination: 'Arches National Park',
          state: 'Utah',
          distance: 233,
        },
      },
    ],
  },
  {
    type: 'FeatureCollection',
    year: 2023,
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-110.8437, 43.5942],
        },
        pan: {
          coordinates: [-111.34626733205232, 42.04116544286456],
          zoom: calcViewportZoom(6.75),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          type: 'alpine-skiing',
          mode: 'driving',
          month: 'January',
          year: 2023,
          date: '2023-01-15',
          departure: 'Salt Lake City',
          destination: 'Jackson Hole',
          description: 'Alpine Skiing',
          state: 'Wyoming',
          distance: 288,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-106.8317, 40.485],
        },
        pan: {
          coordinates: [-109.37355192725386, 40.575995139013344],
          zoom: calcViewportZoom(6.75),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          type: 'alpine-skiing',
          mode: 'driving',
          month: 'February',
          year: 2023,
          date: '2023-02-04',
          departure: 'Salt Lake City',
          destination: 'Steamboat Springs',
          description: 'Alpine Skiing',
          state: 'Colorado',
          distance: 337,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-114.3517, 43.6971],
        },
        pan: {
          coordinates: [-113.09100173310834, 42.154448698837676],
          zoom: calcViewportZoom(6.75),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          type: 'alpine-skiing',
          mode: 'driving',
          month: 'March',
          year: 2023,
          date: '2023-03-11',
          departure: 'Salt Lake City',
          destination: 'Sun Valley',
          description: 'Alpine Skiing',
          state: 'Idaho',
          distance: 304,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [139.7563, 35.6648],
        },
        pan: {
          coordinates: [187.9906990777383, 48.61895788751915],
          zoom: calcViewportZoom(3),
        },
        start: {
          coordinates: [-122.4194, 37.7749],
        },
        properties: {
          mode: 'flight',
          month: 'April',
          year: 2023,
          date: '2023-04-08',
          departure: 'San Francisco',
          destination: 'Tokyo',
          country: 'Japan',
          distance: 5139,
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
          zoom: calcViewportZoom(9),
        },
        start: {
          coordinates: [139.7563, 35.6648],
        },
        properties: {
          mode: 'train',
          month: 'April',
          year: 2023,
          date: '2023-04-11',
          departure: 'Tokyo',
          destination: 'Hakone',
          country: 'Japan',
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
          zoom: calcViewportZoom(7.5),
        },
        start: {
          coordinates: [139.1069, 35.2324],
        },
        properties: {
          mode: 'train',
          month: 'April',
          year: 2023,
          date: '2023-04-12',
          departure: 'Hakone',
          destination: 'Kyoto',
          country: 'Japan',
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
          zoom: calcViewportZoom(10),
        },
        start: {
          coordinates: [135.7681, 35.0116],
        },
        properties: {
          mode: 'train',
          month: 'April',
          year: 2023,
          date: '2023-04-15',
          departure: 'Kyoto',
          destination: 'Osaka',
          country: 'Japan',
          distance: 35,
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
          zoom: calcViewportZoom(6),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          mode: 'flight',
          month: 'July',
          year: 2020,
          date: '2023-06-01',
          departure: 'Salt Lake City',
          destination: 'San Clemente',
          state: 'California',
          distance: 585,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-111.9926814197322, 37.51798125135472],
        },
        pan: {
          coordinates: [-112.04600053503624, 39.10817424548043],
          zoom: calcViewportZoom(7),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          type: 'scenic-point',
          mode: 'driving',
          month: 'August',
          year: 2023,
          date: '2023-07-16',
          departure: 'Salt Lake City',
          destination: 'Kodachrome Basin State Park',
          state: 'Utah',
          distance: 275,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-114.2634, 38.93],
        },
        pan: {
          coordinates: [-113.09135592718418, 39.77990446782528],
          zoom: calcViewportZoom(8),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'October',
          year: 2023,
          date: '2023-10-15',
          departure: 'Salt Lake City',
          destination: 'Great Basin National Park',
          description: 'Upcoming Trip',
          state: 'Nevada',
          distance: 275,
        },
      },
    ],
  },
  {
    type: 'FeatureCollection',
    year: 2024,
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-110.5885, 44.428],
        },
        pan: {
          coordinates: [-111.26685427785301, 42.51378310329112],
          zoom: calcViewportZoom(6.5),
        },
        start: {
          coordinates: origin,
        },
        properties: {
          type: 'national-park',
          mode: 'driving',
          month: 'August',
          date: '2024-05-25',
          departure: 'Salt Lake City',
          destination: 'Yellowstone National Park',
          description: 'Upcoming Trip',
          state: 'Wyoming',
          distance: 380,
        },
      },
    ],
  },
]

const ski_resorts = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.6556, 40.5829],
      },
      properties: {
        type: 'alpine-skiing',
        mode: 'recreation',
        description: '165+ days',
        destination: 'Snowbird Ski Resort',
        city: 'Snowbird',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.624, 40.5777],
      },
      properties: {
        type: 'alpine-skiing',
        mode: 'recreation',
        description: '10+ days',
        destination: 'Alta Ski Area',
        city: 'Alta',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.5821, 40.6038],
      },
      properties: {
        type: 'alpine-skiing',
        mode: 'recreation',
        description: '10+ days',
        destination: 'Brighton Ski Area',
        city: 'Brighton',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.5951988, 40.625506],
      },
      properties: {
        type: 'alpine-skiing',
        mode: 'recreation',
        description: '10+ days',
        destination: 'Solitude Ski Area',
        city: 'Solitude',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.487, 40.6203],
      },
      properties: {
        type: 'alpine-skiing',
        mode: 'recreation',
        description: '10+ days',
        destination: 'Deer Valley Resort',
        city: 'Park City',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.5563, 40.6856],
      },
      properties: {
        type: 'alpine-skiing',
        mode: 'recreation',
        date: '2019-04-15',
        destination: 'Canyons Resort',
        city: 'Park City',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.8614, 41.2006],
      },
      properties: {
        type: 'alpine-skiing',
        mode: 'recreation',
        description: '7 days',
        destination: 'Snowbasin Resort',
        city: 'Huntsville',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-107.8123, 37.9375],
      },
      properties: {
        type: 'alpine-skiing',
        mode: 'recreation',
        date: '1999-01-21',
        destination: 'Telluride Ski Resort',
        city: 'Telluride',
        state: 'Colorado',
      },
    },
  ],
}

const golf_courses = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.899985, 40.267854],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Bent Tree Golf Club',
        city: 'Sunbury',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.8933, 40.2138],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Black Hawk Golf Club',
        description: 'Permanently Closed',
        city: 'Delaware',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.9417, 40.0495],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Champions Golf Course',
        city: 'Columbus',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-83.029203, 39.889655],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Phoenix Golf Course',
        description: 'Permanently Closed',
        city: 'Grove City',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.9866, 39.6923],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Cooks Creek Golf Club',
        city: 'South Bloomfield',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.036779, 39.897971],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Eaglesticks Golf Club',
        city: 'Zanesville',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-84.23204, 39.5377876],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Heatherwoode Golf Club',
        city: 'Springboro',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-84.25369080013269, 39.615032924657754],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Pipestone Golf Club',
        city: 'Miamisburg',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.79, 40.1012],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'New Albany Links',
        city: 'New Albany',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.8295, 40.0684],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'New Albany Country Club',
        city: 'New Albany',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-84.1975035, 39.5992446],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'The Golf Club at Yankee Trace',
        city: 'Centerville',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-83.05017, 39.775342],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'The Players Club at Foxfire',
        city: 'Lockbourne',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.8267801, 40.181293],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Royal American Links',
        city: 'Galena',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-83.16167, 40.154805],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'The Club at Tartan Fields',
        city: 'Dublin',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-83.1407, 40.1352],
      },
      properties: {
        type: 'pga-event',
        mode: 'recreation',
        description: 'PGA Tour Event',
        destination: 'Muirfield Village Golf Club',
        city: 'Dublin',
        state: 'Ohio',
        date: '2010-05-29',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.2341751, 40.0891644],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Longaberger Golf Club',
        city: 'Nashport',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.53740785977, 40.64844347672],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Deer Ridge Golf Club',
        city: 'Bellville',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-83.0531, 40.0319],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Ohio State University Golf Club',
        city: 'Columbus',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-83.102242, 39.992174],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Raymond Memorial Golf Course',
        city: 'Columbus',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-82.8679, 39.9957],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Airport Golf Course',
        city: 'Columbus',
        state: 'Ohio',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.14361020731539, 47.53560839792493],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'The Golf Club at Newcastle',
        description: 'Coal Creek',
        city: 'Newcastle',
        state: 'Washington',
        date: '2019-05-13',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-124.02702287003653, 44.88781184097749],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Salishan Golf Links',
        city: 'Gleneden Beach',
        state: 'Oregon',
        date: '2019-06-04',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-124.4133744754334, 43.03807153000964],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Bandon Crossings Golf Course',
        city: 'Bandon',
        state: 'Oregon',
        date: '2019-06-31',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-119.87469516567933, 34.54731283946107],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Rancho San Marcos Golf Course',
        city: 'Santa Barbara',
        state: 'California',
        date: '2019-08-25',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-120.37187694553384, 37.9368023079623],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Teleli Golf Club',
        city: 'Sonora',
        state: 'California',
        date: '2019-07-02',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.49405956394239, 37.78246300234429],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Lincoln Park Golf Course',
        city: 'San Francisco',
        state: 'California',
        date: '2019-06-05',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.43992578114643, 37.43497468294327],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Half Moon Bay Golf Links',
        description: 'Ocean Course',
        city: 'Half Moon Bay',
        state: 'California',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-117.59603184262244, 33.46340288942921],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Talega Golf Club',
        city: 'San Clemente',
        state: 'California',
        date: '2019-09-20',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-117.74805656542621, 33.51356714817912],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'The Ranch at Laguna Beach',
        description: 'Ben Browns Golf Course',
        city: 'Laguna Beach',
        state: 'California',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-117.71893531246944, 33.48347053643888],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Monarch Beach Golf Links',
        city: 'Dana Point',
        state: 'California',
        date: '2018-10-02',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-117.5981, 33.4099],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'San Clemente Municipal Golf Course',
        city: 'San Clemente',
        state: 'California',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-115.3502, 36.1012],
      },
      properties: {
        type: 'pga-event',
        mode: 'recreation',
        description: 'PGA Tour Event',
        destination: 'Summit Golf Club',
        city: 'Las Vegas',
        state: 'Nevada',
        date: '2021-10-6',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-115.33728090207842, 36.12086510387712],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Bears Best Golf Club',
        city: 'Las Vegas',
        state: 'Nevada',
        date: '2019-10-15',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-114.85797640249818, 35.96122845192432],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Boulder Creek Golf Club',
        city: 'Boulder City',
        state: 'Nevada',
        date: '2019-10-23',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-113.33751806430196, 37.19107776212936],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Sky Mountain Golf Course',
        city: 'Hurricane',
        state: 'Utah',
        date: '2019-11-01',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.46936365787786, 36.921890807913925],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Lake Powell National Golf Course',
        city: 'Page',
        state: 'Arizona',
        date: '2019-11-05',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-86.84268888095501, 36.14047543404344],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'McCabe Golf Course',
        city: 'Nashville',
        state: 'Tennessee',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-86.82454487039637, 36.18545681864267],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Ted Rhodes Golf Course',
        city: 'Nashville',
        state: 'Tennessee',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-86.8852842, 36.0514133],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Harpeth Hills Golf Course',
        city: 'Nashville',
        state: 'Tennessee',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-87.33696708673581, 36.08865602319955],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Greystone Golf Club',
        city: 'Dickson',
        state: 'Tennessee',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-86.63746332800129, 36.23499549257354],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Hermitage Golf Course',
        city: 'Dickson',
        state: 'Tennessee',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-81.3895, 30.1913],
      },
      properties: {
        type: 'pga-event',
        mode: 'recreation',
        description: 'PGA Tour Event',
        destination: 'The Players Club at TPC Sawgrass',
        city: 'Jacksonville',
        state: 'Florida',
        date: '2012-05-09',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-86.45947338687341, 30.394236498208215],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Indian Bayou Golf & Country Club',
        city: 'Destin',
        state: 'Florida',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-86.330954, 30.37823],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Sandestin Golf and Beach Resort',
        city: 'Miramar Beach',
        state: 'Florida',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-80.242424, 26.118767],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Plantation Preserve Golf Course & Club',
        city: 'Plantation',
        state: 'Florida',
        date: '2016-06-16',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-80.1498342, 25.864703],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Normandy Shores Golf Course',
        city: 'Miami Beach',
        state: 'Florida',
        date: '2016-06-13',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-112.0046342492636, 40.571939613329235],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Glenmore Golf Course',
        city: 'South Jordan',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-112.03362956037084, 40.66062695850211],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'The Ridge Golf Club',
        city: 'West Valley City',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.90131404689025, 40.32160901000993],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Talons Cove Golf Course',
        city: 'Saratoga Springs',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.90300352118429, 40.42999458480005],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Thanksgiving Point Golf Club',
        city: 'Lehi',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.7593290443526, 40.43515978265227],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Cedar Hills Golf Club',
        city: 'Cedar Hills',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.91641288800655, 40.584743590733396],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'River Oaks Golf Course',
        city: 'Sandy',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.59742305963967, 40.08760105729933],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'The Oaks at Spanish Fork',
        city: 'Spanish Fork',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.69975568920364, 40.7505595318616],
      },
      properties: {
        type: 'golf-course',
        mode: 'recreation',
        destination: 'Mountain Dell Golf Course',
        city: 'Salt Lake City',
        state: 'Utah',
      },
    },
  ],
}

const camp_sites = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-110.61352640299253, 43.84144296660591],
      },
      properties: {
        type: 'camping',
        mode: 'recreation',
        date: '2021-06-19',
        destination: 'Signal Mountain Campground',
        city: 'Moran',
        state: 'Wyoming',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.40062706310238, 40.197789391243575],
      },
      properties: {
        type: 'camping',
        mode: 'recreation',
        date: '2021-07-02',
        destination: 'Balsam Campground',
        city: 'Springville',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.61853344445933, 40.57769381880697],
      },
      properties: {
        type: 'camping',
        mode: 'recreation',
        date: '2021-07-09',
        destination: 'Albion Basin Campground',
        city: 'Alta',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-109.41088910527918, 37.73568071407479],
      },
      properties: {
        type: 'camping',
        mode: 'recreation',
        date: '2021-08-06',
        destination: 'Devils Canyon Campground',
        city: 'Monticello',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.59326469244432, 40.41345337075616],
      },
      properties: {
        type: 'camping',
        mode: 'recreation',
        date: '2021-08-13',
        destination: 'Mt Timpanogos Campground',
        city: 'Provo',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-112.98714389512884, 37.19653901760028],
      },
      properties: {
        type: 'camping',
        mode: 'recreation',
        date: '2022-05-20',
        destination: 'Watchman Campground',
        city: 'Springdale',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-112.57126673045542, 40.49530152916898],
      },
      properties: {
        type: 'camping',
        mode: 'recreation',
        date: '2022-06-10',
        destination: 'Boy Scout Campground',
        city: 'Dugway',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.24854009732222, 38.28219310811831],
      },
      properties: {
        type: 'camping',
        mode: 'recreation',
        date: '2022-07-01',
        destination: 'Fruita Campground',
        city: 'Torrey',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.10643900894918, 40.76905303371195],
      },
      properties: {
        type: 'camping',
        mode: 'recreation',
        date: '2022-08-07',
        destination: 'Smith & Morehouse Campground',
        city: 'Kamas',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.17031526903718, 40.17815624705916],
      },
      properties: {
        type: 'camping',
        mode: 'recreation',
        date: '2023-07-02',
        destination: 'Strawberry Bay Campground',
        city: 'Heber City',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.37332104234754, 39.5782348098912],
      },
      properties: {
        type: 'camping',
        mode: 'recreation',
        destination: 'Kartchner Family Cabin',
        city: 'Mt. Pleasant',
        state: 'Utah',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-111.37332104234754, 39.5782348098912],
      },
      properties: {
        type: 'camping',
        mode: 'recreation',
        destination: 'Kartchner Family Cabin',
        city: 'Mt. Pleasant',
        state: 'Utah',
      },
    },
  ],
}

const national_parks = {}

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

function calcViewportZoom(zoom) {
  return viewportWidth < 600 ? zoom - 1.5 : zoom
}

function resetMap() {
  if (map.getLayer('route')) map.removeLayer('route')
  if (map.getSource('route')) map.removeSource('route')
  if (map.getLayer('point')) map.removeLayer('point')
  if (map.getSource('point')) map.removeSource('point')
  counter = 0
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

  viewportWidth = window.innerWidth

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
    resetMap()
    flyToCoordinates(home.pan.coordinates, home.pan.zoom)
    createPopUp(home)

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
  // Add unique ids
  year.features.forEach(function (log, i) {
    log.properties.id = year.year + '-' + i
  })
  const logsDIV = document.getElementById('logs')
  // Add div container for each year and add list of logs
  const logsUL = logsDIV.appendChild(document.createElement('ul'))
  const headerLI = logsUL.appendChild(document.createElement('li'))
  headerLI.className = 'header'
  const label = headerLI.appendChild(document.createElement('p'))
  label.className = 'label'
  label.innerHTML = year.year
  for (const log of year.features) {
    const logLI = logsUL.appendChild(document.createElement('li'))
    logLI.id = `listing-${log.properties.id}`
    logLI.className = 'item'

    const label = logLI.appendChild(document.createElement('p'))
    label.className = 'label'
    label.innerHTML =
      log.properties.mode === 'home' ? 'home' : log.properties.month

    const link = logLI.appendChild(document.createElement('a'))
    link.href = '#'
    link.className = 'title'
    link.id = `link-${log.properties.id}`
    link.innerHTML = `${log.properties.destination}, ${
      log.properties.country ? log.properties.country : log.properties.state
    }`

    /* Add event listeners */
    link.addEventListener('click', function () {
      resetMap()
      for (const feature of year.features) {
        if (this.id === `link-${feature.properties.id}`) {
          flyToCoordinates(feature.pan.coordinates, feature.pan.zoom)
          createPopUp(feature)
          if (
            feature.properties.mode === 'driving' ||
            feature.properties.mode === 'train'
          ) {
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

function buildAllLogs() {
  addHTMLMarkers(golf_courses.features)
  addHTMLMarkers(camp_sites.features)
  addHTMLMarkers(ski_resorts.features)
  let sortedLogs = logs.sort((a, b) => b.year - a.year)
  sortedLogs.forEach((log) => {
    sortedFeatures = log.features.sort(
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
      resetMap()
      removeActiveListing()
      /* Fly to the point */
      if (feature.properties.mode !== 'recreation') {
        flyToCoordinates(feature.pan.coordinates, feature.pan.zoom)
      } else {
        flyToCoordinates(feature.geometry.coordinates, 14)
      }
      /* Close all other popups and display popup for clicked store */
      createPopUp(feature)
      if (
        feature.properties.mode === 'driving' ||
        feature.properties.mode === 'train'
      ) {
        addRoute(feature.start.coordinates, feature.geometry.coordinates)
      }
      if (feature.properties.mode === 'flight') {
        addFlight(feature.start.coordinates, feature.geometry.coordinates)
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

function flyToCoordinates(coordinates, zoom) {
  map.flyTo({
    center: coordinates,
    zoom: zoom,
  })
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

function createPopUp(currentFeature) {
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
    resetMap()
    removeActiveListing()
  })
}

function removeActiveListing() {
  const activeItem = document.getElementsByClassName('active')
  if (activeItem[0]) {
    activeItem[0].classList.remove('active')
  }
}
