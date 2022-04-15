const COLOR = '#75fe04'

let pixels = []
let monitoringStatus = null

function killPixel (x, y, color) {
  const node = document.createElement('div')
  node.style.backgroundColor = color
  node.style.position = 'fixed'
  node.style.left = x - window.screenLeft
  node.style.top = y - window.screenTop
  node.style.width = '1px'
  node.style.height = '1px'
  node.style.zIndex = 9999
  document.body.appendChild(node)
  const pixel = {
    x, y, color: COLOR, node
  }
  pixels.push(pixel)
  monitorWindowChanges()
}

function monitorWindowChanges () {
  if (pixels.length === 0 || monitoringStatus) return

  window.addEventListener('resize', updatePixelPositions)
  const intervalId = setInterval(function () {
    if (
      monitoringStatus?.screenLeft !== window.screenLeft ||
      monitoringStatus?.screenTop !== window.screenTop
    ) {
      updatePixelPositions()
    }
  }, 1)
  monitoringStatus = {
    intervalId, screenLeft: window.screenLeft, screenTop: window.screenTop
  }
}

function stopMonitoringWindowChanges () {
  if (!monitoringStatus) return

  window.removeEventListener('resize', updatePixelPositions)
  clearInterval(monitoringStatus.intervalId)

  monitoringStatus = null
}

function updatePixelPositions () {
  monitoringStatus.screenLeft = window.screenLeft
  monitoringStatus.screenTop = window.screenTop
  pixels.forEach(pixel => {
    pixel.node.style.left = pixel.x - monitoringStatus.screenLeft
    pixel.node.style.top = pixel.y - monitoringStatus.screenTop
  })
}

function deleteAllPixels () {
  pixels.forEach(pixel => {
    pixel.node.remove()
  })
  pixels = []
  stopMonitoringWindowChanges()
}

function randomBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = {
  killRandomPixelOnWindow () {
    const x = randomBetween(0, window.innerWidth)
    const y = randomBetween(0, window.innerHeight)
    module.exports.killPixelAtWindowPosition(x, y)
  },
  killRandomPixelOnScreen () {
    const x = randomBetween(0, window.screen.availWidth)
    const y = randomBetween(0, window.screen.availHeight)
    module.exports.killPixelAtScreenPosition(x, y)
  },
  killPixelAtWindowPosition (x, y) {
    killPixel(x + window.screenLeft, y + window.screenTop, COLOR)
  },
  killPixelAtScreenPosition (x, y) {
    killPixel(x, y, COLOR)
  },
  reset () {
    deleteAllPixels()
  }
}
