/**
 * Module dependencies
 */
var express = require("express");

var app = module.exports = express();

app.on('ready', function() {

  app.riemann = require('riemann').createClient({ host: process.env.RIEMANN_HOST, port: 5555 });

  app.riemann.on('connect', function() {
    console.log("connected");
  });

  app.on('close', function() {
    app.riemann.disconnect();
  });

});

app.use(require("..")(app.riemann, {
  host: "test.localhost",
  service: "riemann-node-error-handler-tests",
  tags: ["tests"]
}));

app.get("/", function(req, res, next) {
  next(new Error("Error from "+req.ip));
});
