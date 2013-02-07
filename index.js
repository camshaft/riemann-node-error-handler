/**
 * Module dependencies
 */


/**
 * Riemann Error Handler
 */
module.exports = function(client, config) {
  // TODO check if client is actually config and make a connection

  return function riemannErrorHandler(err, req, res, next) {
    client.send(client.Event({
      host: config.host,
      service: config.service,
      state: config.state || "error",
      description: err.stack,
      ttl: config.ttl,
      tags: config.tags
    }));

    next();
  };
};
