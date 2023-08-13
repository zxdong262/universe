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
<script src='//www.unpkg.com/three@0.155.0/build/three.min.js'></script>
<script src='//unpkg.com/universe-bg/dist/universe-bg.min.js'></script>
```

## LICENCE

MIT
