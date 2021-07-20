const { createProxyMiddleware } = require('http-proxy-middleware')

// proxy middleware options
const options = {
  // target: process.env.NODE_ENV == "development" ? 'http://localhost:5000' : 'http://95.179.130.39:5000', // target host
  target: 'http://95.179.130.39:5000', // target host
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: {
    '^/api': '/', // remove base path
  },
}

module.exports = function (app) {
  app.use('/api/', createProxyMiddleware(options))
}
