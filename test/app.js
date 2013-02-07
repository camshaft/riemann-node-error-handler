/**
 * Module dependencies
 */
var express = require("express");

var app = module.exports = express();

client.on('connect', function() {
  console.log("Logging to reimann");
});

app.use(require("..")({
  host: "test.localhost",
  service: "riemann-node-error-handler-tests",
  tags: ["tests"]
}));

app.get("/", function(req, res, next) {
  next(new Error("Error from "+req.ip));
});
