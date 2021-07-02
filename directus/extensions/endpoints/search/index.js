// extensions/endpoints/recipes/index.js

module.exports = function registerEndpoint(router, { services, exceptions }) {
  const { ItemsService } = services;
  const { ServiceUnavailableException } = exceptions;

  router.get("/", search);

  function search(req, res, next) {
    res.json({ success: "ok" });
  }
};
