(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Universe"] = factory();
	else
		root["Universe"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * param:options, {Object}
	 * options.id, {String}, 
	 * options.size, {Int}, 1-..., star size default = 5.0
	 * options.starNumber {Int} default = 10000
	 * options.color default = 0xffffff
	 * options.caontainer continer of canvas ,default = document.body
	 * options.map star map such as THREE.ImageUtils.loadTexture( 'star.png' ), default is null
	 */
	
	var Universe = function () {
	  function Universe(options) {
	    _classCallCheck(this, Universe);
	
	    this.init(options);
	    this.animate();
	    this.event();
	  }
	
	  _createClass(Universe, [{
	    key: 'init',
	    value: function init(_options) {
	
	      var options = _options || {};
	      var th = this;
	
	      th.options = {
	        size: options.size || Universe.defaults.size,
	        id: options.id,
	        starNumber: options.starNumber || Universe.defaults.starNumber,
	        color: options.color || Universe.defaults.color,
	        map: options.map
	      };
	
	      th.container = options.container || document.body;
	
	      options = th.options;
	
	      th.state = {
	        mouseX: 0,
	        mouseY: 0,
	        width: options.width || th.container.clientWidth,
	        height: options.height || th.container.clientHeight,
	        windowHalfX: th.container.clientWidth / 2,
	        windowHalfY: th.container.clientHeight / 2
	      };
	
	      //webgl
	      th.scene = new THREE.Scene();
	      th.camera = new THREE.PerspectiveCamera(50, th.state.width / th.state.height, 150, 4000);
	
	      var geometry = new THREE.Geometry();
	
	      for (var i = 0; i < options.starNumber; i++) {
	
	        var vertex = new THREE.Vector3();
	        vertex.x = THREE.Math.randFloatSpread(4000);
	        vertex.y = THREE.Math.randFloatSpread(4000);
	        vertex.z = THREE.Math.randFloatSpread(4000);
	        geometry.vertices.push(vertex);
	      }
	
	      var particles = new THREE.Points(geometry, new THREE.PointsMaterial({
	        color: options.color,
	        size: options.size,
	        map: th.options.map || null,
	        transparent: true
	      }));
	
	      th.scene.add(particles);
	
	      th.renderer = new THREE.WebGLRenderer({ antialias: true });
	      th.renderer.setPixelRatio(window.devicePixelRatio);
	      th.renderer.setSize(th.state.width, th.state.height);
	      th.renderer.domElement.id = options.id || 'id' + new Date().getTime();
	      th.container.appendChild(th.renderer.domElement);
	      th.renderer.autoClear = false;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	
	      var r = Date.now() * 0.0005;
	      var th = this;
	      var ratioH = th.state.height / 500 * 0.02;
	      var ratioW = th.state.width / 1000 * 0.02;
	
	      th.camera.fov = 35 + 90 * Math.sin(0.5 * r);
	      th.camera.updateProjectionMatrix();
	
	      th.camera.position.x += (th.state.mouseX - th.camera.position.x) * ratioH;
	      th.camera.position.y += (-th.state.mouseY - th.camera.position.y) * ratioW;
	      th.camera.lookAt(th.scene.position);
	
	      th.renderer.clear();
	      th.renderer.setViewport(0, 0, th.state.width, th.state.height);
	      th.renderer.render(th.scene, th.camera);
	    }
	  }, {
	    key: 'animate',
	    value: function animate() {
	
	      var th = this;
	
	      function animate() {
	        requestAnimationFrame(animate);
	        th.render();
	      }
	
	      animate();
	    }
	  }, {
	    key: 'event',
	    value: function event() {
	
	      var th = this;
	      document.addEventListener('mousemove', th.onDocumentMouseMove(), false);
	      document.addEventListener('touchstart', th.onDocumentTouchStart(), false);
	      document.addEventListener('touchmove', th.onDocumentTouchMove(), false);
	      window.addEventListener('resize', th.onWindowResize(), false);
	    }
	  }, {
	    key: 'onDocumentMouseMove',
	    value: function onDocumentMouseMove() {
	
	      var th = this;
	
	      return function (event) {
	        th.state.mouseX = event.clientX - th.state.windowHalfX;
	        th.state.mouseY = event.clientY - th.state.windowHalfY;
	      };
	    }
	  }, {
	    key: 'onDocumentTouchStart',
	    value: function onDocumentTouchStart() {
	
	      var th = this;
	
	      return function (event) {
	
	        if (event.touches.length === 1) {
	
	          event.preventDefault();
	          th.state.mouseX = event.touches[0].pageX - th.state.windowHalfX;
	          th.state.mouseY = event.touches[0].pageY - th.state.windowHalfY;
	        }
	      };
	    }
	  }, {
	    key: 'onDocumentTouchMove',
	    value: function onDocumentTouchMove() {
	
	      var th = this;
	
	      return function (event) {
	
	        if (event.touches.length === 1) {
	
	          event.preventDefault();
	          th.state.mouseX = event.touches[0].pageX - th.state.windowHalfX;
	          th.state.mouseY = event.touches[0].pageY - th.state.windowHalfY;
	        }
	      };
	    }
	  }, {
	    key: 'onWindowResize',
	    value: function onWindowResize() {
	
	      var th = this;
	
	      return function () {
	        th.state.width = th.container.clientWidth;
	        th.state.height = th.container.clientHeight;
	        th.state.windowHalfX = th.container.clientWidth / 2;
	        th.state.windowHalfY = th.container.clientHeight / 2;
	
	        th.renderer.setSize(th.state.width, th.state.height);
	        th.camera.aspect = th.state.width / th.state.height;
	        th.camera.updateProjectionMatrix();
	      };
	    }
	  }]);
	
	  return Universe;
	}();
	
	Universe.defaults = {
	  size: 5.0,
	  starNumber: 10000,
	  color: 0xffffff
	};
	exports.default = Universe;

/***/ }
/******/ ])
});
;