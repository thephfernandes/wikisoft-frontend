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
      `select id, "weight-a", "weight-b", "weight-c", content from search.items where id = '${req.params.id}'`
    ).then((results) => { res.send(results.rows[0]) }
    ).catch(err => res.json(req.params))
  }
};
