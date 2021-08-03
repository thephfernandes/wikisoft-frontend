module.exports = function registerEndpoint(router, { services, exceptions, database }) {
  const { ItemsService } = services;
  const { ServiceUnavailableException } = exceptions;

  router.get("/", redirect);
  router.get("/:type/:id", get_item);

  function redirect(req, res, next) {
    res.json({ success: "ok" });
  }

  function get_item(req, res, next) {
    database.raw(
      `select * from search.items where id = ${req.params.id}`
    ).then((results) => res.json(results.rows)).cathc(err => res.json(req.params))
  }
};
