/**
 * param:options, {Object}
 * options.id, {String},
 * options.size, {Int}, 1-..., star size default = 5.0
 * options.starNumber {Int} default = 10000
 * options.color default = 0xffffff
 * options.caontainer continer of canvas ,default = document.body
 * options.map star map such as THREE.ImageUtils.loadTexture( 'star.png' ), default is null
 */

export default class Universe {
  static defaults = {
    size: 5.0,
    starNumber: 10000,
    color: 0xffffff
  }

  constructor (options) {
    this.init(options)
    this.animate()
    this.event()
  }

  init (_options) {
    const { THREE } = window
    let options = _options || {}
    const th = this

    th.options = {
      size: options.size || Universe.defaults.size,
      id: options.id,
      starNumber: options.starNumber || Universe.defaults.starNumber,
      color: options.color || Universe.defaults.color,
      map: options.map
    }

    th.container = options.container || document.body

    options = th.options

    th.state = {
      mouseX: 0,
      mouseY: 0,
      width: options.width || th.container.clientWidth,
      height: options.height || th.container.clientHeight,
      windowHalfX: th.container.clientWidth / 2,
      windowHalfY: th.container.clientHeight / 2
    }

    // webgl
    th.scene = new THREE.Scene()
    th.scene.background = new THREE.Color(options.background || '#000000')
    th.camera = new THREE.PerspectiveCamera(50, th.state.width / th.state.height, 150, 4000)

    const geometry = new THREE.Geometry()

    for (let i = 0; i < options.starNumber; i++) {
      const vertex = new THREE.Vector3()
      vertex.x = THREE.Math.randFloatSpread(4000)
      vertex.y = THREE.Math.randFloatSpread(4000)
      vertex.z = THREE.Math.randFloatSpread(4000)
      geometry.vertices.push(vertex)
    }

    const particles = new THREE.Points(geometry, new THREE.PointsMaterial({
      color: options.color,
      size: options.size,
      map: th.options.map || null,
      transparent: true
    }))

    th.scene.add(particles)

    th.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    th.renderer.setPixelRatio(window.devicePixelRatio)
    th.renderer.setSize(th.state.width, th.state.height)
    th.renderer.domElement.id = options.id || 'id' + new Date().getTime()
    th.container.appendChild(th.renderer.domElement)
    th.renderer.autoClear = false
  }

  render () {
    const r = Date.now() * 0.0005
    const th = this
    const ratioH = th.state.height / 500 * 0.02
    const ratioW = th.state.width / 1000 * 0.02

    th.camera.fov = 35 + 90 * Math.sin(0.5 * r)
    th.camera.updateProjectionMatrix()

    th.camera.position.x += (th.state.mouseX - th.camera.position.x) * ratioH
    th.camera.position.y += (-th.state.mouseY - th.camera.position.y) * ratioW
    th.camera.lookAt(th.scene.position)

    th.renderer.clear()
    th.renderer.setViewport(0, 0, th.state.width, th.state.height)
    th.renderer.render(th.scene, th.camera)
  }

  animate () {
    const th = this

    function animate () {
      window.requestAnimationFrame(animate)
      th.render()
    }

    animate()
  }

  event () {
    const th = this
    document.addEventListener('mousemove', th.onDocumentMouseMove(), false)
    document.addEventListener('touchstart', th.onDocumentTouchStart(), false)
    document.addEventListener('touchmove', th.onDocumentTouchMove(), false)
    window.addEventListener('resize', th.onWindowResize(), false)
  }

  onDocumentMouseMove () {
    const th = this

    return function (event) {
      th.state.mouseX = event.clientX - th.state.windowHalfX
      th.state.mouseY = event.clientY - th.state.windowHalfY
    }
  }

  onDocumentTouchStart () {
    const th = this

    return function (event) {
      if (event.touches.length === 1) {
        event.preventDefault()
        th.state.mouseX = event.touches[0].pageX - th.state.windowHalfX
        th.state.mouseY = event.touches[0].pageY - th.state.windowHalfY
      }
    }
  }

  onDocumentTouchMove () {
    const th = this

    return function (event) {
      if (event.touches.length === 1) {
        event.preventDefault()
        th.state.mouseX = event.touches[0].pageX - th.state.windowHalfX
        th.state.mouseY = event.touches[0].pageY - th.state.windowHalfY
      }
    }
  }

  onWindowResize () {
    const th = this

    return function () {
      th.state.width = th.container.clientWidth
      th.state.height = th.container.clientHeight
      th.state.windowHalfX = th.container.clientWidth / 2
      th.state.windowHalfY = th.container.clientHeight / 2

      th.renderer.setSize(th.state.width, th.state.height)
      th.camera.aspect = th.state.width / th.state.height
      th.camera.updateProjectionMatrix()
    }
  }
}
