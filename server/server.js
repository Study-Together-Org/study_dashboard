// include dependencies
const express = require('express')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()

// proxy middleware options
const options = {
  target: 'http://95.179.130.39:5000', // target host
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: {
    '^/api': '/', // remove base path
  },
}

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options)
app.use('/api/', exampleProxy)

// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '..', 'build')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

// mount `exampleProxy` in web server
app.listen(3000)
