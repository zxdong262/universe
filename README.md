# universe-bg
a simple universe bg plugin build with three.js

## demo
<a href='http://html5beta.com/apps/universe.html'>http://html5beta.com/apps/universe.html</a>

## install
```bash
npm i universe-bg
bower install universe-bg
```

## use
```html
<script src='dist/universe.min.js'></script>
<script>
var uni = new Universe()

//or with options
var uni = new Universe({
        size: 5 //star size
        ,id: null //id
        ,starNumber: 10000
        ,color: 0xffffff
        ,width: null
        ,height: null
        ,container: document.body
        ,map: null //star map such as THREE.ImageUtils.loadTexture( 'star.png' )
})

</script>
```


## LICENCE

MIT

