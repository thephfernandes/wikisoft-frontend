module.exports = function registerEndpoint(router, { services, exceptions }) {
  const { ItemsService } = services;
  const { ServiceUnavailableException } = exceptions;

  router.get("/", redirect);
  router.get("/:type/", search);
  router.get("/:type/:query/", search);
  router.get("/:type/:query/:sort/", search);
  router.get("/:type/:query/:sort/:filter/", search);
  router.get("/:type/:query/:sort/:filter/:page/", search);

  function redirect(req, res, next) {
    res.json({ success: "ok" });
  }

  function search(req, res, next) {
    res.json(res.json(req.params));
  }
};
