/**
 * Module dependencies
 */
var riemann = require("simple-riemann");

/**
 * Riemann Error Handler
 */
module.exports = function(client, config) {
  if (typeof config === "undefined") {
    config = client;
    client = riemann();
  };

  return function riemannErrorHandler(err, req, res, next) {
    client.send(client.Event({
      host: config.host,
      service: config.service,
      state: config.state || "error",
      description: err.stack,
      ttl: config.ttl,
      tags: config.tags
    }));

    next(err);
  };
};
