export function addUniqueIds(year) {
  year.features.forEach(function (log, i) {
    log.properties.id = year.year + '-' + i
  })
}
