import Universe from './universe'

// instantiate a loader
var loader = new window.THREE.TextureLoader()

// load a resource
loader.load(
  // resource URL
  '/star.png',
  // Function when resource is loaded
  function (texture) {
    return new Universe({
      size: 5, // star size
      id: null, // id
      starNumber: 10000,
      color: 0xffffff,
      width: null,
      height: null,
      container: document.getElementById('wrapper'),
      map: texture
    })
  }
)
