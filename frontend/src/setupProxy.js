const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/login', { target: 'http://localhost:8080' }));
  app.use(proxy('/logout', { target: 'http://localhost:8080' }));
  app.use(proxy('/checkAuth', { target: 'http://localhost:8080' }));
  app.use(proxy('/events', {
    ws: true,
    changeOrigin: true,
    target: 'ws://localhost:8080'
  }));
};
