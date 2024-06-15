import { flyToLogFeature, resetMap } from './mapUtils.js'

export function buildLogListItem(log, logsUL, map, counter) {
  // Create list item for each log
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

  // Add event listener to the link
  link.addEventListener('click', function () {
    resetMap(map, counter)
    flyToLogFeature(map, log, counter)
    const activeItem = document.getElementsByClassName('active')
    if (activeItem[0]) {
      activeItem[0].classList.remove('active')
    }
    this.parentNode.classList.add('active')
  })
}
