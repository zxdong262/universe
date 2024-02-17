# universe-bg

a simple universe bg plugin build with three.js

## demo

[http://html5beta.com/apps/universe-bg/](http://html5beta.com/apps/universe-bg/)

## install

```bash
npm i universe-bg
```

## Use

```js
import UniverseBg from 'universe-bg'

const inst = new UniverseBg({
  id: ''
  className:  '',
  starSize: 0.1,
  shootingStarSize: 0.2,
  starCount: 10000,
  shootingStarCount: 30,
  starDistance: 100,
  shootingStarDistance: 50,
  starColor: 0xffffff,
  shootingStarColor: 0xffffff,
  bgColor: 0x000000
})

```

Could use cdn

```html
<style>
.animate {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: -1
}
</style>
<script async="" src="//unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>
<script type="importmap">
{
  "imports": {
    "three": "https://unpkg.com/three@0.155.0/build/three.module.js",
    "universe-bg": "//unpkg.com/universe-bg/dist/universe-bg.mjs"
  }
}
</script>
<script type="module">
  import UniverseBg from 'universe-bg'
  window.x = new UniverseBg({
    className: 'animate',
    // shootingStarCount: 150,
    // starCount: 1000,
    // starSize: 30,
    shootingStarSize: 0.4,
    shootingStarColor: 0x666666,
    starColor: 0x666666,
    bgColor: 0xffffff
    // starDistance: 80,
    // shootingStarDistance: 40
  })
</script>
```

## LICENCE

MIT
