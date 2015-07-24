/**
 * universe-bg
 * @version v0.2.0 - 2015-07-24
 * @link http://html5beta.com/apps/universe.html
 * @author ZHAO Xudong (zxdong@gmail.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
;(function(window, document, undefined) {
/**
 * param:options, {Object}
 * options.id, {String}, 
 * options.size, {Int}, 1-..., star size default = 5.0
 * options.starNumber {Int} default = 10000
 * options.color default = 0xffffff
 * options.caontainer continer of canvas ,default = document.body
 * options.map star map such as THREE.ImageUtils.loadTexture( 'star.png' ), default is null
 */


function Universe(options) {
	this.init(options)
	this.animate()
	this.event()
}

Universe.defaults = {
	size: 5.0
	,starNumber: 10000
	,color: 0xffffff
}


Universe.prototype.init = function(_options) {

	var options = _options || {}
	var th = this

	th.options = {
		size: options.size || Universe.defaults.size
		,id: options.id
		,starNumber: options.starNumber || Universe.defaults.starNumber
		,color: options.color || Universe.defaults.color
		,map: options.map
	}

	th.container = options.container || document.body

	options = th.options

	th.state = {
		mouseX: 0
		,mouseY: 0
		,width: options.width || th.container.clientWidth
		,height: options.height || th.container.clientHeight
		,windowHalfX: th.container.clientWidth/2
		,windowHalfY: th.container.clientHeight/2
	}

	//webgl
	th.scene = new THREE.Scene()
	th.camera = new THREE.PerspectiveCamera( 50, th.state.width / th.state.height, 150, 4000 )

	var geometry = new THREE.Geometry()

	for ( var i = 0;i < options.starNumber;i ++ ) {

		var vertex = new THREE.Vector3()
		vertex.x = THREE.Math.randFloatSpread( 4000 )
		vertex.y = THREE.Math.randFloatSpread( 4000 )
		vertex.z = THREE.Math.randFloatSpread( 4000 )
		geometry.vertices.push( vertex )

	}

	var sprite = THREE.ImageUtils.loadTexture( 'star.png' )
	var particles = new THREE.PointCloud( geometry, new THREE.PointCloudMaterial({
		color: options.color
		,size: options.size
		,map: th.options.map || null
		,transparent: true
	}))

	th.scene.add( particles )

	th.renderer = new THREE.WebGLRenderer( { antialias: true } )
	th.renderer.setPixelRatio( window.devicePixelRatio )
	th.renderer.setSize( th.state.width, th.state.height )
	th.renderer.domElement.id = options.id || 'id' + new Date().getTime()
	th.container.appendChild( th.renderer.domElement )
	th.renderer.autoClear = false

}

Universe.prototype.render = function() {

	var r = Date.now() * 0.0005
	var th = this
	var ratioH = th.state.height/500*0.02
	var ratioW = th.state.width/1000*0.02

	th.camera.fov = 35 + 90 * Math.sin( 0.5 * r )
	th.camera.updateProjectionMatrix()

	th.camera.position.x += ( th.state.mouseX - th.camera.position.x ) * ratioH
	th.camera.position.y += ( - th.state.mouseY - th.camera.position.y ) * ratioW
	th.camera.lookAt( th.scene.position )

	th.renderer.clear()
	th.renderer.setViewport( 0, 0, th.state.width, th.state.height )
	th.renderer.render( th.scene, th.camera )

}

Universe.prototype.animate = function() {

	var th = this

	function animate() {
		requestAnimationFrame( animate )
		th.render()
	}

	animate()
	

}

Universe.prototype.event = function() {

	var th = this
	document.addEventListener( 'mousemove', th.onDocumentMouseMove(), false )
	document.addEventListener( 'touchstart', th.onDocumentTouchStart(), false )
	document.addEventListener( 'touchmove', th.onDocumentTouchMove(), false )
	window.addEventListener( 'resize', th.onWindowResize(), false )

}

Universe.prototype.onDocumentMouseMove = function() {

	var th = this

	return function(event) {
		th.state.mouseX = event.clientX - th.state.windowHalfX
		th.state.mouseY = event.clientY - th.state.windowHalfY
	}

}

Universe.prototype.onDocumentTouchStart = function() {
	
	var th = this

	return function(event) {

		if ( event.touches.length === 1 ) {

			event.preventDefault()
			th.state.mouseX = event.touches[ 0 ].pageX - th.state.windowHalfX
			th.state.mouseY = event.touches[ 0 ].pageY - th.state.windowHalfY

		}

	}

}

Universe.prototype.onDocumentTouchMove = function() {
	
	var th = this

	return function(event) {

		if ( event.touches.length === 1 ) {

			event.preventDefault()
			th.state.mouseX = event.touches[ 0 ].pageX - th.state.windowHalfX
			th.state.mouseY = event.touches[ 0 ].pageY - th.state.windowHalfY

		}

	}

}

Universe.prototype.onWindowResize = function() {

	var th = this

	return function() {
		th.state.width = th.container.clientWidth
		th.state.height = th.container.clientHeight
		th.state.windowHalfX = th.container.clientWidth / 2
		th.state.windowHalfY = th.container.clientHeight / 2

		th.renderer.setSize( th.state.width, th.state.height )
		th.camera.aspect = th.state.width / th.state.height 
		th.camera.updateProjectionMatrix()
	}

}

window.Universe = Universe
})(window, document);
