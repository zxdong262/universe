
/**
 * Module dependencies.
 */

var
koa = require('koa')
,serve = require('koa-static')
,conditional = require('koa-conditional-get')
,etag = require('koa-etag')
,jade = require('koa-jade')
,bodyParser = require('koa-bodyparser')
,mount = require('koa-mount')
,Router = require('koa-router')
,resolve = require('path').resolve

//user local
,_ = require('lodash')
,port = 5002
,oneYear = 1000 * 60 * 60 * 24 * 365

// all environments
,app = koa()

//middleware
app.keys = ['setting.secret']

app.use(conditional())
app.use(etag())


//static files
app.use(serve(resolve(__dirname, '../dist'), {
	maxAge: oneYear
}))
app.use(serve('test/res', {
	maxAge: oneYear
}))
app.use(serve(resolve(__dirname, '../bower_components'), {
	maxAge: oneYear
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser())

//view engine
app.use(jade.middleware({
	viewPath: __dirname + '/views'
	,debug: false
	,pretty: false
	,compileDebug: true
	,locals: { _:_ }
	//basedir: 'path/for/jade/extends',
	,noCache: true
}))

//routes
var routePage = new Router()
routePage.get('/', function* (next) {
	this.render('index')
})

app
	.use(routePage.routes())
	.use(routePage.allowedMethods())

//start
app.listen(port, function() {
	console.log(new Date() + ' universe web server runs on port ' + port)
})


