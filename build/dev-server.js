/*!
 * TEST SERVER
 **/

const Koa = require('koa')
const serve = require('koa-static')
const config = require('./config')
const port = config.devServerPort
const oneYear = 1000 * 60 * 60 * 24 * 365

const app = new Koa()
const mount = require('koa-mount')
const path = require('path')
const Pug = require('koa-pug')
const isProduction = false
const Router = require('koa-router')
const router = new Router()
const pack = require('../package.json')
const ip = 'localhost'
const glob = {}

// static files
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  await next()
})

app.use(serve(path.resolve(__dirname, '../src'), {
  maxAge: oneYear
}))

app.use(
  mount(
    '/_bc',
    serve(path.resolve(__dirname, '../node_modules'), {
      maxAge: oneYear
    })
  )
)

app.use(
  mount(
    '/_dist',
    serve(path.resolve(__dirname, '../dist'), {
      maxAge: oneYear
    })
  )
)

// pug template
glob.pug = new Pug({
  viewPath: path.resolve(__dirname, 'views'),
  debug: !isProduction,
  pretty: !isProduction,
  compileDebug: !isProduction,
  noCache: true,
  app // equals to pug.use(app) and app.use(pug.middleware)
})

router.get('/', async (ctx) => {
  await ctx.render('index', {
    siteName: pack.name,
    siteDesc: pack.description,
    siteKeywords: pack.keywords.join(','),
    cdn: `http://${ip}:${port}`,
    port: config.port,
    ip
  }, true)
})

app.use(router.routes())
app.use(router.allowedMethods())

// start
app.listen(port, ip, function () {
  console.log(new Date() + ' ' + pack.name + ' runs on ' + `http://${ip}:${port}`)
})
