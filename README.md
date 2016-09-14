# universe-bg
a simple universe bg plugin build with three.js

## demo
<a href='http://html5beta.com/apps/universe.html'>http://html5beta.com/apps/universe.html</a>

## install
```bash
npm i universe-bg
# or
bower install universe-bg
```

## use
```html
<script src='dist/universe.min.js'></script>
<script>
var uni = new Universe()

// instantiate a loader
var loader = new THREE.TextureLoader()

// load a resource
loader.load(
	// resource URL
	'/_dist/star.png',
	// Function when resource is loaded
	function ( texture ) {
    
                let uni = new Universe({
                        size: 5 //star size
                        ,id: null //id
                        ,starNumber: 10000
                        ,color: 0xffffff
                        ,width: null
                        ,height: null
                        ,container: document.getElementById('wrapper')
                        ,map: texture
                })

	}
)

</script>
```

or

```js
import Universe from 'universe-bg'
//const Universe = require('universe-bg')
```

## LICENCE

MIT

