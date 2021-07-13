module.exports = function registerEndpoint(router, { services, exceptions }) {
  const { ItemsService } = services;
  const { ServiceUnavailableException } = exceptions;

  router.get("/", redirect);
  router.get("/:type/:id", get_item);

  function redirect(req, res, next) {
    res.json({ success: "ok" });
  }

  function get_item(req, res, next) {
    res.json(req.params);
  }
};
